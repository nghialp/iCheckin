import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Share,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApolloQueryWrapper } from '../../hooks/useApolloQueryWrapper';
import { styles } from '../../styles/screens/RedeemHistoryScreen.styles';
import { t } from 'i18next';
import Icon from '../../components/common/Icon';
import { GET_REDEEM_HISTORY } from '../../graphql/queries';

interface RedemptionItem {
  id: string;
  reward: {
    id: string;
    title: string;
    image: string;
    pointsRequired: number;
  };
  redeemedAt: string;
  status: 'active' | 'expired' | 'used';
  qrCode: string;
  expiresAt: string;
  usedAt?: string;
}

type HistoryFilter = 'all' | 'active' | 'expired' | 'used';

const RedeemHistoryScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<HistoryFilter>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Query redeem history
  const { data: historyData, loading: historyLoading } = useApolloQueryWrapper(
    GET_REDEEM_HISTORY,
    {
      variables: { limit: 50, offset: 0 },
    }
  );

  let history = (historyData as any)?.redeemHistory || [];

  // Apply filter
  if (filter !== 'all') {
    history = history.filter((item: RedemptionItem) => item.status === filter);
  }

  const handleShare = async (item: RedemptionItem) => {
    try {
      await Share.share({
        message: `Check out the ${item.reward.title} reward I just redeemed from iCheckin!`,
        title: 'Shared Redemption',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'used':
        return '#999';
      case 'expired':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: string): string => {
    switch (status) {
      case 'active':
        return 'check-circle';
      case 'used':
        return 'check-all';
      case 'expired':
        return 'alert-circle';
      default:
        return 'help-circle';
    }
  };

  const renderHistoryItem = ({ item }: { item: RedemptionItem }) => (
    <View style={styles.historyCard}>
      {/* Reward Image */}
      <Image source={{ uri: item.reward.image }} style={styles.rewardImage} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.rewardTitle} numberOfLines={2}>
            {item.reward.title}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) + '20' },
            ]}
          >
            <Icon
              name={getStatusIcon(item.status)}
              size={14}
              color={getStatusColor(item.status)}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Dates */}
        <View style={styles.datesSection}>
          <View style={styles.dateItem}>
            <Icon name="calendar" size={14} color="#999" />
            <Text style={styles.dateLabel}>{t('redeemHistory.redeemed')}</Text>
            <Text style={styles.dateValue}>{item.redeemedAt}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.dateItem}>
            <Icon name="calendar-check" size={14} color="#999" />
            <Text style={styles.dateLabel}>{t('redeemHistory.expires')}</Text>
            <Text style={styles.dateValue}>{item.expiresAt}</Text>
          </View>
        </View>

        {item.usedAt && (
          <Text style={styles.usedText}>
            {t('rewardDetail.usedOn', { date: item.usedAt })}
          </Text>
        )}
      </View>

      {/* QR Code Button */}
      <TouchableOpacity style={styles.qrButton}>
        <Icon name="qrcode" size={24} color="#0066CC" />
      </TouchableOpacity>
    </View>
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
        <Text style={styles.headerTitle}>{t('redeemHistory.title')}</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} />
        }
        ListHeaderComponent={
          <>
            {/* Filter Tabs */}
            <View style={styles.filterTabs}>
              {(['all', 'active', 'expired', 'used'] as HistoryFilter[]).map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[
                    styles.filterTab,
                    filter === f && styles.filterTabActive,
                  ]}
                  onPress={() => setFilter(f)}
                >
                  <Text
                    style={[
                      styles.filterTabText,
                      filter === f && styles.filterTabTextActive,
                    ]}
                  >
                    {f === 'all' ? t('redeemHistory.all') : t(`redeemHistory.${f}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Count */}
            <Text style={styles.countText}>
              {history.length} {history.length === 1 ? t('redeemHistory.reward_one') : t('redeemHistory.reward_other')}
            </Text>
          </>
        }
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        ListEmptyComponent={
          !historyLoading ? (
            <View style={styles.emptyState}>
              <Icon name="gift-outline" size={48} color="#ddd" />
              <Text style={styles.emptyTitle}>{t('redeemHistory.noRedemptions')}</Text>
              <Text style={styles.emptySubtitle}>
                {t('redeemHistory.startEarning')}
              </Text>
            </View>
          ) : null
        }
      />

      {/* Loading State */}
      {historyLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>{t('redeemHistory.loading')}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default RedeemHistoryScreen;
