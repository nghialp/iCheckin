import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import { useApolloMutationWrapper } from '../../hooks/useApolloMutationWrapper';
import PagerView from 'react-native-pager-view';
import { styles } from '../../styles/screens/CheckInPage.styles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Appbar, IconButton, Button, Card, Divider } from 'react-native-paper';
import { CHECK_IN_PLACE_MUTATION } from '../../graphql/mutations';
import useLocation from '../../hooks/useLocation';
import { getDistanceFromLatLonInKm } from '../../utils/functions';
import { GET_NEARBY_PLACES } from '../../graphql/queries/map.query';
import { Coordinates, MapPlace } from '../../graphql/interfaces/entities/place.interface';

const { width } = Dimensions.get('window');

// GraphQL Response types
interface NearbyPlacesResponse {
  nearbyPlaces: MapPlace[];
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

type PlaceWithDistance = MapPlace & { distance: number };

const CheckInPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const location = useLocation();

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<MapPlace | null>(null);
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
  const { data, loading: loadingPlaces, error } = useApolloQueryWrapper<NearbyPlacesResponse>(
    GET_NEARBY_PLACES,
    {
      variables: {
        lat: currentLocation?.lat || 10.762622,
        lng: currentLocation?.lng || 106.660172,
        radius: 5, // 5km radius
      },
      skip: !currentLocation,
    }
  );

  // Step 3: Check-in mutation
  const { mutate: checkInPlace, loading: loadingCheckIn } = useApolloMutationWrapper<CheckInPlaceResponse>(
    CHECK_IN_PLACE_MUTATION
  );

  const nearbyPlaces: MapPlace[] = React.useMemo(() => {
    if (!data?.nearbyPlaces) return [];
    return data.nearbyPlaces.map((place) => ({
      ...place,
      distance: place?.distance || 0,
    }));
  }, [data, currentLocation]);

  const handleSelectPlace = (place: MapPlace) => {
    setSelectedPlace(place);
    setCurrentStep(2);
  };

  const handleCheckIn = async () => {
    if (!selectedPlace) return;

    try {
      const res = await checkInPlace({
        placeId: selectedPlace.mapboxId,
        content,
        photos: selectedPhotos,
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
          keyExtractor={(item) => item.mapboxId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.placeCard}
              onPress={() => handleSelectPlace(item)}
            >
              <View style={styles.placeIcon}>
                <IconButton
                  icon={getPlaceIcon(item?.types?.[0])}
                  size={24}
                  iconColor="#0066CC"
                />
              </View>
              <View style={styles.placeInfo}>
                <Text style={styles.placeName}>{item.name}</Text>
                <Text style={styles.placeType}>{item?.types?.[0]}</Text>
                <Text style={styles.placeAddress}>{item.address}</Text>
              </View>
              <View style={styles.placeDistance}>
                <Text style={styles.distanceText}>{getDistanceFromLatLonInKm(currentLocation, item, item.distance)} km</Text>
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
                {selectedPlace?.types?.[0] || ''}
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

export default CheckInPage;

