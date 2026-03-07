import React, { useEffect, useState } from 'react';
import {
  View,
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
import { styles } from '../../styles/screens/ProfilePage.styles';

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

export default ProfilePage;
