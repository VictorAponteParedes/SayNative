import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';
import { useAuthStore } from '@/store/useAuthStore';

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

  // Formatear nivel de manera compacta y elegante (ej: "B1" o "Interm.")
  const formatLevelBadge = (level?: string): string => {
    if (!level) return '';
    const cefrMatch = level.match(/\b([A-C][1-2])\b/i);
    if (cefrMatch) {
      return cefrMatch[1].toUpperCase();
    }
    if (level.toLowerCase().includes('interm')) return 'Interm.';
    if (level.toLowerCase().includes('avanz')) return 'Avanz.';
    if (level.toLowerCase().includes('básic') || level.toLowerCase().includes('princ')) return 'Princ.';
    return level.length > 7 ? `${level.slice(0, 6)}...` : level;
  };

  const levelBadge = formatLevelBadge(learningLanguage.level);

  return (
    <View style={styles.container}>
      {/* Selector de idioma a practicar */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressSelectLearningLanguage}
        style={styles.learningPill}
      >
        <AppText variant="caption" style={styles.label}>
          {t('languageFilter.practiceLabel')}
        </AppText>
        <AppText style={styles.flag}>{learningLanguage.flag}</AppText>
        
        <View style={styles.textAndBadgeWrapper}>
          <AppText
            variant="bodySmall"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.learningText}
          >
            {learningLanguage.name}
          </AppText>

          {!!levelBadge && (
            <View style={styles.levelBadge}>
              <AppText variant="caption" style={styles.levelBadgeText}>
                {levelBadge}
              </AppText>
            </View>
          )}
        </View>

        <ChevronDown size={14} color={colors.primary} style={styles.chevron} />
      </TouchableOpacity>

      {/* Idioma nativo */}
      <View style={styles.nativePill}>
        <AppText variant="caption" style={styles.label}>
          {t('languageFilter.nativeLabel')}
        </AppText>
        <AppText style={styles.flag}>{nativeLanguage.flag}</AppText>
        <AppText
          variant="bodySmall"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.nativeText}
        >
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
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs + 2,
  },
  learningPill: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  nativePill: {
    flex: 0.95,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pillSkyBg,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 11,
    marginRight: 4,
  },
  flag: {
    fontSize: 14,
    marginRight: 4,
  },
  textAndBadgeWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    overflow: 'hidden',
  },
  learningText: {
    fontWeight: '700',
    color: colors.primary,
    fontSize: 13,
    flexShrink: 1,
  },
  levelBadge: {
    backgroundColor: colors.primaryBgSubtle,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: colors.primaryLighter,
  },
  levelBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  chevron: {
    marginLeft: 3,
  },
  nativeText: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 13,
    flexShrink: 1,
  },
});
