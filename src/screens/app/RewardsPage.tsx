import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import Icon from '../../components/common/Icon';
import { GET_USER_REWARDS } from '../../graphql/queries';

interface Reward {
  id: string;
  title: string;
  description: string;
  image: string;
  pointsRequired: number;
  category: string;
  partner: string;
  inStock: number;
  likes?: number;
  redeemed?: boolean;
  isLimited?: boolean;
  expiresAt?: string;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface UserRewards {
  currentPoints: number;
  tier: string;
  nextTierPoints?: number;
  totalRedeemed: number;
  rewards: Reward[];
}

type RewardFilter = 'all' | 'food' | 'travel' | 'service' | 'entertainment';
type RewardSort = 'points-asc' | 'points-desc' | 'newest' | 'popular';

export default function RewardsPage() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<RewardFilter>('all');
  const [sortBy, setSortBy] = useState<RewardSort>('points-asc');
  const [refreshing, setRefreshing] = useState(false);

  // Query user rewards
  const { data: rewardsData, loading: rewardsLoading } = useApolloQueryWrapper(
    GET_USER_REWARDS,
    {
      variables: { limit: 50 },
    }
  );

  const userRewards = (rewardsData as any)?.userRewards as UserRewards;
  let rewards = userRewards?.rewards || [];

  // Apply filter
  if (filter !== 'all') {
    rewards = rewards.filter((r) =>
      r.category.toLowerCase().includes(filter)
    );
  }

  // Apply sort
  if (sortBy === 'points-asc') {
    rewards = [...rewards].sort((a, b) => a.pointsRequired - b.pointsRequired);
  } else if (sortBy === 'points-desc') {
    rewards = [...rewards].sort((a, b) => b.pointsRequired - a.pointsRequired);
  } else if (sortBy === 'popular') {
    rewards = [...rewards].sort((a, b) => (b.likes || 0) - (a.likes || 0));
  }

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  const handleSelectReward = (reward: Reward) => {
    navigation.navigate('RewardDetail', { rewardId: reward.id });
  };

  const handleViewHistory = () => {
    navigation.navigate('RedeemHistory');
  };

  const canRedeem = (reward: Reward) => {
    return userRewards && userRewards.currentPoints >= reward.pointsRequired && reward.inStock > 0;
  };

  const getRewardColor = (tier?: string): string => {
    switch (tier) {
      case 'gold':
        return '#FFD700';
      case 'silver':
        return '#C0C0C0';
      case 'platinum':
        return '#E5E4E2';
      default:
        return '#CD7F32'; // bronze
    }
  };

