import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../componentes';
import { useAuthStore } from '../../../store/useAuthStore';

export interface LanguageFilterBarProps {
  onPressSelectLearningLanguage?: () => void;
}

export const LanguageFilterBar: React.FC<LanguageFilterBarProps> = ({
  onPressSelectLearningLanguage,
}) => {
  const { t } = useTranslation('home');
  const { learningLanguage, nativeLanguage } = useAuthStore(
    (state) => state.user
  );

  return (
    <View style={styles.container}>
      {/* Selector de idioma a practicar */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressSelectLearningLanguage}
        style={styles.learningPill}
      >
        <AppText variant="caption" color={colors.textSecondary}>
          {t('languageFilter.practiceLabel')}
        </AppText>
        <AppText style={styles.flag}>{learningLanguage.flag}</AppText>
        <AppText variant="bodySmall" style={styles.learningText}>
          {learningLanguage.name} ({learningLanguage.level})
        </AppText>
        <ChevronDown size={14} color={colors.primary} />
      </TouchableOpacity>

      {/* Idioma nativo */}
      <View style={styles.nativePill}>
        <AppText variant="caption" color={colors.textSecondary}>
          {t('languageFilter.nativeLabel')}
        </AppText>
        <AppText style={styles.flag}>{nativeLanguage.flag}</AppText>
        <AppText variant="bodySmall" style={styles.nativeText}>
          {nativeLanguage.name}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  learningPill: {
    flex: 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 5,
  },
  nativePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: 24,
    gap: 5,
  },
  flag: {
    fontSize: 14,
  },
  learningText: {
    fontWeight: '700',
    color: colors.primary,
  },
  nativeText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
