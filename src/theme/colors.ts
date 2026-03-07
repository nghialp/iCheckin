/**
 * Color System
 * Centralized color definitions for the entire app
 */

export const colors = {
  // Primary Colors
  primary: '#0066CC',        // Main brand color (blue)
  primaryLight: '#E6F0FF',   // Light variant
  primaryDark: '#0052A3',    // Dark variant

  // Secondary Colors
  secondary: '#10B981',      // Green (success)
  secondaryLight: '#ECFDF5',
  secondaryDark: '#059669',

  // Neutral Colors
  black: '#000000',
  white: '#FFFFFF',
  gray900: '#111827',        // Almost black
  gray800: '#1F2937',
  gray700: '#374151',
  gray600: '#4B5563',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray300: '#D1D5DB',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',

  // Semantic Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  // Background Variations
  background: '#F5F5F5',     // Default app background
  surface: '#FFFFFF',        // Cards, elevated surfaces
  surfaceVariant: '#F9FAFB', // Subtle surface alternative

  // Text Colors
  textPrimary: '#111827',    // Main text (gray900)
  textSecondary: '#6B7280',  // Secondary text (gray500)
  textTertiary: '#9CA3AF',   // Disabled, hint text (gray400)
  textInverse: '#FFFFFF',    // Text on dark backgrounds

  // Border Colors
  border: '#E5E7EB',         // Default border (gray200)
  borderLight: '#F3F4F6',    // Light border (gray100)
  divider: '#D1D5DB',        // Divider line (gray300)

  // Status Colors
  success20: '#ECFDF5',      // Light success background
  error20: '#FEE2E2',        // Light error background
  warning20: '#FFFBEB',      // Light warning background
  info20: '#EFF6FF',         // Light info background

  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  overlayHeavy: 'rgba(0, 0, 0, 0.8)',

  // Transparent
  transparent: 'transparent',
};

/**
 * Color aliases for easier usage
 */
export const colorAliases = {
  // Navigation
  tabBarBackground: colors.white,
  tabBarActive: colors.primary,
  tabBarInactive: colors.gray400,

  // Buttons
  buttonPrimary: colors.primary,
  buttonPrimaryHover: colors.primaryDark,
  buttonSecondary: colors.gray200,
  buttonSecondaryText: colors.textPrimary,
  buttonDisabled: colors.gray300,
  buttonDisabledText: colors.textTertiary,

  // Input
  inputBackground: colors.white,
  inputBorder: colors.border,
  inputBorderFocus: colors.primary,
  inputText: colors.textPrimary,
  inputPlaceholder: colors.textTertiary,

  // Card
  cardBackground: colors.white,
  cardBorder: colors.border,

  // Header
  headerBackground: colors.white,
  headerBorder: colors.gray100,
  headerText: colors.textPrimary,

  // Status
  statusSuccess: colors.success,
  statusError: colors.error,
  statusWarning: colors.warning,
  statusInfo: colors.info,
};

export default colors;
