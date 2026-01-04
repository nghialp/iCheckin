import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_REWARD_PAGE } from '../../graphql/queries';
import { REDEEM_REWARD_MUTATION } from '../../graphql/mutations';
import { Query, RedeemRewardResponse, RedeemRewardVariables } from '../../graphql/types/reward';

const screenWidth = Dimensions.get('window').width;

export default function RewardPage() {
  const { data, loading, error } = useQuery<Query>(GET_REWARD_PAGE);
  const [redeemReward] = useMutation<RedeemRewardResponse, RedeemRewardVariables>(REDEEM_REWARD_MUTATION);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { me, rewards } = data || { me: { rewardPoints: 0 }, rewards: [] };

  const handleRedeem = async (rewardId: string) => {
    const res = await redeemReward({ variables: { rewardId } });
    Alert.alert((res?.data?.message) || 'Redeem failed');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Điểm hiện tại */}
      <Text style={styles.points}>🏆 {me.rewardPoints} points</Text>

      {/* PagerView danh sách phần thưởng */}
      <PagerView style={{ flex: 1 }} initialPage={0}>
        {rewards.map((r) => (
          <View key={r.id} style={styles.card}>
            <Image source={{ uri: r.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{r.title}</Text>
            <Text style={styles.partner}>🎁 {r.partner}</Text>
            <Text style={styles.desc}>{r.description}</Text>
            <Text style={styles.require}>
              📦 {r.requiredPoints} points • {r.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: r.inStock ? '#0a84ff' : '#ccc' },
              ]}
              disabled={!r.inStock || me.rewardPoints < r.requiredPoints}
              onPress={() => handleRedeem(r.id)}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>🔘 Redeem</Text>
            </TouchableOpacity>
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  points: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    width: screenWidth - 32,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: '600' },
  partner: { color: '#666', marginBottom: 4 },
  desc: { marginBottom: 8 },
  require: { color: '#333', marginBottom: 12 },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});