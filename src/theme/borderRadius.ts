/**
 * Border Radius System
 * Consistent border radius values across the app
 */

export const borderRadius = {
  // Small components
  xs: 4,        // Very small buttons, small elements
  sm: 6,        // Small chips, small inputs
  md: 8,        // Standard input, standard button
  lg: 12,       // Cards, larger components
  xl: 16,       // Large cards, modals
  xxl: 20,      // Extra large surfaces
  full: 999,    // Fully rounded (circles, pills)
};

/**
 * Border radius presets for common components
 */
export const borderRadiusPresets = {
  // Button styles
  button: borderRadius.md,        // 8px
  buttonLarge: borderRadius.lg,   // 12px
  buttonSmall: borderRadius.sm,   // 6px
  buttonRound: borderRadius.full, // 999px (pill shape)

  // Input styles
  input: borderRadius.lg,         // 12px
  inputSmall: borderRadius.md,    // 8px

  // Card styles
  card: borderRadius.lg,          // 12px
  cardLarge: borderRadius.xl,     // 16px

  // Modal styles
  modal: borderRadius.xl,         // 16px

  // Image styles
  image: borderRadius.md,         // 8px
  imageRound: borderRadius.full,  // 999px (circle)

  // Chip/Badge styles
  chip: borderRadius.full,        // 999px (fully rounded)

  // Avatar
  avatar: borderRadius.full,      // 999px (circle)

  // Tab styles
  tab: borderRadius.md,           // 8px

  // Divider
  divider: 0,                     // No rounding
};

export default borderRadius;
