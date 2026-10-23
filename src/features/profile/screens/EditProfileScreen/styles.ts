import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: spacing.xs,
    borderWidth: 3,
    borderColor: colors.surface,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryBgSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 4,
  },
  cameraIcon: {
    marginRight: 6,
  },
  changePhotoText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldLabel: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 13,
  },
  verifiedBadge: {
    backgroundColor: colors.actionLight,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: 8,
  },
  verifiedText: {
    color: colors.actionDark,
    fontSize: 11,
    fontWeight: '700',
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: 14,
    color: colors.textPrimary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  textAreaContainer: {
    height: 96,
    alignItems: 'flex-start',
    paddingTop: spacing.xs,
  },
  textAreaInput: {
    height: 84,
    textAlignVertical: 'top',
  },
  readOnlyCard: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 14,
    padding: spacing.md,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  readOnlyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readOnlyLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  readOnlyValue: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 12,
  },
  saveButtonContainer: {
    marginTop: spacing.md,
  },
});
