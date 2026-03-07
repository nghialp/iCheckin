/**
 * Shadows System
 * Cross-platform shadows for iOS and Android
 */

export const shadows = {
  // Elevation Level 1 (subtle)
  elevation1: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: 1,
    },
  },

  // Elevation Level 2 (light)
  elevation2: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  },

  // Elevation Level 3 (medium)
  elevation3: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  },

  // Elevation Level 4 (prominent)
  elevation4: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
  },

  // Elevation Level 5 (maximum)
  elevation5: {
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.15,
      shadowRadius: 24,
    },
    android: {
      elevation: 16,
    },
  },
};

/**
 * Helper function to get shadow style for current platform
 */
import { Platform } from 'react-native';

export const getShadow = (level: keyof typeof shadows) => {
  const shadow = shadows[level];
  return Platform.select({
    ios: shadow.ios as any,
    android: shadow.android as any,
    default: shadow.ios as any,
  });
};

/**
 * Preset shadow combinations
 */
export const shadowPresets = {
  // Card shadows
  card: getShadow('elevation2'),
  cardHover: getShadow('elevation3'),

  // Modal/Overlay shadows
  modal: getShadow('elevation4'),

  // Button shadows
  button: getShadow('elevation1'),
  buttonHover: getShadow('elevation2'),

  // Floating Action Button
  fab: getShadow('elevation3'),
  fabHover: getShadow('elevation4'),

  // None (no shadow)
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
};

export default shadows;
