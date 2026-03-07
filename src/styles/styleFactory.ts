/**
 * Style Factory
 * Helper functions to generate styles dynamically
 */

import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { borderRadius as br } from '../theme/borderRadius';
import { shadowPresets } from '../theme/shadows';
import { typography } from '../theme/typography';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * Generates padding styles
 */
export const createPadding = (
  vertical: number = 0,
  horizontal: number = 0
): ViewStyle => ({
  paddingVertical: vertical,
  paddingHorizontal: horizontal,
});

/**
 * Generates margin styles
 */
export const createMargin = (
  vertical: number = 0,
  horizontal: number = 0
): ViewStyle => ({
  marginVertical: vertical,
  marginHorizontal: horizontal,
});

/**
 * Generates flex layout styles
 */
export const createFlexLayout = (
  direction: 'row' | 'column' = 'column',
  justify: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' = 'flex-start',
  align: 'flex-start' | 'flex-end' | 'center' | 'stretch' = 'center'
): ViewStyle => ({
  flexDirection: direction,
  justifyContent: justify,
  alignItems: align,
});

/**
 * Generates button styles dynamically
 */
export const createButtonStyle = (
  backgroundColor: string = colors.primary,
  borderRadius: number = br.md,
  paddingVertical: number = spacing.md - 2,
  paddingHorizontal: number = spacing.md
): ViewStyle => ({
  paddingVertical,
  paddingHorizontal,
  borderRadius,
  backgroundColor,
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 48,
});

/**
 * Generates text style with responsive font size
 */
export const createTextStyle = (
  fontSize: number = 14,
  fontWeight: '400' | '500' | '600' | '700' = '400',
  color: string = colors.textPrimary,
  lineHeight?: number
): TextStyle => ({
  fontSize,
  fontWeight,
  color,
  lineHeight: lineHeight || fontSize * 1.5,
});

/**
 * Generates input field styles
 */
export const createInputStyle = (
  borderColor: string = colors.border,
  borderRadius: number = br.lg,
  backgroundColor: string = colors.white
): ViewStyle => ({
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor,
  borderRadius,
  borderWidth: 1,
  borderColor,
  paddingHorizontal: spacing.md,
  minHeight: 48,
});

/**
 * Generates card styles with optional shadow
 */
export const createCardStyle = (
  hasShadow: boolean = true,
  backgroundColor: string = colors.white,
  padding: number = spacing.md,
  borderRadius: number = br.lg
): ViewStyle => ({
  backgroundColor,
  borderRadius,
  padding,
  borderWidth: 1,
  borderColor: colors.border,
  ...(hasShadow ? shadowPresets.card : {}),
});

/**
 * Generates gradient placeholder styles (background with opacity)
 */
export const createOverlayStyle = (
  color: string = colors.black,
  opacity: number = 0.5
): ViewStyle => ({
  backgroundColor: color,
  opacity,
});

/**
 * Generates responsive sizing helpers
 */
export const createResponsiveSize = (
  baseSize: number,
  minSize?: number,
  maxSize?: number
): { width?: number; height?: number } => {
  const finalSize = Math.max(minSize || 0, Math.min(baseSize, maxSize || baseSize));
  return {
    width: finalSize,
    height: finalSize,
  };
};

/**
 * Generates shadow combinations
 */
export const createShadow = (
  elevation: 'none' | 'light' | 'medium' | 'heavy' = 'medium'
): ViewStyle => {
  const shadows = {
    none: shadowPresets.none,
    light: shadowPresets.card,
    medium: shadowPresets.cardHover,
    heavy: shadowPresets.modal,
  };
  return shadows[elevation] || shadowPresets.card;
};

/**
 * Generates absolute positioning styles
 */
export const createAbsolutePosition = (
  top?: number,
  right?: number,
  bottom?: number,
  left?: number
): ViewStyle => ({
  position: 'absolute',
  ...(top !== undefined && { top }),
  ...(right !== undefined && { right }),
  ...(bottom !== undefined && { bottom }),
  ...(left !== undefined && { left }),
});

/**
 * Generates full width/height styles
 */
export const createFullSize = (
  width: number | string = '100%',
  height: number | string = '100%'
): ViewStyle => ({
  width: width as any,
  height: height as any,
});

/**
 * Generates border styles
 */
export const createBorder = (
  width: number = 1,
  color: string = colors.border,
  borderRadius: number = 0
): ViewStyle => ({
  borderWidth: width,
  borderColor: color,
  borderRadius,
});

/**
 * Generates color scheme based on status
 */
export const getStatusColor = (
  status: 'success' | 'error' | 'warning' | 'info'
): string => {
  const statusColors = {
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
  };
  return statusColors[status];
};

/**
 * Generates background color with opacity
 */
export const createBackgroundWithOpacity = (
  baseColor: string,
  opacity: number = 0.1
): string => {
  // This is a simple implementation - for production, use a color library
  // to properly convert hex to rgba
  if (baseColor === colors.primary) {
    return 'rgba(0, 102, 204, 0.1)';
  }
  if (baseColor === colors.success) {
    return 'rgba(16, 185, 129, 0.1)';
  }
  if (baseColor === colors.error) {
    return 'rgba(239, 68, 68, 0.1)';
  }
  if (baseColor === colors.warning) {
    return 'rgba(245, 158, 11, 0.1)';
  }
  return baseColor;
};

/**
 * Creates a batch of commonly used styles
 */
export const createScreenStyles = (
  customStyles?: NamedStyles<any>
) => {
  return StyleSheet.create({
    // Base screen
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    
    // Content container with padding
    content: {
      flex: 1,
      padding: spacing.md,
    },

    // Centered container
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    // Header
    header: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.white,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    // Footer
    footer: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      backgroundColor: colors.white,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },

    ...customStyles,
  });
};

export default {
  createPadding,
  createMargin,
  createFlexLayout,
  createButtonStyle,
  createTextStyle,
  createInputStyle,
  createCardStyle,
  createOverlayStyle,
  createResponsiveSize,
  createShadow,
  createAbsolutePosition,
  createFullSize,
  createBorder,
  getStatusColor,
  createBackgroundWithOpacity,
  createScreenStyles,
};
