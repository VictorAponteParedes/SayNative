import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';
import type { UserProfile } from '../../../store/useAuthStore';

export interface LanguagesSectionProps {
  user: UserProfile;
  onPressAddLanguage: () => void;
  onPressEditLanguages?: () => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  user,
  onPressAddLanguage,
  onPressEditLanguages,
}) => {
  const { t } = useTranslation('profile');

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerRow}>
        <AppText variant="h3" style={styles.title}>
          {t('languages.title')}
        </AppText>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressEditLanguages || onPressAddLanguage}
        >
          <AppText variant="bodySmall" style={styles.editLink}>
            {t('languages.edit')}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Idioma Nativo */}
      <View style={styles.languageCard}>
        <View style={styles.langInfoRow}>
          <AppText style={styles.flagEmoji}>{user.nativeLanguage.flag}</AppText>
          <View style={styles.langTextColumn}>
            <AppText variant="body" style={styles.langName}>
              {user.nativeLanguage.name}
            </AppText>
            <AppText variant="caption" style={styles.langSub}>
              {t('languages.nativeLabel')}
            </AppText>
          </View>
          <View style={styles.nativeBadge}>
            <AppText variant="caption" style={styles.nativeBadgeText}>
              {t('languages.nativeBadge')}
            </AppText>
          </View>
        </View>
      </View>

      {/* Idioma en Aprendizaje con Barra de Progreso */}
      <View style={styles.languageCard}>
        <View style={styles.langInfoRow}>
          <AppText style={styles.flagEmoji}>
            {user.learningLanguage.flag}
          </AppText>
          <View style={styles.langTextColumn}>
            <AppText variant="body" style={styles.langName}>
              {user.learningLanguage.name}
            </AppText>
            <AppText variant="caption" style={styles.langSub}>
              {user.learningLanguage.level || 'Intermedio'}
            </AppText>
          </View>
          <AppText variant="caption" style={styles.progressText}>
            {t('languages.targetProgress', {
              percent: user.learningLanguage.progressPercentage || 60,
              target: user.learningLanguage.targetLevel || 'B2',
            })}
          </AppText>
        </View>

        {/* Barra de Progreso */}
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${user.learningLanguage.progressPercentage || 60}%` },
            ]}
          />
        </View>
      </View>

      {/* Botón Agregar otro idioma */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressAddLanguage}
        style={styles.addLanguageButton}
      >
        <Plus size={16} color={colors.primary} style={styles.addIcon} />
        <AppText variant="button" style={styles.addLanguageText}>
          {t('languages.addLanguage')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  editLink: {
    color: colors.primary,
    fontWeight: '700',
  },
  languageCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  langInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  langTextColumn: {
    flex: 1,
  },
  langName: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 15,
  },
  langSub: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  nativeBadge: {
    backgroundColor: colors.actionLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  nativeBadgeText: {
    color: colors.actionDark,
    fontWeight: '700',
    fontSize: 11,
  },
  progressText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surfaceSubtle,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  addLanguageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 14,
    paddingVertical: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    marginTop: spacing.xs,
  },
  addIcon: {
    marginRight: 6,
  },
  addLanguageText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});
