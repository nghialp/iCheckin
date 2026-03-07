/**
 * Spacing System
 * 8px grid system for consistent padding and margins
 */

const baseUnit = 8;

export const spacing = {
  // Core units (multiples of 8px)
  xs: baseUnit * 0.5,    // 4px
  sm: baseUnit * 1,      // 8px
  md: baseUnit * 2,      // 16px
  lg: baseUnit * 3,      // 24px
  xl: baseUnit * 4,      // 32px
  xxl: baseUnit * 5,     // 40px
  xxxl: baseUnit * 6,    // 48px
};

/**
 * Padding presets
 */
export const padding = {
  // Container padding
  container: spacing.md,      // 16px
  containerLarge: spacing.lg, // 24px
  containerSmall: spacing.sm, // 8px

  // Component padding
  component: spacing.md,      // 16px
  componentLarge: spacing.lg, // 24px
  componentSmall: spacing.sm, // 8px

  // Button padding
  button: {
    vertical: spacing.md - 2,  // 14px (for 48px button height)
    horizontal: spacing.md,     // 16px
  },

  // Input padding
  input: {
    vertical: spacing.sm + 2,   // 10px
    horizontal: spacing.md,     // 16px
  },

  // Card padding
  card: spacing.md,            // 16px
  cardLarge: spacing.lg,       // 24px

  // Section padding
  section: spacing.lg,         // 24px
  sectionSmall: spacing.md,    // 16px
};

/**
 * Margin presets
 */
export const margin = {
  // Component spacing
  component: spacing.md,      // 16px
  componentLarge: spacing.lg, // 24px
  componentSmall: spacing.sm, // 8px
  componentTiny: spacing.xs,  // 4px

  // Section spacing
  section: spacing.lg,        // 24px
  sectionLarge: spacing.xl,   // 32px

  // Between sections
  betweenSections: spacing.xl, // 32px

  // Text spacing
  text: spacing.sm,           // 8px
  textLarge: spacing.md,      // 16px
};

/**
 * Gap (for Flexbox)
 */
export const gap = {
  xs: spacing.xs,    // 4px
  sm: spacing.sm,    // 8px
  md: spacing.md,    // 16px
  lg: spacing.lg,    // 24px
  xl: spacing.xl,    // 32px
  xxl: spacing.xxl,  // 40px
};

/**
 * Responsive sizing adjustments
 * (Can be extended for tablet/large screen layouts)
 */
export const responsiveSpacing = {
  small: {
    padding: spacing.sm,
    margin: spacing.sm,
  },
  medium: {
    padding: spacing.md,
    margin: spacing.md,
  },
  large: {
    padding: spacing.lg,
    margin: spacing.lg,
  },
};

export default spacing;
