import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery as useApolloQuery } from '@apollo/client/react';
import Icon from '../../components/common/Icon';
import CheckInModal from '../../components/common/CheckInModal';
import { GET_PLACE_DETAIL_FULL, GET_PLACE_CHECKINS } from '../../graphql/queries';

interface PlaceDetail {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  image: string;
  rating: number;
  hours: string;
  isOpenNow: boolean;
  description?: string;
  lat: number;
  lng: number;
  distance: number;
  totalCheckIns?: number;
}

interface CheckIn {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  emotion?: string;
  images?: string[];
  createdAt: string;
  likes: number;
  comments: number;
  liked?: boolean;
  timeAgo: string;
}

export default function CheckInDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const [checkInModalVisible, setCheckInModalVisible] = useState(false);
  const [selectedCheckIn, setSelectedCheckIn] = useState<CheckIn | null>(null);

  const placeId = route.params?.placeId;

  // Query place details
  const { data: placeData, loading: placeLoading } = useApolloQuery(GET_PLACE_DETAIL_FULL, {
    variables: { id: placeId },
    skip: !placeId,
  });

  // Query check-ins at this place
  const { data: checkInsData, loading: checkInsLoading } = useApolloQuery(
    GET_PLACE_CHECKINS,
    {
      variables: { placeId, limit: 20, offset: 0 },
      skip: !placeId,
    }
  );

  const place = (placeData as any)?.place as PlaceDetail;
  const checkIns = (checkInsData as any)?.placeCheckIns || [];

  const handleCheckIn = () => {
    setCheckInModalVisible(true);
  };

  const handleLikeCheckIn = (checkInId: string) => {
    // TODO: Implement like mutation
    console.log('Like check-in:', checkInId);
  };

  const handleCommentCheckIn = (checkIn: CheckIn) => {
    setSelectedCheckIn(checkIn);
    // TODO: Navigate to comments screen
  };

  const handleCheckInAgain = (checkIn: CheckIn) => {
    setSelectedCheckIn(checkIn);
    setCheckInModalVisible(true);
  };

  const renderCheckInItem = ({ item }: { item: CheckIn }) => (
    <View style={styles.checkInCard}>
      {/* User Header */}
      <View style={styles.checkInHeader}>
        <Image
          source={{ uri: item.user.avatar }}
          style={styles.userAvatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timeAgo}>{item.timeAgo}</Text>
        </View>
        {item.emotion && (
          <View style={styles.emotionBadge}>
            <Text style={styles.emotionText}>{item.emotion}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <Text style={styles.checkInContent}>{item.content}</Text>

      {/* Images */}
      {item.images && item.images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesScroll}
        >
          {item.images.map((image, index) => (
            <Image
              key={`${item.id}-${index}`}
              source={{ uri: image }}
              style={styles.checkInImage}
            />
          ))}
        </ScrollView>
      )}

      {/* Actions */}
      <View style={styles.checkInActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLikeCheckIn(item.id)}
        >
          <Icon
            name={item.liked ? 'heart' : 'heart-outline'}
            size={18}
            color={item.liked ? '#FF5252' : '#999'}
          />
          <Text style={styles.actionText}>{item.likes} Likes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleCommentCheckIn(item)}
        >
          <Icon name="message-outline" size={18} color="#999" />
          <Text style={styles.actionText}>{item.comments} Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleCheckInAgain(item)}
        >
          <Icon name="check" size={18} color="#4CAF50" />
          <Text style={styles.actionText}>Check In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (placeLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading place details...</Text>
      </SafeAreaView>
    );
  }

  if (!place) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Place not found</Text>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>{place.name}</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
      >
        {/* Hero Image */}
        <Image source={{ uri: place.image }} style={styles.heroImage} />

        {/* Place Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeType}>{place.type}</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={16} color="#FFB800" />
              <Text style={styles.ratingText}>{place.rating.toFixed(1)}</Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.infoItem}>
            <Icon name="map-marker" size={18} color="#0066CC" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{place.address}</Text>
              <Text style={styles.infoValue}>{place.city}</Text>
            </View>
          </View>

          {/* Hours */}
          <View style={styles.infoItem}>
            <Icon
              name={place.isOpenNow ? 'check-circle' : 'clock'}
              size={18}
              color={place.isOpenNow ? '#4CAF50' : '#FF9800'}
            />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Hours</Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: place.isOpenNow ? '#4CAF50' : '#FF9800',
                    fontWeight: '600',
                  },
                ]}
              >
                {place.isOpenNow ? 'Open' : 'Closed'} • {place.hours}
              </Text>
            </View>
          </View>

          {/* Distance */}
          <View style={styles.infoItem}>
            <Icon name="navigation" size={18} color="#0066CC" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Distance</Text>
              <Text style={styles.infoValue}>
                {place.distance.toFixed(2)} km away
              </Text>
            </View>
          </View>

          {/* Description */}
          {place.description && (
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>About</Text>
              <Text style={styles.description}>{place.description}</Text>
            </View>
          )}
        </View>

        {/* Mini Map */}
        <View style={styles.miniMapSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.miniMap}>
            <View style={styles.mapPlaceholder}>
              <Icon name="map" size={48} color="#ddd" />
              <Text style={styles.mapText}>Map View</Text>
              <Text style={styles.mapCoords}>
                {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
              </Text>
            </View>
          </View>
        </View>

        {/* Community Check-ins */}
        <View style={styles.checkInsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Community ({place.totalCheckIns || 0})
            </Text>
          </View>

          {checkInsLoading ? (
            <Text style={styles.loadingText}>Loading check-ins...</Text>
          ) : checkIns.length === 0 ? (
            <View style={styles.emptyCheckIns}>
              <Icon name="heart-outline" size={48} color="#ddd" />
              <Text style={styles.emptyText}>No check-ins yet</Text>
              <Text style={styles.emptySubText}>Be the first to check in!</Text>
            </View>
          ) : (
            <FlatList
              data={checkIns}
              renderItem={renderCheckInItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.checkInsList}
            />
          )}
        </View>
      </ScrollView>

      {/* Fixed Check-in Button */}
      <View
        style={[
          styles.fixedButtonContainer,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        <TouchableOpacity
          style={styles.checkInButtonLarge}
          onPress={handleCheckIn}
        >
          <Icon name="check" size={20} color="#fff" />
          <Text style={styles.checkInButtonText}>Check In Here</Text>
        </TouchableOpacity>
      </View>

      {/* Check-in Modal */}
      <CheckInModal
        visible={checkInModalVisible}
        onClose={() => setCheckInModalVisible(false)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#f0f0f0',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFB800',
  },
  infoItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  descriptionSection: {
    marginTop: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  miniMapSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#f5f5f5',
  },
  miniMap: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  mapCoords: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  checkInsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  checkInsList: {
    gap: 12,
  },
  checkInCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  checkInHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  timeAgo: {
    fontSize: 12,
    color: '#999',
  },
  emotionBadge: {
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  emotionText: {
    fontSize: 12,
    color: '#FF5252',
    fontWeight: '600',
  },
  checkInContent: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    marginBottom: 8,
  },
  imagesScroll: {
    marginHorizontal: -12,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  checkInImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#ddd',
  },
  checkInActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  emptyCheckIns: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  emptySubText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  fixedButtonContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  checkInButtonLarge: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  checkInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#FF5252',
    textAlign: 'center',
    marginTop: 20,
  },
});
