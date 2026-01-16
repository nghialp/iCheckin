import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks/useAuth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../utils/router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProfilePageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
}

export default function ProfilePage({ navigation }: ProfilePageProps) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      t('profile.confirmLogout'),
      t('profile.logoutMessage'),
      [
        {
          text: t('profile.cancel'),
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: t('profile.logout'),
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await logout();
            } catch (error) {
              Alert.alert(t('profile.error'), t('profile.logoutError'));
              setIsLoggingOut(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
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
      icon: 'shield-eye',
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
          style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
          onPress={handleLogout}
          disabled={isLoggingOut}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>
            {isLoggingOut ? t('profile.loggingOut') : t('profile.logout')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 52,
  },
  logoutButton: {
    backgroundColor: '#FF4444',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutButtonDisabled: {
    backgroundColor: '#CCC',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});