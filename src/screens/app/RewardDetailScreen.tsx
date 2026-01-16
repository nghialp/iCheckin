import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery as useApolloQuery, useMutation } from '@apollo/client/react';
import Icon from '../../components/common/Icon';
import { GET_REWARD_DETAIL } from '../../graphql/queries';
import { REDEEM_REWARD_MUTATION } from '../../graphql/mutations';

interface RewardDetail {
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
  tier?: string;
  qrCode?: string;
  redeemCode?: string;
  partnerContact?: string;
  validUntil?: string;
}

interface UserPoints {
  currentPoints: number;
}

export default function RewardDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const insets = useSafeAreaInsets();
  const [isRedeeming, setIsRedeeming] = useState(false);

  const rewardId = route.params?.rewardId;

  // Query reward detail
  const { data: rewardData, loading: rewardLoading } = useApolloQuery(GET_REWARD_DETAIL, {
    variables: { id: rewardId },
    skip: !rewardId,
  });

  // Redeem mutation
  const [redeemReward] = useMutation(REDEEM_REWARD_MUTATION);

  const reward = (rewardData as any)?.reward as RewardDetail;
  const userPoints = (rewardData as any)?.userRewards?.currentPoints || 0;

  const canRedeem = userPoints >= (reward?.pointsRequired || 0) && reward?.inStock > 0;

  const handleRedeem = async () => {
    if (!canRedeem) {
      if (userPoints < (reward?.pointsRequired || 0)) {
        Alert.alert(
          'Not Enough Points',
          `You need ${(reward?.pointsRequired || 0) - userPoints} more points to redeem this reward.`
        );
      } else {
        Alert.alert('Out of Stock', 'This reward is no longer available.');
      }
      return;
    }

    setIsRedeeming(true);
    try {
      const result = await redeemReward({
        variables: { rewardId },
      });

      if ((result.data as any)?.redeemReward?.success) {
        Alert.alert(
          'Success!',
          'Reward redeemed successfully! Check your history for QR code.',
          [
            {
              text: 'View QR Code',
              onPress: () => navigation.navigate('RedeemHistory'),
            },
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', (result.data as any)?.redeemReward?.message || 'Failed to redeem reward');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsRedeeming(false);
    }
  };

  if (rewardLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading reward details...</Text>
      </SafeAreaView>
    );
  }

  if (!reward) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Reward not found</Text>
      </SafeAreaView>
    );
  }

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
        <Text style={styles.headerTitle}>Reward Details</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Hero Image */}
        <View style={styles.imageSection}>
          <Image source={{ uri: reward.image }} style={styles.heroImage} />

          {/* Stock Badge */}
          {reward.inStock === 0 && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}

          {/* Limited Badge */}
          {reward.isLimited && (
            <View style={styles.limitedBadge}>
              <Icon name="flash" size={16} color="#fff" />
              <Text style={styles.limitedText}>Limited Time</Text>
            </View>
          )}

          {/* Tier Badge */}
          {reward.tier && (
            <View style={styles.tierBadge}>
              <Icon name="crown" size={14} color="#fff" />
              <Text style={styles.tierText}>{reward.tier.toUpperCase()}</Text>
            </View>
          )}
        </View>

        {/* Basic Info */}
        <View style={styles.basicInfo}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{reward.title}</Text>
            {reward.likes && (
              <View style={styles.likeBadge}>
                <Icon name="heart" size={16} color="#FF5252" />
                <Text style={styles.likeCount}>{reward.likes}</Text>
              </View>
            )}
          </View>

          <Text style={styles.partner}>{reward.partner}</Text>

          {/* Points & Stock Info */}
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Icon name="star" size={20} color="#FFB800" />
              <Text style={styles.infoLabel}>Points Required</Text>
              <Text style={styles.infoValue}>{reward.pointsRequired}</Text>
            </View>

            <View style={styles.infoItem}>
              <Icon name="package" size={20} color="#4CAF50" />
              <Text style={styles.infoLabel}>In Stock</Text>
              <Text style={styles.infoValue}>{reward.inStock}</Text>
            </View>

            {reward.expiresAt && (
              <View style={styles.infoItem}>
                <Icon name="calendar" size={20} color="#FF9800" />
                <Text style={styles.infoLabel}>Expires</Text>
                <Text style={styles.infoValue}>{reward.expiresAt}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{reward.description}</Text>
        </View>

        {/* How to Use */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Use</Text>
          <View style={styles.steps}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Tap "Redeem Reward" button below</Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Get QR code in your redemption history</Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Show QR code at {reward.partner}</Text>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>Enjoy your reward!</Text>
            </View>
          </View>
        </View>

        {/* Partner Info */}
        {reward.partnerContact && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Partner Contact</Text>
            <View style={styles.contactBox}>
              <Icon name="phone" size={20} color="#0066CC" />
              <Text style={styles.contactText}>{reward.partnerContact}</Text>
            </View>
          </View>
        )}

        {/* Valid Until */}
        {reward.validUntil && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Validity</Text>
            <View style={styles.validityBox}>
              <Icon name="calendar-check" size={20} color="#4CAF50" />
              <Text style={styles.validityText}>Valid until {reward.validUntil}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Fixed Redeem Button */}
      <View
        style={[
          styles.fixedButtonContainer,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}
      >
        {!canRedeem && (
          <View style={styles.reasonBox}>
            {reward.inStock === 0 ? (
              <>
                <Icon name="alert-circle" size={16} color="#FF5252" />
                <Text style={styles.reasonText}>Out of stock</Text>
              </>
            ) : (
              <>
                <Icon name="alert-circle" size={16} color="#FF9800" />
                <Text style={styles.reasonText}>
                  Need {(reward.pointsRequired || 0) - userPoints} more points
                </Text>
              </>
            )}
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.redeemButton,
            !canRedeem && styles.redeemButtonDisabled,
          ]}
          onPress={handleRedeem}
          disabled={!canRedeem || isRedeeming}
        >
          <Icon name="gift" size={20} color="#fff" />
          <Text style={styles.redeemButtonText}>
            {isRedeeming ? 'Redeeming...' : 'Redeem Reward'}
          </Text>
        </TouchableOpacity>

        {canRedeem && (
          <Text style={styles.pointsInfo}>You have {userPoints} points</Text>
        )}
      </View>
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
  content: {
    flex: 1,
  },
  imageSection: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    position: 'relative',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outOfStockText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  limitedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  limitedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tierBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  tierText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  basicInfo: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 0,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  likeBadge: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    backgroundColor: '#FFE8E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  likeCount: {
    fontSize: 12,
    color: '#FF5252',
    fontWeight: '600',
  },
  partner: {
    fontSize: 14,
    color: '#0066CC',
    fontWeight: '600',
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 2,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  steps: {
    gap: 12,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    paddingTop: 6,
  },
  contactBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  validityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
  },
  validityText: {
    flex: 1,
    fontSize: 13,
    color: '#2E7D32',
    fontWeight: '500',
  },
  fixedButtonContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  reasonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  reasonText: {
    fontSize: 12,
    color: '#E65100',
    fontWeight: '500',
  },
  redeemButton: {
    backgroundColor: '#0066CC',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  redeemButtonDisabled: {
    backgroundColor: '#ccc',
  },
  redeemButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  pointsInfo: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 14,
    color: '#FF5252',
    textAlign: 'center',
    marginTop: 20,
  },
});
