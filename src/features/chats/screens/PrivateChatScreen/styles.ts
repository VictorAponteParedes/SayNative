import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  dateDividerContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  datePill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
});
