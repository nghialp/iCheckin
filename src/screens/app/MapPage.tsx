import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import useLocation from '../../hooks/useLocation';
import AppLayout from '../../components/common/AppLayout';
import { GET_CHECKIN_FEED, GET_NEARBY_PLACES } from '../../graphql/queries/map.query';
import { Coordinates, MapPlace } from '../../graphql/interfaces/entities/place.interface';
import { styles } from '../../styles/screens/MapPage.styles';
import { Checkin, CHECKINS } from '../../graphql/interfaces/entities/checkin.interface';

const screenWidth = Dimensions.get('window').width;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;

// GraphQL Response types
interface NearbyPlacesResponse {
  nearbyPlaces: MapPlace[];
}

interface CheckInsResponse {
  checkIns: Checkin[];
}

const MapPage = () => {
  const navigation = useNavigation<NavigationProp>();
  const location = useLocation();
  const { t } = useTranslation();
  const [selectedPlace, setSelectedPlace] = useState<MapPlace | null>(null);

  // Query for nearby places on map
  const { data: nearbyData, loading: nearbyLoading } = useApolloQueryWrapper<NearbyPlacesResponse, Coordinates>(
    GET_NEARBY_PLACES,
    {
      variables: {
        lat: location?.lat || 0,
        lng: location?.lng || 0,
        radius: 5000, // 5km radius for map
      },
      skip: !location,
    }
  );
  const places = (nearbyData as NearbyPlacesResponse)?.nearbyPlaces || [];

  // Query for check-ins when a place is selected
  const { data: checkInsData, loading: checkInsLoading } = useApolloQueryWrapper<CheckInsResponse>(
    GET_CHECKIN_FEED,
    {
      variables: {
        mapboxId: selectedPlace?.mapboxId || '',
      },
      skip: !selectedPlace?.mapboxId,
    }
  );

  const [selectedCheckIn, setSelectedCheckIn] = useState<Checkin | null>(null);

  // Update selectedCheckIn when checkInsData changes
  useEffect(() => {
    if (checkInsData?.checkIns && checkInsData.checkIns.length > 0) {
      setSelectedCheckIn(checkInsData.checkIns[0]);
    } else {
      setSelectedCheckIn(null);
    }
  }, [checkInsData]);

  const handleSelectPlace = (place: MapPlace | null) => {
    setSelectedPlace(place);
    if (place === null) {
      setSelectedCheckIn(null);
    }
  };

  return (
    <AppLayout>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('mapPage.nearbyPlaces')}</Text>
          <Text style={styles.headerSubtitle}>{t('mapPage.loadingPlaces')}</Text>
        </View>

        {/* Loading State */}
        {nearbyLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0a84ff" />
            <Text style={styles.loadingText}>{t('common.loading')}</Text>
          </View>
        )}

        {/* Places List */}
        {!nearbyLoading && (
          <ScrollView style={styles.placesContainer} contentContainerStyle={styles.placesContent}>
            {places.length > 0 ? (
              places.map((place) => (
                <TouchableOpacity
                  key={place.mapboxId}
                  style={[
                    styles.placeCard,
                    selectedPlace?.mapboxId === place.mapboxId && styles.placeCardSelected,
                  ]}
                  onPress={() => handleSelectPlace(place)}
                >
                  {place.thumbnail && (
                    <Image
                      source={{ uri: place.thumbnail }}
                      style={styles.placeImage}
                    />
                  )}
                  <View style={styles.placeInfo}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeAddress}>{place.address}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{t('common.noResults')}</Text>
              </View>
            )}
          </ScrollView>
        )}

        {/* Selected Check-in Info */}
        {selectedCheckIn && (
          <View style={styles.card}>
            <Text style={styles.placeName}>{selectedCheckIn.place.name}</Text>
            <Text style={styles.userName}>by {selectedCheckIn.user?.name}</Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionButton}>
                <Text>❤️ Like</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  navigation.navigate('LocationDetail', {
                    placeId: selectedCheckIn.place.id,
                  })
                }
              >
                <Text>Check In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </AppLayout>
  );
}

export default MapPage;

