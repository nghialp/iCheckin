import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import Icon from '../../components/common/Icon';
import FilterModal from '../../components/common/FilterModal';
import { SEARCH_PLACES } from '../../graphql/queries';
import { GET_NEARBY_PLACES } from '../../graphql/queries/map.query';
import useLocation from '../../hooks/useLocation';

interface Filter {
  types: string[];
  distance: number | null;
  rating: number | null;
  isOpenNow: boolean;
}

export default function SearchPage() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    types: [],
    distance: null,
    rating: null,
    isOpenNow: false,
  });

  // Query for nearby places
  const { data: nearbyData, loading: nearbyLoading } = useApolloQueryWrapper(GET_NEARBY_PLACES, {
    variables: {
      lat: location?.lat || 0,
      lng: location?.lng || 0,
      radius: (filters.distance || 10) * 1000, // Convert km to meters
    },
    skip: !location,
  });

  // Query for search results
  const { data: searchData, loading: searchLoading } = useApolloQueryWrapper(SEARCH_PLACES, {
    variables: {
      query: searchQuery,
      lat: location?.lat || 0,
      lng: location?.lng || 0,
    },
    skip: !searchQuery,
  });

  const places = searchQuery 
    ? (searchData as any)?.searchPlaces || [] 
    : (nearbyData as any)?.nearbyPlaces || [];

  const handleResetFilters = () => {
    setFilters({
      types: [],
      distance: null,
      rating: null,
      isOpenNow: false,
    });
  };

  const handleApplyFilters = (newFilters: Filter) => {
    setFilters(newFilters);
    setShowFilterModal(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSelectPlace = (place: any) => {
    navigation.navigate('PlaceDetail', { placeId: place.id });
  };

  const renderPlaceItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => handleSelectPlace(item)}
    >
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.placeThumbnail} />
      )}
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeType}>{item.type}</Text>
        <Text style={styles.placeDistance}>
          {item.distance ? `${item.distance.toFixed(1)} km away` : 'Distance unknown'}
        </Text>
      </View>
      <View style={styles.placeRight}>
        {item.rating && (
          <View style={styles.ratingBadge}>
            <Icon name="star" size={14} color="#FFB800" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search places, users, hashtags…"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Icon name="close" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Icon name="tune" size={20} color="#0066CC" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={48} color="#ddd" />
          <Text style={styles.mapText}>Map View</Text>
        </View>
      </View>

      {/* Nearby Places / Search Results */}
      <View style={styles.resultsSection}>
        <Text style={styles.sectionTitle}>
          {searchQuery ? 'Search Results' : 'Nearby Places'}
        </Text>
        <FlatList
          data={places}
          renderItem={renderPlaceItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            !nearbyLoading && !searchLoading ? (
              <View style={styles.emptyState}>
                <Icon name="magnify" size={48} color="#ddd" />
                <Text style={styles.emptyText}>
                  {searchQuery ? 'No places found' : 'No nearby places'}
                </Text>
              </View>
            ) : null
          }
        />
      </View>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        initialFilters={filters}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    paddingVertical: 10,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  mapContainer: {
    height: '20%',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  listContent: {
    gap: 12,
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    paddingRight: 12,
  },
  placeThumbnail: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
  },
  placeInfo: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  placeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  placeDistance: {
    fontSize: 12,
    color: '#999',
  },
  placeRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fffbf0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFB800',
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
});
