import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { Coordinates } from "../graphql/interfaces/entities/place.interface";

export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Quyền truy cập vị trí',
          message: 'Ứng dụng cần quyền truy cập vị trí của bạn',
          buttonNeutral: 'Hỏi lại sau',
          buttonNegative: 'Từ chối',
          buttonPositive: 'Đồng ý',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // Trên iOS, chỉ cần gọi API, hệ thống sẽ tự popup xin quyền dựa trên Info.plist
    return new Promise(resolve => {
      Geolocation.requestAuthorization('whenInUse').then(auth => {
        resolve(auth === 'granted');
      });
    });
  }
}

export function getDistanceFromLatLonInKm(
  currentCoordinates: Coordinates | null,
  nearbyCoordinates: Coordinates | null,
  distance: number | null = null,
): string {
  let distanceKm = distance; // khoảng cách đã có sẵn (km)
  if (!distanceKm) {
    if (!currentCoordinates || !nearbyCoordinates) {
      return '0 m';
    }
    const R = 6371; // bán kính Trái Đất (km)
    const dLat = deg2rad(nearbyCoordinates.lat - currentCoordinates.lat);
    const dLon = deg2rad(nearbyCoordinates.lng - currentCoordinates.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(currentCoordinates.lat)) *
      Math.cos(deg2rad(currentCoordinates.lng)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distanceKm = R * c; // khoảng cách (km)
  }
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`; // đổi sang mét
  }
  return `${distanceKm.toFixed(2)} km`;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}