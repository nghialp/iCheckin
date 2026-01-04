import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client/react';
import { GET_CHECKIN_FEED } from '../../graphql/queries';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import { Checkin } from '../../graphql/types';

const screenWidth = Dimensions.get('window').width;
interface CHECKINS {
    checkIns: Checkin[];
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Map'>;


export default function MapPage() {
  const navigation = useNavigation<NavigationProp>();
  const { data, loading, error } = useQuery<CHECKINS>(GET_CHECKIN_FEED);
  const [selectedCheckIn, setSelectedCheckIn] = useState<Checkin | null>(null);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const checkIns: Checkin[] = data?.checkIns || [];

  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);

  useEffect(() => {
    const requestLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return;
      }

      Geolocation.getCurrentPosition(
        (position) => {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        (error) => {
          console.error('Location error:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Bản đồ */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: region?.latitude || 40.7128,
          longitude: region?.longitude || -74.006,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={() => setSelectedCheckIn(null)}
      >
        {checkIns.map((ci) => (
          <Marker
            key={ci.id}
            coordinate={{
              latitude: ci.place.lat,
              longitude: ci.place.lng,
            }}
            onPress={() => setSelectedCheckIn(ci)}
          >
            <Image
              source={{ uri: ci.user?.avatarUrl }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </Marker>
        ))}
      </MapView>

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