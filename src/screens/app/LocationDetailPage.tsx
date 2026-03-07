import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { useTranslation } from 'react-i18next';
import { styles } from './LocationDetailPage.styles';
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import { useApolloMutationWrapper } from '../../hooks/useApolloMutationWrapper';
import { GET_PLACE_DETAIL } from '../../graphql/queries';
import { CHECK_IN_PLACE_MUTATION } from '../../graphql/mutations';
import { Place } from '../../graphql/interfaces/entities/place.interface';

const screenWidth = Dimensions.get('window').width;

// GraphQL Response types
interface PlaceDetailResponse {
  place: Place;
  placeCheckins: Review[];
}

interface CheckInPlaceResponse {
  success: boolean;
  message: string;
}

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Review {
  id: string;
  caption: string;
  photos: string[];
  feelings: string[];
  likes: number;
  comments: Comment[];
  user: User;
  createdAt: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

const LocationDetailPage = ({ place_id }: { place_id?: string }) => {
  const { t } = useTranslation();

  const { data, loading, error } = useApolloQueryWrapper<PlaceDetailResponse>(
    GET_PLACE_DETAIL,
    {
      variables: { id: place_id || '' },
    }
  );
  const { mutate: checkIn } = useApolloMutationWrapper<CheckInPlaceResponse>(
    CHECK_IN_PLACE_MUTATION
  );
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  if (loading) return <Text>{t('loading')}</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return null;

  const place: Place = data?.place || {};
  const reviews: Review[] = data?.placeCheckins || [];

  const handleCheckIn = async () => {
    try {
      const res = await checkIn({ placeId: place.id });
      if (res.data?.success) {
        Alert.alert(t('checkInSuccess'), res.data.message);
      }
    } catch (err: any) {
      Alert.alert(t('checkInFailed'), t('checkInFailedMessage'));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Tiêu đề */}
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.subtitle}>
        {place.category} • {place.types}
      </Text>

      {/* Ảnh địa điểm */}
      <FlatList
        data={place.photos}
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 12 }}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.placePhoto} />
        )}
      />

      {/* Bản đồ */}
      <View style={styles.mapContainer}>
        <MapboxGL.MapView style={{ flex: 1 }} styleURL={MapboxGL.StyleURL.Street}>
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={[place.lng, place.lat]}
            animationMode="flyTo"
            animationDuration={1500}
          />
          <MapboxGL.ShapeSource id="point-source" shape={{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [place.lng, place.lat],
            },
            properties: {
              title: place.name,
            },
          }}>
            <MapboxGL.CircleLayer
              id="point-layer"
              style={{
                circleRadius: 8,
                circleColor: '#0a84ff',
                circleOpacity: 0.8,
              }}
            />
          </MapboxGL.ShapeSource>
          <MapboxGL.MarkerView coordinate={[place.lng, place.lat]}>
            <View style={styles.mapMarker}>
              <Text style={styles.mapMarkerText}>📍</Text>
            </View>
          </MapboxGL.MarkerView>
        </MapboxGL.MapView>
      </View>

      {/* Nút Check-In */}
      <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn}>
        <Text style={styles.checkInText}>{t('checkIn')}</Text>
      </TouchableOpacity>

      {/* Đánh giá người dùng */}
      <Text style={styles.sectionTitle}>{t('userReviews')}</Text>
      {reviews.map((r) => (
        <View key={r.id} style={styles.reviewCard}>
          <View style={styles.userRow}>
            <Image source={{ uri: r.user.avatarUrl }} style={styles.avatar} />
            <View>
              <Text style={styles.userName}>{r.user.name}</Text>
              <Text style={styles.timestamp}>
                {new Date(r.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>

          <Text style={styles.caption}>{r.caption}</Text>

          {r.photos?.length ? (
            <Image source={{ uri: r.photos[0] }} style={styles.reviewPhoto} />
          ) : null}

          {r.feelings?.length ? (
            <Text style={styles.feelings}>{r.feelings.join(' ')}</Text>
          ) : null}

          <View style={styles.actionRow}>
            <Text>👍 {r.likes}</Text>
            <TouchableOpacity onPress={() => setSelectedReview(r)}>
              <Text>💬 {r.comments?.length || 0}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal bình luận */}
      <Modal
        visible={!!selectedReview}
        animationType="slide"
        onRequestClose={() => setSelectedReview(null)}
      >
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.sectionTitle}>{t('comments')}</Text>
          {selectedReview?.comments?.map((c) => (
            <View key={c.id} style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: '600' }}>{c.user.name}</Text>
              <Text>{c.content}</Text>
              <Text style={{ color: '#999' }}>
                {new Date(c.createdAt).toLocaleString()}
              </Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedReview(null)}
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              {t('close')}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default LocationDetailPage;

