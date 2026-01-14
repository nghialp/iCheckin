import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery as useApolloQuery } from '@apollo/client/react';
import Icon from '../../components/common/Icon';
import { GET_NEARBY_PLACES } from '../../graphql/queries';
import useLocation from '../../hooks/useLocation';

interface Place {
  id: string;
  name: string;
  type: string;
  address: string;
  image: string;
  rating: number;
  distance: number;
  isOpenNow: boolean;
  hours?: string;
  lat: number;
  lng: number;
  recentCheckIns?: number;
}

export default function CheckInScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const location = useLocation();
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [bottomSheetHeight] = useState(new Animated.Value(120));

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

  const handleSelectPlace = (place: Place) => {
    setSelectedPlace(place);
    Animated.timing(bottomSheetHeight, {
      toValue: 280,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleCloseBottomSheet = () => {
    Animated.timing(bottomSheetHeight, {
      toValue: 120,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setSelectedPlace(null);
    });
  };

  const handleViewDetail = () => {
    if (selectedPlace) {
      navigation.navigate('CheckInDetail', { placeId: selectedPlace.id });
    }
  };

  const handleQuickCheckIn = () => {
    if (selectedPlace) {
      // Open check-in modal with pre-selected place
      navigation.navigate('CheckIn', { placeId: selectedPlace.id });
    }
  };

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="map-marker" size={24} color="#0066CC" />
          <Text style={styles.headerTitle}>Check In</Text>
        </View>
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="magnify" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Map Container (Placeholder for actual map) */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          {/* User Location Pin */}
          <View style={styles.userLocationPin}>
            <View style={styles.userLocationDot} />
          </View>

          {/* Place Pins */}
          {places.map((place: Place, index: number) => (
            <TouchableOpacity
              key={place.id}
              style={[
                styles.placePin,
                {
                  top: `${15 + (index * 20)}%`,
                  left: `${10 + (index * 15)}%`,
                },
              ]}
              onPress={() => handleSelectPlace(place)}
            >
              <View
                style={[
                  styles.pinMarker,
                  selectedPlace?.id === place.id && styles.pinMarkerActive,
                ]}
              >
                {place.image ? (
                  <Image
                    source={{ uri: place.image }}
                    style={styles.pinImage}
                  />
                ) : (
                  <Icon name="map-marker" size={20} color="#fff" />
                )}
              </View>
              <View style={styles.pinLabel}>
                <Text style={styles.pinLabelText} numberOfLines={1}>
                  {place.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Loading or Empty State */}
          {nearbyLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading nearby places...</Text>
            </View>
          )}

          {!nearbyLoading && places.length === 0 && (
            <View style={styles.emptyStateContainer}>
              <Icon name="map-search" size={48} color="#ddd" />
              <Text style={styles.emptyStateText}>No places nearby</Text>
            </View>
          )}
        </View>
      </View>

      {/* Bottom Sheet - Place Info */}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            height: bottomSheetHeight,
            paddingBottom: Math.max(insets.bottom, 16),
          },
        ]}
      >
        {selectedPlace ? (
          <>
            {/* Header with Close Button */}
            <View style={styles.bottomSheetHeader}>
              <View style={styles.dragHandle} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseBottomSheet}
              >
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Place Info */}
            <ScrollView style={styles.bottomSheetContent} scrollEnabled={false}>
              <View style={styles.placeCardInfo}>
                {/* Thumbnail */}
                {selectedPlace.image && (
                  <Image
                    source={{ uri: selectedPlace.image }}
                    style={styles.placeImage}
                  />
                )}

                {/* Place Details */}
                <View style={styles.placeDetailsSection}>
                  <Text style={styles.placeName}>{selectedPlace.name}</Text>
                  <Text style={styles.placeType}>{selectedPlace.type}</Text>

                  {/* Location */}
                  <View style={styles.infoRow}>
                    <Icon name="map-marker" size={16} color="#999" />
                    <Text style={styles.infoText}>{selectedPlace.address}</Text>
                  </View>

                  {/* Hours */}
                  {selectedPlace.hours && (
                    <View style={styles.infoRow}>
                      <Icon
                        name={selectedPlace.isOpenNow ? 'check-circle' : 'clock'}
                        size={16}
                        color={selectedPlace.isOpenNow ? '#4CAF50' : '#FF9800'}
                      />
                      <Text
                        style={[
                          styles.infoText,
                          {
                            color: selectedPlace.isOpenNow ? '#4CAF50' : '#FF9800',
                          },
                        ]}
                      >
                        {selectedPlace.isOpenNow ? 'Open' : 'Closed'} • {selectedPlace.hours}
                      </Text>
                    </View>
                  )}

                  {/* Rating & Distance */}
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Icon name="star" size={16} color="#FFB800" />
                      <Text style={styles.statText}>
                        {selectedPlace.rating.toFixed(1)}
                      </Text>
                    </View>
                    <View style={styles.statItem}>
                      <Icon name="navigation" size={16} color="#0066CC" />
                      <Text style={styles.statText}>
                        {selectedPlace.distance.toFixed(1)} km
                      </Text>
                    </View>
                    {selectedPlace.recentCheckIns && (
                      <View style={styles.statItem}>
                        <Icon name="check" size={16} color="#4CAF50" />
                        <Text style={styles.statText}>
                          {selectedPlace.recentCheckIns} check-ins
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionsSection}>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={handleViewDetail}
                >
                  <Text style={styles.detailButtonText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.checkInButton}
                  onPress={handleQuickCheckIn}
                >
                  <Icon name="check" size={18} color="#fff" />
                  <Text style={styles.checkInButtonText}>Check In</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        ) : (
          <View style={styles.bottomSheetEmpty}>
            <Text style={styles.bottomSheetEmptyText}>
              Tap a pin to view place details
            </Text>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F4FD',
    position: 'relative',
    overflow: 'hidden',
  },
  userLocationPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: 10,
  },
  userLocationDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0066CC',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placePin: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 5,
  },
  pinMarker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pinMarkerActive: {
    borderColor: '#FF5252',
    borderWidth: 3,
  },
  pinImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  pinLabel: {
    marginTop: 4,
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    maxWidth: 80,
  },
  pinLabelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  emptyStateContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
  },
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  bottomSheetEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetEmptyText: {
    fontSize: 14,
    color: '#999',
  },
  placeCardInfo: {
    marginBottom: 12,
  },
  placeImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  placeDetailsSection: {
    gap: 8,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  placeType: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  actionsSection: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  detailButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0066CC',
  },
  checkInButton: {
    flex: 1,
    backgroundColor: '#0066CC',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  checkInButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

// Note: Replace <View style={styles.mapPlaceholder}> with actual Mapbox <MapView> component
// For now using View placeholder to simulate map
