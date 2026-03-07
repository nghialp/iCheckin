/**
 * Common Styles
 * Reusable style patterns for common components
 */

import { StyleSheet } from 'react-native';
import { colors, colorAliases } from '../theme/colors';
import { spacing, padding, margin } from '../theme/spacing';
import { typography, fontSizes } from '../theme/typography';
import { shadows, shadowPresets } from '../theme/shadows';
import { borderRadius, borderRadiusPresets } from '../theme/borderRadius';

/**
 * Screen/Container Styles
 */
export const containerStyles = StyleSheet.create({
  // Full screen flex container
  flex: {
    flex: 1,
  },

  // Screen background
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Safe screen with padding
  screenPadded: {
    flex: 1,
    backgroundColor: colors.background,
    padding: padding.container,
  },

  // Surface background
  surface: {
    backgroundColor: colors.surface,
  },
});

/**
 * Header Styles
 */
export const headerStyles = StyleSheet.create({
  // Header container
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.container,
    paddingVertical: padding.container,
    backgroundColor: colorAliases.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: colorAliases.headerBorder,
  },

  // Header with less padding (compact)
  headerCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding.container,
    paddingVertical: spacing.sm,
    backgroundColor: colorAliases.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: colorAliases.headerBorder,
  },

  // Header title
  headerTitle: {
    ...typography.heading2,
    color: colorAliases.headerText,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },

  // Header subtitle
  headerSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});

/**
 * Card Styles
 */
export const cardStyles = StyleSheet.create({
  // Base card
  card: {
    backgroundColor: colorAliases.cardBackground,
    borderRadius: borderRadiusPresets.card,
    borderWidth: 1,
    borderColor: colorAliases.cardBorder,
    padding: padding.card,
    ...shadowPresets.card,
  },

  // Card with larger padding
  cardLarge: {
    backgroundColor: colorAliases.cardBackground,
    borderRadius: borderRadiusPresets.cardLarge,
    borderWidth: 1,
    borderColor: colorAliases.cardBorder,
    padding: padding.cardLarge,
    ...shadowPresets.card,
  },

  // Card with no shadow
  cardFlat: {
    backgroundColor: colorAliases.cardBackground,
    borderRadius: borderRadiusPresets.card,
    borderWidth: 1,
    borderColor: colorAliases.cardBorder,
    padding: padding.card,
  },

  // Elevated card (hover state)
  cardElevated: {
    backgroundColor: colorAliases.cardBackground,
    borderRadius: borderRadiusPresets.card,
    borderWidth: 1,
    borderColor: colorAliases.cardBorder,
    padding: padding.card,
    ...shadowPresets.cardHover,
  },

  // Horizontal card layout
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorAliases.cardBackground,
    borderRadius: borderRadiusPresets.card,
    borderWidth: 1,
    borderColor: colorAliases.cardBorder,
    padding: padding.card,
    ...shadowPresets.card,
  },

  // Outlined card (variant)
  cardOutlined: {
    backgroundColor: colors.transparent,
    borderRadius: borderRadiusPresets.card,
    borderWidth: 2,
    borderColor: colorAliases.cardBorder,
    padding: padding.card,
  },
});

/**
 * Button Styles
 */
export const buttonStyles = StyleSheet.create({
  // Base button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: padding.button.vertical,
    paddingHorizontal: padding.button.horizontal,
    borderRadius: borderRadiusPresets.button,
    minHeight: 48,
  },

  // Primary button
  buttonPrimary: {
    backgroundColor: colorAliases.buttonPrimary,
    ...shadowPresets.button,
  },

  // Primary button text
  buttonPrimaryText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },

  // Secondary button
  buttonSecondary: {
    backgroundColor: colorAliases.buttonSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Secondary button text
  buttonSecondaryText: {
    ...typography.button,
    color: colorAliases.buttonSecondaryText,
    fontWeight: '600',
  },

  // Disabled button
  buttonDisabled: {
    backgroundColor: colorAliases.buttonDisabled,
    opacity: 0.6,
  },

  // Disabled button text
  buttonDisabledText: {
    ...typography.button,
    color: colorAliases.buttonDisabledText,
    fontWeight: '600',
  },

  // Text button (no background)
  buttonText: {
    backgroundColor: colors.transparent,
  },

  // Text button text
  buttonTextContent: {
    ...typography.button,
    color: colorAliases.buttonPrimary,
    fontWeight: '600',
  },

  // Danger button
  buttonDanger: {
    backgroundColor: colors.error,
    ...shadowPresets.button,
  },

  // Danger button text
  buttonDangerText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },

  // Small button
  buttonSmall: {
    paddingVertical: spacing.sm - 2,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadiusPresets.buttonSmall,
    minHeight: 36,
  },

  // Large button
  buttonLarge: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadiusPresets.buttonLarge,
    minHeight: 56,
  },

  // Button icon spacing
  buttonIcon: {
    marginRight: spacing.sm,
  },
});

