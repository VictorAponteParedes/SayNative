import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText, AppLogo } from '@/components';
import { getLanguageFlag } from '@/features/profile/components/LanguageSelectorBottomSheet';

export interface RegisterHeaderProps {
  onBack: () => void;
  onPressLanguage?: () => void;
  onPressProfile?: () => void;
}

export const RegisterHeader: React.FC<RegisterHeaderProps> = ({
  onBack,
  onPressLanguage,
  onPressProfile,
}) => {
  const { t, i18n } = useTranslation('auth');
  const activeFlag = getLanguageFlag(i18n.language);
  const handleAction = onPressLanguage || onPressProfile;

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onBack}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={styles.backButton}
      >
        <ChevronLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.titleRow}>
        <AppLogo size={24} />
        <AppText variant="h3" style={styles.headerTitle}>
          {t('register.headerTitle')}
        </AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleAction}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={styles.flagButton}
        accessibilityLabel="Cambiar idioma"
        accessibilityRole="button"
      >
        <AppText style={styles.flagText}>{activeFlag}</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  flagButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  flagText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
