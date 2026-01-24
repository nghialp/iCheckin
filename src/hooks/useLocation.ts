// src/hooks/useLocation.ts
import { useState, useEffect } from "react";
import Geolocation from "react-native-geolocation-service";
import { requestLocationPermission } from "../utils/functions";
import { Coordinates } from "../graphql/interfaces/entities/place.interface";

export default function useLocation() {
  // Khai báo kiểu rõ ràng thay vì any
  const [location, setLocation] = useState<Coordinates | null>(null);
    useEffect(() => {
      (async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          console.log('Không có quyền vị trí');
          return;
        }
  
        Geolocation.getCurrentPosition(
          pos => {
            setLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            });
          },
          error => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      })();
    }, []);

  return location;
}