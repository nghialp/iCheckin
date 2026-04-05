import React, { useState } from 'react';
import {
  View,
  Text,
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
import { styles } from '../../styles/screens/SearchScreen.styles';

interface Filter {
  types: string[];
  distance: number | null;
  rating: number | null;
  isOpenNow: boolean;
}

const SearchPage = () => {
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
          keyExtractor={(item, index) => item.id || item.mapboxId || `place-${index}`}
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

export default SearchPage;
