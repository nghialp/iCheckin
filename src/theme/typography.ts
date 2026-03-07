/**
 * Typography System
 * Consistent font sizes, weights, and line heights
 */

export const fontSizes = {
  // Display (Hero text)
  display: 32,
  
  // Headings
  h1: 28,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,

  // Body
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 12,

  // Label
  label: 14,
  labelSmall: 12,

  // Caption
  caption: 12,
  captionSmall: 11,
};

export const fontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

/**
 * Predefined typography styles
 * Use these for consistent text styling across the app
 */
export const typography = {
  // Display
  displayLarge: {
    fontSize: fontSizes.display,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.display * lineHeights.tight,
  },

  // Headings
  heading1: {
    fontSize: fontSizes.h1,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.h1 * lineHeights.tight,
  },
  heading2: {
    fontSize: fontSizes.h2,
    fontWeight: fontWeights.bold,
    lineHeight: fontSizes.h2 * lineHeights.tight,
  },
  heading3: {
    fontSize: fontSizes.h3,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.h3 * lineHeights.tight,
  },

  // Body
  bodyLarge: {
    fontSize: fontSizes.bodyLarge,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.bodyLarge * lineHeights.normal,
  },
  bodyMedium: {
    fontSize: fontSizes.bodyMedium,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.bodyMedium * lineHeights.normal,
  },
  bodySmall: {
    fontSize: fontSizes.bodySmall,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.bodySmall * lineHeights.normal,
  },

  // Labels
  label: {
    fontSize: fontSizes.label,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.label * lineHeights.normal,
  },
  labelSmall: {
    fontSize: fontSizes.labelSmall,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.labelSmall * lineHeights.normal,
  },

  // Button text
  button: {
    fontSize: fontSizes.bodyMedium,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.bodyMedium * lineHeights.normal,
  },

  // Caption
  caption: {
    fontSize: fontSizes.caption,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.caption * lineHeights.normal,
  },
  captionSmall: {
    fontSize: fontSizes.captionSmall,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.captionSmall * lineHeights.normal,
  },

  // Hint/Helper text
  hint: {
    fontSize: fontSizes.bodySmall,
    fontWeight: fontWeights.regular,
    lineHeight: fontSizes.bodySmall * lineHeights.normal,
  },
};

export default typography;
