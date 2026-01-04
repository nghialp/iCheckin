import React from 'react';
import { ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export default function Icon({ name, size = 24, color = '#666', style }: IconProps) {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
}

