import React from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { useQuery } from '@apollo/client/react';
import ProfileCard from '../../components/common/ProfileCard';
import PlaceItem from '../../components/common/PlaceItem';
import CheckInFeedItem from '../../components/common/CheckInFeedItem';
import { GET_HOME_DATA } from '../../graphql/queries';
import { GetHomeDataResponse } from '../../graphql/types';
import AppLayout from '../../components/common/AppLayout';
import { Coordinates } from '../../graphql/types/place';
import useLocation from '../../hooks/useLocation';

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

  return (
    <AppLayout>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <ProfileCard />

        <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 8 }}>📍 Places Nearby</Text>
        <FlatList
          data={nearbyPlaces}
          keyExtractor={(item) => item.googlePlaceId}
          renderItem={({ item }) => <PlaceItem place={item} />}
          showsVerticalScrollIndicator={false}
        />

        <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 8 }}>📝 Recent Check-Ins</Text>
        <FlatList
          data={myCheckins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CheckInFeedItem checkin={item} />}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </AppLayout>
  );
}