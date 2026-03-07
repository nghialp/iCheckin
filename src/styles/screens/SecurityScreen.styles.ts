import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { headerStyles, cardStyles, containerStyles } from '../../styles';

export const styles = StyleSheet.create({
  // Container
  container: {
    ...containerStyles.screen,
  },

  // Header
  header: {
    ...headerStyles.header,
  },
  headerTitle: {
    ...headerStyles.headerTitle,
  },

  // Content
  content: {
    flex: 1,
    padding: spacing.md,
  },

  // Section
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.heading3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },

  // Card
  card: {
    ...cardStyles.cardRow,
    marginBottom: spacing.sm,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  cardDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  // Setting Card
  settingCard: {
    ...cardStyles.cardRow,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  // Tip Card
  tipCard: {
    ...cardStyles.card,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.md,
    flex: 1,
  },
});
