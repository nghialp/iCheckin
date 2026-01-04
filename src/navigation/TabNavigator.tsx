import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ViewStyle } from 'react-native';
import HomePage from '../screens/app/HomePage';
import LocationDetailPage from '../screens/app/LocationDetailPage';
import RewardsPage from '../screens/app/RewardsPage';
import ProfilePage from '../screens/app/ProfilePage';
import SettingsPage from '../screens/app/SettingsPage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/router';
import Icon from '../components/common/Icon';

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
  const navigation = useNavigation<NavigationProp>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
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
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon icon="home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={LocationDetailPage}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabIcon icon="magnify" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="RewardsTab"
        component={RewardsPage}
        options={{
          title: 'Rewards',
          tabBarIcon: ({ focused }) => <TabIcon icon="gift" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfilePage}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon icon="account" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsPage}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabIcon icon="cog" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