/**
 * Form Input Styles
 */
export const inputStyles = StyleSheet.create({
  // Input container
  inputContainer: {
    marginBottom: margin.component,
  },

  // Input label
  inputLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  // Input wrapper
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colorAliases.inputBackground,
    borderRadius: borderRadiusPresets.input,
    borderWidth: 1,
    borderColor: colorAliases.inputBorder,
    paddingHorizontal: padding.input.horizontal,
    minHeight: 48,
  },

  // Input wrapper focused
  inputWrapperFocused: {
    borderColor: colorAliases.inputBorderFocus,
    borderWidth: 2,
  },

  // Text input
  input: {
    flex: 1,
    paddingVertical: padding.input.vertical,
    fontSize: fontSizes.bodyMedium,
    color: colorAliases.inputText,
  },

  // Input placeholder color
  inputPlaceholder: {
    color: colorAliases.inputPlaceholder,
  },

  // Input error
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },

  // Error text
  inputErrorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },

  // Hint text
  inputHint: {
    ...typography.hint,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },

  // Input icon
  inputIcon: {
    marginLeft: spacing.sm,
  },

  // Input suffix (eye icon, etc)
  inputSuffix: {
    paddingLeft: spacing.sm,
  },

  // Textarea
  textarea: {
    minHeight: 100,
    paddingTop: padding.input.vertical,
    textAlignVertical: 'top',
  },
});

/**
 * Section Styles
 */
export const sectionStyles = StyleSheet.create({
  // Section container
  section: {
    marginBottom: margin.section,
  },

  // Section with padding
  sectionPadded: {
    marginBottom: margin.section,
    paddingHorizontal: padding.container,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  // Section title
  sectionTitle: {
    ...typography.heading3,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },

  // Section subtitle
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  // Section divider
  sectionDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: margin.betweenSections,
  },
});

/**
 * Text Styles
 */
export const textStyles = StyleSheet.create({
  // Primary text
  textPrimary: {
    color: colors.textPrimary,
  },

  // Secondary text
  textSecondary: {
    color: colors.textSecondary,
  },

  // Tertiary text
  textTertiary: {
    color: colors.textTertiary,
  },

  // Error text
  textError: {
    color: colors.error,
  },

  // Success text
  textSuccess: {
    color: colors.success,
  },

  // Warning text
  textWarning: {
    color: colors.warning,
  },
});

/**
 * Divider Styles
 */
export const dividerStyles = StyleSheet.create({
  // Horizontal divider
  horizontal: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: margin.component,
  },

  // Light divider
  light: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: margin.component,
  },

  // Bold divider
  bold: {
    height: 2,
    backgroundColor: colors.divider,
    marginVertical: margin.component,
  },
});

/**
 * Layout Helpers
 */
export const layoutStyles = StyleSheet.create({
  // Centered container
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Spacer (for Flexbox)
  spaceBetween: {
    justifyContent: 'space-between',
  },

  // Row layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Column layout
  column: {
    flexDirection: 'column',
  },

  // Wrap layout
  wrap: {
    flexWrap: 'wrap',
  },
});

/**
 * Export all common styles
 */
export const commonStyles = {
  containerStyles,
  headerStyles,
  cardStyles,
  buttonStyles,
  inputStyles,
  sectionStyles,
  textStyles,
  dividerStyles,
  layoutStyles,
};

export default commonStyles;
