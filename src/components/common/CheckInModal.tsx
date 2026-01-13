import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import { useMutation } from '@apollo/client/react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import useLocation from '../../hooks/useLocation';
import { useImageUpload } from '../../hooks/useImageUpload';
import { CHECK_IN_PLACE_MUTATION } from '../../graphql/mutations';
import Icon from './Icon';

interface CheckInModalProps {
  visible: boolean;
  onClose: () => void;
  nearbyPlaces?: any[];
}

type Step = 'location' | 'place' | 'confirm';

export default function CheckInModal({ visible, onClose, nearbyPlaces = [] }: CheckInModalProps) {
  const [step, setStep] = useState<Step>('location');
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [content, setContent] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const location = useLocation();
  const { images, uploading, addImage, removeImage, uploadAllImages, clearImages } = useImageUpload();

  const [checkInMutation, { loading: checkingIn }] = useMutation(CHECK_IN_PLACE_MUTATION, {
    onCompleted: (data: any) => {
      Alert.alert('Thành công', 'Check-in thành công!');
      setStep('location');
      setSelectedPlace(null);
      setContent('');
      clearImages();
      onClose();
    },
    onError: (error: any) => {
      Alert.alert('Lỗi', error.message);
    },
  });

  useEffect(() => {
    if (visible && step === 'location') {
      // Simulate location detection
      setIsDetecting(true);
      setTimeout(() => {
        setIsDetecting(false);
        if (nearbyPlaces.length > 0) {
          setStep('place');
        }
      }, 1500);
    }
  }, [visible, step]);

  const handleSelectPlace = (place: any) => {
    setSelectedPlace(place);
    setStep('confirm');
  };

  const handleAddImage = () => {
    if (images.length >= 3) {
      Alert.alert('Giới hạn', 'Tối đa 3 ảnh');
      return;
    }
    Alert.alert('Thêm ảnh', 'Chọn nguồn', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera(
            {
              mediaType: 'photo',
              cameraType: 'back',
              quality: 0.8,
            },
            (response) => {
              if (response.didCancel) {
                console.log('Camera cancelled');
              } else if (response.errorCode) {
                Alert.alert('Lỗi', `Camera error: ${response.errorMessage}`);
              } else if (response.assets && response.assets.length > 0) {
                const asset = response.assets[0];
                addImage(asset.uri || '', asset.fileName || `photo_${Date.now()}.jpg`);
              }
            }
          );
        },
      },
      {
        text: 'Thư viện',
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              selectionLimit: 3 - images.length,
              quality: 0.8,
            },
            (response) => {
              if (response.didCancel) {
                console.log('Library cancelled');
              } else if (response.errorCode) {
                Alert.alert('Lỗi', `Library error: ${response.errorMessage}`);
              } else if (response.assets && response.assets.length > 0) {
                response.assets.forEach((asset) => {
                  addImage(asset.uri || '', asset.fileName || `photo_${Date.now()}.jpg`);
                });
              }
            }
          );
        },
      },
      { text: 'Hủy', style: 'cancel' },
    ]);
  };

  const handleCheckIn = async () => {
    if (!selectedPlace) {
      Alert.alert('Lỗi', 'Vui lòng chọn địa điểm');
      return;
    }

    try {
      let mediaUrls: string[] = [];
      
      // Upload all images to Cloudinary
      if (images.length > 0) {
        Alert.alert('Đang tải ảnh', 'Vui lòng đợi...');
        mediaUrls = await uploadAllImages();
        Alert.alert('Thành công', 'Ảnh đã tải lên');
      }

      await checkInMutation({
        variables: {
          placeId: selectedPlace.mapboxId,
          content: content,
          media: mediaUrls,
        },
      });
    } catch (error) {
      console.error('Check-in error:', error);
      Alert.alert('Lỗi', 'Check-in thất bại');
    }
  };

  const handleGoBack = () => {
    if (step === 'confirm') {
      setStep('place');
    } else if (step === 'place') {
      setStep('location');
    }
  };

  const renderLocationStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepContent}>
        {isDetecting ? (
          <>
            <ActivityIndicator size="large" color="#5385f3ff" style={styles.spinner} />
            <Text style={styles.stepTitle}>Detecting nearby places…</Text>
            <Icon name="navigation" size={48} color="#5385f3ff" style={styles.icon} />
          </>
        ) : (
          <>
            <Icon name="check-circle" size={48} color="#4CAF50" style={styles.icon} />
            <Text style={styles.stepTitle}>Location detected!</Text>
            <Text style={styles.stepSubtitle}>
              Found {nearbyPlaces.length} nearby places
            </Text>
          </>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => setStep('place')}
        disabled={isDetecting}
      >
        <Text style={styles.buttonText}>
          {isDetecting ? 'Detecting...' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPlaceStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select a place</Text>
      <Text style={styles.stepSubtitle}>
        Choose from {nearbyPlaces.length} nearby places
      </Text>

      <ScrollView style={styles.placesList}>
        {nearbyPlaces.map((place) => (
          <TouchableOpacity
            key={place.mapboxId}
            style={styles.placeItem}
            onPress={() => handleSelectPlace(place)}
          >
            {place.thumbnail && (
              <Image source={{ uri: place.thumbnail }} style={styles.placeImage} />
            )}
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeDetails}>
                {place.types?.join(', ') || 'Place'} • {place.address}
              </Text>
            </View>
            <Icon name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleGoBack}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConfirmStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Confirm check-in</Text>

      {selectedPlace && (
        <View style={styles.selectedPlaceCard}>
          {selectedPlace.thumbnail && (
            <Image
              source={{ uri: selectedPlace.thumbnail }}
              style={styles.selectedPlaceImage}
            />
          )}
          <View style={styles.selectedPlaceInfo}>
            <Text style={styles.selectedPlaceName}>{selectedPlace.name}</Text>
            <Text style={styles.selectedPlaceType}>
              {selectedPlace.types?.join(', ') || 'Place'}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>How was your experience?</Text>
        <TextInput
          style={styles.input}
          placeholder="Share your thoughts..."
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />
      </View>

      {/* Images Section */}
      <View style={styles.imagesContainer}>
        <Text style={styles.inputLabel}>Ảnh ({images.length}/3)</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.imagesList}
        >
          {images.map((image: any, index: number) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image.uri }} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => removeImage(index)}
              >
                <Icon name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}

          {images.length < 3 && (
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={handleAddImage}
              disabled={uploading}
            >
              <Icon name="camera" size={32} color="#5385f3ff" />
              <Text style={styles.addImageText}>Thêm ảnh</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleGoBack}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={handleCheckIn}
          disabled={checkingIn}
        >
          <Text style={styles.buttonText}>
            {checkingIn ? 'Checking in...' : 'Check In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Check In</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Steps indicator */}
        <View style={styles.stepsIndicator}>
          <View style={[styles.stepIndicator, step !== 'location' && styles.completed]}>
            <Icon
              name={step !== 'location' ? 'check' : 'map-pin'}
              size={20}
              color={step !== 'location' ? '#fff' : '#5385f3ff'}
            />
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepIndicator, step !== 'place' && styles.completed]}>
            <Icon
              name={step !== 'place' ? 'check' : 'map-marker'}
              size={20}
              color={step !== 'place' ? '#fff' : '#5385f3ff'}
            />
          </View>
          <View style={styles.stepLine} />
          <View style={[styles.stepIndicator, step === 'confirm' && styles.completed]}>
            <Icon
              name={step === 'confirm' ? 'check' : 'checkmark-circle'}
              size={20}
              color={step === 'confirm' ? '#fff' : '#5385f3ff'}
            />
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
          {step === 'location' && renderLocationStep()}
          {step === 'place' && renderPlaceStep()}
          {step === 'confirm' && renderConfirmStep()}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepsIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  stepIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#5385f3ff',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  completed: {
    backgroundColor: '#5385f3ff',
    borderColor: '#5385f3ff',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  stepContainer: {
    paddingVertical: 20,
  },
  stepContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  icon: {
    marginTop: 16,
  },
  spinner: {
    marginBottom: 16,
  },
  placesList: {
    marginVertical: 16,
    maxHeight: 400,
  },
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  placeImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  placeDetails: {
    fontSize: 12,
    color: '#999',
  },
  selectedPlaceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#5385f3ff',
  },
  selectedPlaceImage: {
    width: '100%',
    height: 150,
  },
  selectedPlaceInfo: {
    padding: 12,
  },
  selectedPlaceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  selectedPlaceType: {
    fontSize: 12,
    color: '#999',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#5385f3ff',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  imagesContainer: {
    marginBottom: 20,
  },
  imagesList: {
    marginTop: 12,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 10,
    color: '#5385f3ff',
    marginTop: 4,
    fontWeight: '600',
  },
});
