import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { headerStyles } from '../../styles';

export const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    ...headerStyles.header,
  },
  headerTitle: {
    ...headerStyles.headerTitle,
  },

  // Scroll View
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },

  // Section
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    fontWeight: '600',
  },

  // Setting Item
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  settingDesc: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  chevron: {
    padding: spacing.sm,
  },

  // Action Item
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actionLabel: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '500',
    marginLeft: spacing.md,
  },

  // Button Container
  buttonContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
});
