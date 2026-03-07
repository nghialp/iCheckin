/**
 * Theme System - Central export for all design tokens
 * Centralized design system for colors, typography, spacing, shadows, etc.
 */

export { colors, colorAliases } from './colors';
export { typography, fontSizes, fontWeights, lineHeights } from './typography';
export { spacing, padding, margin, gap, responsiveSpacing } from './spacing';
export { shadows, shadowPresets, getShadow } from './shadows';
export { borderRadius, borderRadiusPresets } from './borderRadius';
export { authTheme } from './authTheme';

/**
 * Complete theme object for easy access
 */
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { shadows } from './shadows';
import { borderRadius } from './borderRadius';

export const theme = {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
};

export default theme;