  const renderRewardCard = ({ item }: { item: Reward }) => {
    const redeemable = canRedeem(item);
    const stockAvailable = item.inStock > 0;

    return (
      <TouchableOpacity
        style={[
          styles.rewardCard,
          !redeemable && styles.rewardCardDisabled,
          item.isLimited && styles.rewardCardLimited,
        ]}
        onPress={() => handleSelectReward(item)}
      >
        {/* Image Container */}
        <View style={styles.imageContainer}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.rewardImage} />
          )}

          {/* Stock Badge */}
          {!stockAvailable && (
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>Out of Stock</Text>
            </View>
          )}

          {/* Limited Badge */}
          {item.isLimited && (
            <View style={styles.limitedBadge}>
              <Icon name="flash" size={16} color="#fff" />
              <Text style={styles.limitedText}>Limited</Text>
            </View>
          )}

          {/* Tier Badge */}
          {item.tier && (
            <View style={[styles.tierBadge, { backgroundColor: getRewardColor(item.tier) }]}>
              <Icon name="crown" size={14} color="#fff" />
              <Text style={styles.tierText}>{item.tier.toUpperCase()}</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            {item.likes && (
              <View style={styles.likeBadge}>
                <Icon name="heart" size={14} color="#FF5252" />
                <Text style={styles.likeText}>{item.likes}</Text>
              </View>
            )}
          </View>

          <Text style={styles.partner}>{item.partner}</Text>

          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Points and Stock */}
          <View style={styles.footer}>
            <View style={styles.pointsSection}>
              <Icon name="star" size={16} color="#FFB800" />
              <Text style={styles.pointsText}>{item.pointsRequired}</Text>
            </View>

            <View style={styles.stockSection}>
              <Text style={styles.stockCount}>{item.inStock} in stock</Text>
            </View>

            {redeemable && (
              <View style={styles.redeemBadge}>
                <Icon name="check" size={14} color="#4CAF50" />
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rewards</Text>
        <TouchableOpacity onPress={handleSearch}>
          <Icon name="magnify" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={rewards}
        renderItem={renderRewardCard}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} />
        }
        ListHeaderComponent={
          <>
            {/* Current Points Section */}
            <View style={styles.pointsCard}>
              <View style={styles.pointsCardLeft}>
                <Icon name="trophy" size={48} color="#FFB800" />
              </View>
              <View style={styles.pointsCardMiddle}>
                <Text style={styles.pointsLabel}>Current Points</Text>
                <Text style={styles.pointsValue}>
                  {userRewards?.currentPoints.toLocaleString() || 0}
                </Text>
                {userRewards?.nextTierPoints && (
                  <Text style={styles.nextTier}>
                    {userRewards.nextTierPoints} pts to next tier
                  </Text>
                )}
              </View>
              <View style={styles.pointsCardRight}>
                <View style={styles.tierBadgeSmall}>
                  <Text style={styles.tierLabelSmall}>{userRewards?.tier || 'Bronze'}</Text>
                </View>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleViewHistory}
              >
                <Icon name="history" size={20} color="#0066CC" />
                <Text style={styles.actionText}>History</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="qrcode" size={20} color="#0066CC" />
                <Text style={styles.actionText}>Scan QR</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="information" size={20} color="#0066CC" />
                <Text style={styles.actionText}>How to Earn</Text>
              </TouchableOpacity>
            </View>

            {/* Filter & Sort */}
            <View style={styles.filterSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filterScroll}
              >
                {(['all', 'food', 'travel', 'service', 'entertainment'] as RewardFilter[]).map(
                  (f) => (
                    <TouchableOpacity
                      key={f}
                      style={[
                        styles.filterChip,
                        filter === f && styles.filterChipActive,
                      ]}
                      onPress={() => setFilter(f)}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          filter === f && styles.filterChipTextActive,
                        ]}
                      >
                        {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </ScrollView>

              {/* Sort Menu */}
              <View style={styles.sortContainer}>
                <Icon name="sort" size={18} color="#666" />
              </View>
            </View>

            {/* Rewards Header */}
            <View style={styles.rewardsHeader}>
              <Text style={styles.rewardsTitle}>
                {filter === 'all' ? 'All Rewards' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Rewards`}
              </Text>
              <Text style={styles.rewardsCount}>
                {rewards.length} {rewards.length === 1 ? 'reward' : 'rewards'}
              </Text>
            </View>
          </>
        }
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 100 },
        ]}
        ListEmptyComponent={
          !rewardsLoading ? (
            <View style={styles.emptyState}>
              <Icon name="gift" size={48} color="#ddd" />
              <Text style={styles.emptyTitle}>No rewards available</Text>
              <Text style={styles.emptySubtitle}>
                Try checking back later or change your filter
              </Text>
            </View>
          ) : null
        }
      />

      {/* Loading State */}
      {rewardsLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading rewards...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  pointsCard: {
    margin: 16,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
    elevation: 3,
  },
  pointsCardLeft: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsCardMiddle: {
    flex: 1,
  },
  pointsCardRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFB800',
  },
  nextTier: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  tierBadgeSmall: {
    backgroundColor: '#CD7F32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tierLabelSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 11,
    color: '#0066CC',
    fontWeight: '600',
  },
  filterSection: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  filterChipText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  sortContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
  },
  rewardsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  rewardsCount: {
    fontSize: 12,
    color: '#999',
  },
  listContent: {
    paddingTop: 0,
  },
  rewardCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
    elevation: 2,
  },
  rewardCardDisabled: {
    opacity: 0.6,
  },
  rewardCardLimited: {
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  imageContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  rewardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  stockBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stockText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  limitedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  limitedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tierBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  tierText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  likeBadge: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  likeText: {
    fontSize: 11,
    color: '#FF5252',
    fontWeight: '600',
  },
  partner: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFB800',
  },
  stockSection: {
    flex: 1,
    marginHorizontal: 8,
  },
  stockCount: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  redeemBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
  },
});