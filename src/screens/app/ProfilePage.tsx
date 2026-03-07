import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import Icon from '../../components/common/Icon';
import { colors, spacing, typography } from '../../theme';
import { containerStyles, cardStyles, buttonStyles } from '../../styles';

interface ProfilePageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
}

const ProfilePage = ({ navigation }: ProfilePageProps) => {
  const { t } = useTranslation();
  const { user, logout, refreshUserData } = useAuth();

  // Optimize data fetching with cache-first strategy
  // This ensures fast navigation by using cached data when available
  useEffect(() => {
    // Optional: Refresh data when screen is focused
    // Only if data is stale (could implement with focus event)
  }, []);

  const handleLogout = () => {
    logout();
    navigation.replace('Login' as any);
  };

  const menuItems = [
    {
      id: 'personal',
      icon: 'account-circle',
      label: t('profile.personalDetails'),
      screen: 'PersonalDetails',
    },
    {
      id: 'notifications',
      icon: 'bell',
      label: t('profile.notifications'),
      screen: 'Notifications',
    },
    {
      id: 'privacy',
      icon: 'eye-check',
      label: t('profile.privacy'),
      screen: 'Privacy',
    },
    {
      id: 'security',
      icon: 'shield-lock',
      label: t('profile.security'),
      screen: 'Security',
    },
    {
      id: 'support',
      icon: 'help-circle',
      label: t('profile.support'),
      screen: 'Support',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Info Header */}
        <View style={styles.headerSection}>
          <TouchableOpacity
            style={styles.avatarContainer}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PersonalDetails' as any)}
          >
            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Icon name="account-circle" size={60} color="#999" />
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.6}
                onPress={() => navigation.navigate(item.screen as any)}
              >
                <Icon name={item.icon} size={24} color="#0066CC" style={styles.menuIcon} />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Icon name="chevron-right" size={24} color="#999" />
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>
            {t('logout')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Container
  container: {
    ...containerStyles.screen,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },

  // Header Section
  headerSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.gray200,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },

  // Menu Section
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  menuIcon: {
    marginRight: spacing.md,
  },
  menuLabel: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 52,
  },

  // Logout Button
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoutButtonDisabled: {
    backgroundColor: colors.gray300,
  },
  logoutButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
});

export default ProfilePage;
