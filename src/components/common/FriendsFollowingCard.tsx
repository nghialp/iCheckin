import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { GET_MY_FRIENDS, GET_MY_FOLLOWINGS } from '../../graphql/queries';

interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  country?: string;
}

export default function FriendsFollowingCard() {
  const { data: friendsData, loading: friendsLoading } = useQuery<{ myFriends: User[] }>(GET_MY_FRIENDS);
  const { data: followingData, loading: followingLoading } = useQuery<{ myFollowings: User[] }>(GET_MY_FOLLOWINGS);

  const friendsCount = friendsData?.myFriends?.length || 0;
  const followingCount = followingData?.myFollowings?.length || 0;

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{friendsLoading ? '...' : friendsCount}</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{followingLoading ? '...' : followingCount}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    width: 1,
    backgroundColor: '#ddd',
  },
});
