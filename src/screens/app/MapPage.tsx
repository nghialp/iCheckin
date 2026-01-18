import React, { useEffect, useState } from 'react';
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
import { useQuery as useApolloQuery } from '@apollo/client/react';
import { GET_CHECKIN_FEED, GET_NEARBY_PLACES } from '../../graphql/queries';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import { Checkin, Place } from '../../graphql/types';
import useLocation from '../../hooks/useLocation';

const screenWidth = Dimensions.get('window').width;
interface CHECKINS {
  checkIns: Checkin[];
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;


export default function MapPage() {
  const navigation = useNavigation<NavigationProp>();
  const location = useLocation();
  // Query for nearby places on map
  const { data: nearbyData, loading: nearbyLoading } = useApolloQuery(GET_NEARBY_PLACES, {
    variables: {
      latitude: location?.lat || 0,
      longitude: location?.lng || 0,
      radius: 5000, // 5km radius for map
    },
    skip: !location,
  });
  const places = (nearbyData as any)?.nearbyPlaces || [];

  const { data, loading, error } = useApolloQuery<CHECKINS>(GET_CHECKIN_FEED);
  const [selectedCheckIn, setSelectedCheckIn] = useState<Checkin | null>(null);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const checkIns: Checkin[] = data?.checkIns || [];

  const handleSelectPlace = (place: Place) => {
    const { data, loading, error } = useApolloQuery(GET_CHECKIN_FEED,
      {
        variables: {
          mapboxId: place.mapboxId
        },
      }
    );
  }
  return (
    <View style={{ flex: 1 }}>
      {/* Bản đồ */}
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL={MapboxGL.StyleURL.Street}
        onPress={() => setSelectedCheckIn(null)}
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
        {places.map((place: any) => (
          <MapboxGL.MarkerView
            key={place.mapboxId}
            coordinate={[place.lng, place.lat]}
          >
            <TouchableOpacity
              onPress={() => setSelectedCheckIn(place)}
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

          {/* Bình luận
          {selectedCheckIn.comments?.length ? (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.comment}>
                {selectedCheckIn.comments[0].user.name}:{' '}
                {selectedCheckIn.comments[0].content}
              </Text>
              <Text style={styles.timestamp}>2h</Text>
            </View>
          ) : null} */}
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
  comment: { marginTop: 8, fontStyle: 'italic' },
  timestamp: { color: '#999', fontSize: 12 },
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