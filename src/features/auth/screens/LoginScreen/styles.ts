import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textPrimary,
  },
  keyboardWrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  sheetCard: {
    marginTop: -26,
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl + 8,
    borderTopRightRadius: borderRadius.xl + 8,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl + 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  handleBar: {
    width: 44,
    height: 4,
    borderRadius: borderRadius.xs,
    backgroundColor: colors.borderDark,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
});

export default styles;