import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomePage from '../screens/app/HomePage';
import CheckInScreen from '../screens/app/CheckInScreen';
import ProfilePage from '../screens/app/ProfilePage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/router';
import Icon from '../components/common/Icon';
import RewardsPage from '../screens/app/RewardsPage';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator();

// Custom tab icon component
const TabIcon = ({ icon, focused }: { icon: string; focused: boolean }) => (
  <View style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
    <Icon 
      name={icon} 
      size={24} 
      color={focused ? '#0066CC' : '#666'}
    />
  </View>
);

export default function TabNavigator() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 100,
          paddingBottom: Math.max(insets.bottom, 24),
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomePage}
        options={{
          title: t('home'),
          tabBarIcon: ({ focused }) => <TabIcon icon="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={CheckInScreen}
        options={{
          title: t('map'),
          tabBarIcon: ({ focused }) => <TabIcon icon="map" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="RewardTab"
        component={RewardsPage}
        options={{
          title: t('rewards.title'),
          tabBarIcon: ({ focused }) => <TabIcon icon="star" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfilePage}
        options={{
          title: t('profile.title'),
          tabBarIcon: ({ focused }) => <TabIcon icon="account" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

