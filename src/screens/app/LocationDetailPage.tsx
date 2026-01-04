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
  StyleSheet,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_PLACE_DETAIL } from '../../graphql/queries';
import { CHECK_IN_PLACE_MUTATION } from '../../graphql/mutations';
import { CheckInPlaceResponse, Place, Review } from '../../graphql/types';
// import { CheckInPlaceResponse, Place, Review } from '../utils/types';

const screenWidth = Dimensions.get('window').width;

export default function LocationDetailPage({ place_id }: { place_id?: string }) {
  const { t } = useTranslation();

  const { data, loading, error } = useQuery<any>(GET_PLACE_DETAIL, {
    variables: { id: place_id || '' },
  });
  const [checkIn] = useMutation<CheckInPlaceResponse>(CHECK_IN_PLACE_MUTATION);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  if (loading) return <Text>{t('loading')}</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!data) return null;

  const place: Place = data?.place || {};
  const reviews: Review[] = data?.placeCheckins || [];

  const handleCheckIn = async () => {
    try {
      const res = await checkIn({ variables: { placeId: place.id } });
      if (res.data?.success) {
        Alert.alert(t('checkInSuccess'), res.data.message);
      }
    } catch (err) {
      Alert.alert(t('checkInFailed'), t('checkInFailedMessage'));
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Tiêu đề */}
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.subtitle}>
        {place.category} • {place.type}
      </Text>
      <Text style={styles.opening}>
        {t('openHours', {
          open: place?.openingHours?.[0]?.open,
          close: place?.openingHours?.[0]?.close,
        })}
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
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: place.lat,
            longitude: place.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: place.lat,
              longitude: place.lng,
            }}
            title={place.name}
          />
        </MapView>
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

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#666', marginBottom: 4 },
  opening: { color: '#0a0', marginBottom: 8 },
  placePhoto: {
    width: screenWidth * 0.7,
    height: 160,
    borderRadius: 10,
    marginRight: 12,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  checkInButton: {
    backgroundColor: '#0a84ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  checkInText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  reviewCard: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  userName: { fontWeight: '600' },
  timestamp: { color: '#999' },
  caption: { marginBottom: 6 },
  reviewPhoto: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 6,
  },
  feelings: { fontSize: 18, marginBottom: 4 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  closeButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#0a84ff',
    borderRadius: 8,
  },
});