import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { useNavigation } from '@react-navigation/native';
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import useLocation from '../../hooks/useLocation';
import AppLayout from '../../components/common/AppLayout';
import { GET_CHECKIN_FEED, GET_NEARBY_PLACES } from '../../graphql/queries/map.query';
import { Coordinates, MapPlace } from '../../graphql/interfaces/entities/place.interface';
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

export default function MapPage() {
  const navigation = useNavigation<NavigationProp>();
  const location = useLocation();
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
        {/* Bản đồ */}
        <MapboxGL.MapView
          style={{ flex: 1 }}
          styleURL={MapboxGL.StyleURL.Street}
          onPress={() => handleSelectPlace(null)}
        >
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={[
              location?.lng || 106.660172,
              location?.lat || 10.762622,
            ]}
            animationMode="flyTo"
            animationDuration={1000}
          />

          {/* Markers for each check-in */}
          {places.map((place) => (
            <MapboxGL.MarkerView
              key={place.mapboxId}
              coordinate={[place.lng, place.lat]}
            >
              <TouchableOpacity
                onPress={() => handleSelectPlace(place)}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: place.thumbnail }}
                  style={[
                    styles.markerImage,
                    selectedCheckIn?.place?.mapboxId === place.mapboxId && styles.markerImageSelected,
                  ]}
                />
              </TouchableOpacity>
            </MapboxGL.MarkerView>
          ))}
        </MapboxGL.MapView>

        {/* Thẻ thông tin check-in */}
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

        {/* Thanh điều hướng */}
        <View style={styles.navBar}>
          <Text style={styles.navItem}>Home</Text>
          <Text style={styles.navItem}>Map</Text>
          <Text style={styles.navItem}>Rewards</Text>
          <Text style={styles.navItem}>Profile</Text>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerImageSelected: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#0a84ff',
  },
  card: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  placeName: { fontSize: 18, fontWeight: '600' },
  userName: { color: '#666', marginBottom: 8 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: {
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginTop: 4,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navItem: { fontSize: 14, fontWeight: '500' },
});

