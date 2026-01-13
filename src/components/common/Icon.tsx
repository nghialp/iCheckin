import React from 'react';
import { ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

// Icons available in MaterialCommunityIcons
const COMMUNITY_ICONS = new Set([
  'magnify', 'account', 'cog', 'home', 'heart', 'star', 'bell', 'calendar',
  'chat', 'email', 'phone', 'location', 'map', 'plus', 'minus', 'close',
  'check', 'alert', 'information', 'help', 'settings', 'logout', 'login',
  'user', 'users', 'edit', 'delete', 'download', 'upload', 'share', 'camera',
  'image', 'video', 'music', 'folder', 'file', 'lock', 'unlock', 'wifi',
  'bluetooth', 'battery', 'cloud', 'sun', 'moon', 'star-outline', 'heart-outline', 
]);

export default function Icon({ name, size = 24, color = '#666', style }: IconProps) {
  if (COMMUNITY_ICONS.has(name)) {
    return (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        style={style}
      />
    );
  }

  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
}

