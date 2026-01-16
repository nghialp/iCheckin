import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Share,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery as useApolloQuery } from '@apollo/client/react';
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

export default function RedeemHistoryScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<HistoryFilter>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Query redeem history
  const { data: historyData, loading: historyLoading, refetch } = useApolloQuery(
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

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

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
            <Text style={styles.dateLabel}>Redeemed</Text>
            <Text style={styles.dateValue}>{item.redeemedAt}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.dateItem}>
            <Icon name="calendar-check" size={14} color="#999" />
            <Text style={styles.dateLabel}>Expires</Text>
            <Text style={styles.dateValue}>{item.expiresAt}</Text>
          </View>
        </View>

        {item.usedAt && (
          <Text style={styles.usedText}>
            Used on {item.usedAt}
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
        <Text style={styles.headerTitle}>Redemption History</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
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
                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Count */}
            <Text style={styles.countText}>
              {history.length} {history.length === 1 ? 'reward' : 'rewards'}
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
              <Text style={styles.emptyTitle}>No redemptions yet</Text>
              <Text style={styles.emptySubtitle}>
                Start earning points and redeem rewards!
              </Text>
            </View>
          ) : null
        }
      />

      {/* Loading State */}
      {historyLoading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading history...</Text>
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
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
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterTabActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  filterTabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: '#fff',
  },
  countText: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3.84,
    elevation: 2,
  },
  rewardImage: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f0f0',
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
    marginBottom: 8,
  },
  rewardTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  datesSection: {
    flexDirection: 'row',
    gap: 8,
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  dateValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    marginTop: 1,
  },
  divider: {
    width: 1,
    backgroundColor: '#f0f0f0',
  },
  usedText: {
    fontSize: 10,
    color: '#999',
    marginTop: 6,
    fontStyle: 'italic',
  },
  qrButton: {
    width: 44,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 1,
    borderLeftColor: '#f0f0f0',
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
