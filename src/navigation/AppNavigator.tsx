// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { ActivityIndicator, View } from 'react-native';
import AuthStack from './AuthStack';
import useAuth from '../hooks/useAuth';
import LocationDetailPage from '../screens/app/LocationDetailPage';
import { RootStackParamList } from '../utils/router';
import SettingsPage from '../screens/app/SettingsPage';
import ChangePasswordPage from '../screens/auth/ChangePasswordPage';
import MapPage from '../screens/app/MapPage';
import CheckInPage from '../screens/app/CheckInPage';
import SearchScreen from '../screens/app/SearchScreen';
import CheckInDetailScreen from '../screens/app/CheckInDetailScreen';
import RewardDetailScreen from '../screens/app/RewardDetailScreen';
import RedeemHistoryScreen from '../screens/app/RedeemHistoryScreen';
import PersonalDetailsScreen from '../screens/app/PersonalDetailsScreen';
import NotificationsScreen from '../screens/app/NotificationsScreen';
import PrivacyScreen from '../screens/app/PrivacyScreen';
import SecurityScreen from '../screens/app/SecurityScreen';
import SupportScreen from '../screens/app/SupportScreen';
import GeneralSettingsScreen from '../screens/app/GeneralSettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={TabNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="LocationDetail" 
            component={LocationDetailPage} 
            options={{ title: 'Location Detail' }}
          />
          <Stack.Screen 
            name="Setting" 
            component={SettingsPage} 
            options={{ title: 'Settings' }}
          />
          <Stack.Screen 
            name="Map" 
            component={MapPage} 
            options={{ title: 'Map' }}
          />
          <Stack.Screen 
            name="Search" 
            component={SearchScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="CheckInDetail" 
            component={CheckInDetailScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="RewardDetail" 
            component={RewardDetailScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="RedeemHistory" 
            component={RedeemHistoryScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PersonalDetails" 
            component={PersonalDetailsScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Notifications" 
            component={NotificationsScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Privacy" 
            component={PrivacyScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Security" 
            component={SecurityScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Support" 
            component={SupportScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="GeneralSettings" 
            component={GeneralSettingsScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Rewards" 
            component={TabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Profile" 
            component={TabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ChangePassword" 
            component={ChangePasswordPage} 
            options={{ title: 'Change Password' }}
          />
          <Stack.Screen 
            name="CheckIn" 
            component={CheckInPage} 
            options={{ title: 'Check In' }}
          />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
