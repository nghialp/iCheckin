import React from 'react';
import { Text, FlatList, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useQuery } from '@apollo/client/react';
import ProfileCard from '../../components/common/ProfileCard';
import FriendsFollowingCard from '../../components/common/FriendsFollowingCard';
import PlaceItem from '../../components/common/PlaceItem';
import CheckInFeedItem from '../../components/common/CheckInFeedItem';
import { GET_HOME_DATA } from '../../graphql/queries';
import { GetHomeDataResponse } from '../../graphql/types';
import AppLayout from '../../components/common/AppLayout';
import { Coordinates } from '../../graphql/types/place';
import useLocation from '../../hooks/useLocation';

const screenWidth = Dimensions.get('window').width;

export default function HomePage() {
  const location = useLocation();
  const { data, loading, error } = useQuery<GetHomeDataResponse, Coordinates>(
    GET_HOME_DATA,
    {
      variables: { lat: location?.lat || 10.762622, lng: location?.lng || 106.660172 },
    }
  );
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { nearbyPlaces = [], myCheckins = [] } = data || {};

  const ListHeader = () => (
    <View style={styles.section}>
      <ProfileCard />
      <FriendsFollowingCard />
    </View>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const PlacesSection = () => (
    <>
      <SectionHeader title="Places" />
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.placesScrollContainer}
      >
        {nearbyPlaces.map((place) => (
          <View key={place.mapboxId} style={styles.placeItemWrapper}>
            <PlaceItem place={place} />
          </View>
        ))}
      </ScrollView>
    </>
  );

  const combinedData = [
    { id: 'header', type: 'header' } as any,
    { id: 'places-section', type: 'places-section' } as any,
    { id: 'checkins-title', type: 'checkins-title' } as any,
    ...myCheckins.map(checkin => ({ ...checkin, type: 'checkin' })),
  ];

  const renderItem = ({ item }: any) => {
    if (item.type === 'header') return <ListHeader />;
    if (item.type === 'places-section') return <PlacesSection />;
    if (item.type === 'checkins-title') return <SectionHeader title="Recent Check-Ins" />;
    if (item.type === 'checkin') return <CheckInFeedItem checkin={item} />;
    return null;
  };

  return (
    <AppLayout>
      <FlatList
        data={combinedData}
        keyExtractor={(item: any, index) => `${item.type}-${item.mapboxId || item.id || index}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 12,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  placesScrollContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  placeItemWrapper: {
    width: screenWidth * 0.9,
    marginRight: 12,
  },
});