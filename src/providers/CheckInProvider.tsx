import React, { createContext, useState, ReactNode } from 'react';
import { MapPlace } from '../graphql/interfaces/entities/place.interface';

interface CheckInContextType {
  isModalVisible: boolean;
  nearbyPlaces: MapPlace[];
  openCheckInModal: (places: any[]) => void;
  closeCheckInModal: () => void;
}

export const CheckInContext = createContext<CheckInContextType>({
  isModalVisible: false,
  nearbyPlaces: [],
  openCheckInModal: () => {},
  closeCheckInModal: () => {},
});

interface CheckInProviderProps {
  children: ReactNode;
}

export const CheckInProvider: React.FC<CheckInProviderProps> = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<MapPlace[]>([]);


  const openCheckInModal = (places: any[]) => {
    setNearbyPlaces(places);
    setIsModalVisible(true);
  };

  const closeCheckInModal = () => {
    setIsModalVisible(false);
  };

  return (
    <CheckInContext.Provider
      value={{
        isModalVisible,
        nearbyPlaces,
        openCheckInModal,
        closeCheckInModal,
      }}
    >
      {children}
    </CheckInContext.Provider>
  );
};
