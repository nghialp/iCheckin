import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { containerStyles, cardStyles, buttonStyles } from '../../styles';

export const styles = StyleSheet.create({
  // Container
  container: {
    ...containerStyles.screen,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },

  // Header Section
  headerSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.gray200,
  },
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },

  // Menu Section
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  menuIcon: {
    marginRight: spacing.md,
  },
  menuLabel: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 52,
  },

  // Logout Button
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 8,
    paddingVertical: spacing.md - 2,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoutButtonDisabled: {
    backgroundColor: colors.gray300,
  },
  logoutButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
});
