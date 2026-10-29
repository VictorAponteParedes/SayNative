import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Plus, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fonts } from '@/theme';
import { AppText } from '@/components';
import type { UserProfile, UserLanguage } from '@/store/useAuthStore';

export interface LanguagesSectionProps {
  user: UserProfile;
  onPressAddLanguage: () => void;
  onPressEditLanguageItem?: (languageCode: string) => void;
  onPressRemoveLanguageItem?: (languageCode: string) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  user,
  onPressAddLanguage,
  onPressEditLanguageItem,
  onPressRemoveLanguageItem,
}) => {
  const { t } = useTranslation('profile');

  const languagesList: UserLanguage[] = Array.isArray(user.learningLanguagesList)
    ? user.learningLanguagesList
    : [user.learningLanguage];

  const handleConfirmRemove = (langItem: UserLanguage) => {
    Alert.alert(
      t('languages.deleteConfirmTitle', 'Eliminar idioma'),
      t('languages.deleteConfirmMessage', {
        name: langItem.name,
        defaultValue: `¿Estás seguro de que deseas eliminar ${langItem.name} de tu lista de idiomas?`,
      }),
      [
        {
          text: t('languages.cancel', 'Cancelar'),
          style: 'cancel',
        },
        {
          text: t('languages.deleteConfirm', 'Eliminar'),
          style: 'destructive',
          onPress: () => onPressRemoveLanguageItem?.(langItem.code),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerRow}>
        <AppText variant="h3" style={styles.title}>
          {t('languages.title')}
        </AppText>
      </View>

      {/* Idioma Nativo Principal */}
      <View style={styles.languageCard}>
        <View style={styles.langInfoRow}>
          <AppText style={styles.flagEmoji}>{user.nativeLanguage.flag}</AppText>
          <View style={styles.langTextColumn}>
            <AppText style={styles.langName}>
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

      {/* Lista Dinámica de Todos los Idiomas Agregados */}
      {languagesList.map((langItem) => {
        const isNativeItem =
          langItem.isNative || (langItem.progressPercentage ?? 0) >= 100;
        const progress = langItem.progressPercentage ?? 60;
        const target = langItem.targetLevel || 'B2';

        return (
          <TouchableOpacity
            key={langItem.code}
            activeOpacity={0.8}
            onPress={() => onPressEditLanguageItem?.(langItem.code)}
            style={styles.languageCard}
          >
            <View style={styles.langInfoRow}>
              <AppText style={styles.flagEmoji}>{langItem.flag}</AppText>
              <View style={styles.langTextColumn}>
                <AppText style={styles.langName}>{langItem.name}</AppText>
                <AppText variant="caption" style={styles.langSub}>
                  {langItem.level || t('languages.levels.b1Title')}
                </AppText>
              </View>

              {isNativeItem ? (
                <View style={styles.nativeBadge}>
                  <AppText variant="caption" style={styles.nativeBadgeText}>
                    {t('languages.nativeBadge')}
                  </AppText>
                </View>
              ) : (
                <AppText variant="caption" style={styles.progressText}>
                  {t('languages.targetProgress', {
                    percent: progress,
                    target,
                  })}
                </AppText>
              )}

              {/* Botón para eliminar el idioma */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleConfirmRemove(langItem)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.deleteButton}
                accessibilityRole="button"
                accessibilityLabel={`${t('languages.deleteLanguageButton', 'Eliminar idioma')} ${langItem.name}`}
              >
                <Trash2 size={16} color={colors.danger} />
              </TouchableOpacity>
            </View>

            {/* Barra de Progreso del Nivel */}
            {!isNativeItem && (
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${Math.min(100, Math.max(10, progress))}%` },
                  ]}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Botón Agregar otro idioma */}
      <TouchableOpacity
        activeOpacity={0.75}
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
    fontFamily: fonts.extraBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  languageCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
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
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    fontSize: 15,
  },
  langSub: {
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 1,
  },
  nativeBadge: {
    backgroundColor: colors.actionLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
  },
  nativeBadgeText: {
    fontFamily: fonts.bold,
    color: colors.actionDark,
    fontSize: 11,
  },
  progressText: {
    fontFamily: fonts.bold,
    color: colors.primary,
    fontSize: 12,
  },
  deleteButton: {
    marginLeft: spacing.sm,
    padding: 6,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.dangerBgSubtle,
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
    backgroundColor: colors.primaryBgSubtle,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm + 4,
    marginTop: 2,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
  },
  addIcon: {
    marginRight: 6,
  },
  addLanguageText: {
    fontFamily: fonts.bold,
    color: colors.primary,
    fontSize: 13,
  },
});
