import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import Icon from '../../components/common/Icon';
import { GET_USER_REWARDS } from '../../graphql/queries';
import { styles } from '../../styles/screens/RewardsPage.styles';

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

const RewardsPage = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
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
              <Text style={styles.stockText}>{t('rewardsPage.outOfStock')}</Text>
            </View>
          )}

          {/* Limited Badge */}
          {item.isLimited && (
            <View style={styles.limitedBadge}>
              <Icon name="flash" size={16} color="#fff" />
              <Text style={styles.limitedText}>{t('rewardsPage.limited')}</Text>
            </View>
          )}

          {/* Tier Badge */}
          {item.tier && (
            <View style={[styles.tierBadge, { backgroundColor: getRewardColor(item.tier) }]}>
              <Icon name="crown" size={14} color="#fff" />
              <Text style={styles.tierText}>{t(`rewardsPage.tier.${item.tier}`)}</Text>
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
              <Text style={styles.stockCount}>{t('rewardsPage.inStock', { count: item.inStock })}</Text>
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
        <Text style={styles.headerTitle}>{t('rewardsPage.title')}</Text>
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
                <Text style={styles.pointsLabel}>{t('rewardsPage.currentPoints')}</Text>
                <Text style={styles.pointsValue}>
                  {userRewards?.currentPoints.toLocaleString() || 0}
                </Text>
                {userRewards?.nextTierPoints && (
                  <Text style={styles.nextTier}>
                    {t('rewardsPage.pointsToNextTier', { points: userRewards.nextTierPoints })}
                  </Text>
                )}
              </View>
              <View style={styles.pointsCardRight}>
                <View style={styles.tierBadgeSmall}>
                  <Text style={styles.tierLabelSmall}>{t(`rewardsPage.tier.${(userRewards?.tier || 'bronze').toLowerCase()}`)}</Text>
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
                <Text style={styles.actionText}>{t('rewardsPage.history')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="qrcode" size={20} color="#0066CC" />
                <Text style={styles.actionText}>{t('rewardsPage.scanQR')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Icon name="information" size={20} color="#0066CC" />
                <Text style={styles.actionText}>{t('rewardsPage.howToEarn')}</Text>
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
                        {t(`rewardsPage.filter.${f}`)}
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
                {filter === 'all' ? t('rewardsPage.allRewards') : t(`rewardsPage.${filter}Rewards`)}
              </Text>
              <Text style={styles.rewardsCount}>
                {rewards.length} {t(rewards.length === 1 ? 'rewardsPage.reward' : 'rewardsPage.rewards')}
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
              <Text style={styles.emptyTitle}>{t('rewardsPage.noRewards')}</Text>
              <Text style={styles.emptySubtitle}>
                {t('rewardsPage.tryLater')}
              </Text>
            </View>
          ) : null
        }
      />

      {/* Loading State */}
      {rewardsLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default RewardsPage;
