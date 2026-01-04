import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client/react';
import PagerView from 'react-native-pager-view';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Appbar, IconButton, Button, Card, Divider } from 'react-native-paper';
import { GET_NEARBY_PLACES } from '../../graphql/queries';
import { CHECK_IN_PLACE_MUTATION } from '../../graphql/mutations';
import useLocation from '../../hooks/useLocation';
import { Coordinates, GooglePlace } from '../../graphql/types/place';
import { getDistanceFromLatLonInKm } from '../../utils/functions';

const { width } = Dimensions.get('window');

// GraphQL Response types
interface NearbyPlacesResponse {
  nearbyPlaces: GooglePlace[];
}

interface CheckInPlaceResponse {
  checkInPlace: {
    success: boolean;
    message: string;
    checkin?: {
      id: string;
      checkedAt: string;
      place: {
        id: string;
        name: string;
      };
    };
  };
}

type PlaceWithDistance = GooglePlace & { distance: string };

export default function CheckInPage() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<GooglePlace | null>(null);
  const [content, setContent] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);

  // Step 1: Get current location
  useEffect(() => {
    if (location) {
      setCurrentLocation(location);
    }
  }, [location]);

  // Step 2: Query nearby places
  const { data, loading: loadingPlaces, error } = useQuery<NearbyPlacesResponse>(GET_NEARBY_PLACES, {
    variables: {
      lat: currentLocation?.lat || 10.762622,
      lng: currentLocation?.lng || 106.660172,
      radius: 5, // 5km radius
    },
    skip: !currentLocation,
  });

  // Step 3: Check-in mutation
  const [checkInPlace, { loading: loadingCheckIn }] = useMutation<CheckInPlaceResponse>(CHECK_IN_PLACE_MUTATION);

  const nearbyPlaces: PlaceWithDistance[] = React.useMemo(() => {
    if (!data?.nearbyPlaces) return [];
    return data.nearbyPlaces.map((place) => ({
      ...place,
      distance: currentLocation
        ? getDistanceFromLatLonInKm(currentLocation, place)
        : '0',
    }));
  }, [data, currentLocation]);

  const handleSelectPlace = (place: GooglePlace) => {
    setSelectedPlace(place);
    setCurrentStep(2);
  };

  const handleCheckIn = async () => {
    if (!selectedPlace) return;

    try {
      const res = await checkInPlace({
        variables: {
          placeId: selectedPlace.googlePlaceId,
          content,
          photos: selectedPhotos,
        },
      });

      if (res.data?.checkInPlace?.success) {
        Alert.alert(t('checkin.success'), t('checkin.successMessage'), [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        Alert.alert(t('checkin.error'), res.data?.checkInPlace?.message || t('checkin.errorMessage'));
      }
    } catch (error: any) {
      Alert.alert(t('checkin.error'), error.message || t('checkin.errorMessage'));
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.locationDetectionContainer}>
        <IconButton
          icon="map-marker-radius"
          size={80}
          iconColor="#0066CC"
          style={styles.gpsIcon}
        />
        <Text style={styles.detectingText}>{t('checkin.detectingLocation')}</Text>
        <Text style={styles.subDetectingText}>
          {currentLocation
            ? `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`
            : t('checkin.waitingForGps')}
        </Text>

        {currentLocation && nearbyPlaces.length > 0 && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => setCurrentStep(1)}
          >
            <Text style={styles.nextButtonText}>{t('checkin.viewNearbyPlaces')}</Text>
            <IconButton icon="arrow-right" size={20} iconColor="#fff" />
          </TouchableOpacity>
        )}

        {loadingPlaces && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0066CC" />
            <Text style={styles.loadingText}>{t('checkin.searchingPlaces')}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t('checkin.selectPlace')}</Text>
      <Text style={styles.stepSubtitle}>
        {nearbyPlaces.length} {t('checkin.placesNearby')}
      </Text>

      {loadingPlaces ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loadingText}>{t('checkin.loadingPlaces')}</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t('checkin.loadPlacesError')}</Text>
          <Button onPress={() => {}}>{t('checkin.retry')}</Button>
        </View>
      ) : (
        <FlatList
          data={nearbyPlaces}
          keyExtractor={(item) => item.googlePlaceId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.placeCard}
              onPress={() => handleSelectPlace(item)}
            >
              <View style={styles.placeIcon}>
                <IconButton
                  icon={getPlaceIcon(item.type)}
                  size={24}
                  iconColor="#0066CC"
                />
              </View>
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeType}>{item.type}</Text>
                <Text style={styles.placeAddress}>{item.address}</Text>
              </View>
              <View style={styles.placeDistance}>
                <Text style={styles.distanceText}>{item.distance} km</Text>
                <IconButton icon="chevron-right" size={20} iconColor="#999" />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.placesList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{t('checkin.confirmCheckIn')}</Text>

      {/* Selected Place Card */}
      <Card style={styles.selectedPlaceCard}>
        <Card.Content>
          <View style={styles.selectedPlaceHeader}>
            <IconButton icon="map-marker" size={24} iconColor="#0066CC" />
            <View style={styles.selectedPlaceInfo}>
              <Text style={styles.selectedPlaceName}>
                {selectedPlace?.name || t('checkin.unknownPlace')}
              </Text>
              <Text style={styles.selectedPlaceType}>
                {selectedPlace?.type || ''}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Feelings Input */}
      <Text style={styles.inputLabel}>{t('checkin.shareThoughts')}</Text>
      <TextInput
        style={styles.feelingsInput}
        placeholder={t('checkin.feelingsPlaceholder')}
        placeholderTextColor="#999"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={3}
      />

      {/* Quick Tags */}
      <View style={styles.quickTagsContainer}>
        {['😊', '😎', '❤️', '🙏', '🎉', '📸'].map((emoji) => (
          <TouchableOpacity
            key={emoji}
            style={styles.quickTag}
            onPress={() => setContent((prev) => `${prev} ${emoji}`)}
          >
            <Text style={styles.quickTagText}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Upload Photo */}
      <TouchableOpacity style={styles.uploadPhotoButton}>
        <IconButton icon="camera-plus" size={20} iconColor="#0066CC" />
        <Text style={styles.uploadPhotoText}>{t('checkin.addPhoto')}</Text>
      </TouchableOpacity>

      {/* Check-in Button */}
      <TouchableOpacity
        style={[
          styles.checkInButton,
          loadingCheckIn && styles.checkInButtonDisabled,
        ]}
        onPress={handleCheckIn}
        disabled={loadingCheckIn}
      >
        {loadingCheckIn ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <IconButton icon="check-circle" size={24} iconColor="#fff" />
            <Text style={styles.checkInButtonText}>{t('checkin.confirmCheckIn')}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title={t('checkin.title')} />
      </Appbar.Header>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {[0, 1, 2].map((step) => (
          <View key={step} style={styles.progressItem}>
            <View
              style={[
                styles.progressDot,
                currentStep >= step && styles.progressDotActive,
              ]}
            />
            {step < 2 && (
              <View
                style={[
                  styles.progressLine,
                  currentStep > step && styles.progressLineActive,
                ]}
              />
            )}
          </View>
        ))}
      </View>

      {/* Step Labels */}
      <View style={styles.stepLabelsContainer}>
        <Text style={[styles.stepLabel, currentStep === 0 && styles.stepLabelActive]}>
          {t('checkin.step1')}
        </Text>
        <Text style={[styles.stepLabel, currentStep === 1 && styles.stepLabelActive]}>
          {t('checkin.step2')}
        </Text>
        <Text style={[styles.stepLabel, currentStep === 2 && styles.stepLabelActive]}>
          {t('checkin.step3')}
        </Text>
      </View>

      {/* Pager View */}
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={(e) => setCurrentStep(e.nativeEvent.position)}
      >
        <View key="1">{renderStep1()}</View>
        <View key="2">{renderStep2()}</View>
        <View key="3">{renderStep3()}</View>
      </PagerView>
    </View>
  );
}

// Helper function to get icon based on place type
function getPlaceIcon(type: string): string {
  const typeLower = type?.toLowerCase() || '';
  if (typeLower.includes('cafe') || typeLower.includes('coffee')) return 'coffee';
  if (typeLower.includes('restaurant') || typeLower.includes('food')) return 'food';
  if (typeLower.includes('park') || typeLower.includes('garden')) return 'tree';
  if (typeLower.includes('hotel') || typeLower.includes('accommodation')) return 'bed';
  if (typeLower.includes('mall') || typeLower.includes('shopping')) return 'shopping';
  if (typeLower.includes('museum') || typeLower.includes('gallery')) return 'palette';
  if (typeLower.includes('beach') || typeLower.includes('sea')) return 'waves';
  return 'map-marker';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  pagerView: {
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    padding: 16,
  },

  // Progress
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 40,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  progressDotActive: {
    backgroundColor: '#0066CC',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ddd',
  },
  progressLineActive: {
    backgroundColor: '#0066CC',
  },

  // Step Labels
  stepLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  stepLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#0066CC',
    fontWeight: '600',
  },

  // Step 1: Location Detection
  locationDetectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpsIcon: {
    backgroundColor: '#e3f2fd',
    borderRadius: 40,
  },
  detectingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  subDetectingText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066CC',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 24,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },

  // Step 2: Select Place
  stepTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  placesList: {
    paddingBottom: 16,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  placeIcon: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  placeType: {
    fontSize: 12,
    color: '#0066CC',
    marginTop: 2,
  },
  placeAddress: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  placeDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
  },

  // Step 3: Confirm Check-in
  selectedPlaceCard: {
    marginBottom: 16,
    backgroundColor: '#f0f7ff',
  },
  selectedPlaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedPlaceInfo: {
    flex: 1,
  },
  selectedPlaceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  selectedPlaceType: {
    fontSize: 12,
    color: '#666',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  feelingsInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  quickTagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quickTag: {
    backgroundColor: '#f0f0f0',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickTagText: {
    fontSize: 20,
  },
  uploadPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  uploadPhotoText: {
    color: '#0066CC',
    fontWeight: '600',
    marginLeft: 8,
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  checkInButtonDisabled: {
    backgroundColor: '#ccc',
  },
  checkInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

