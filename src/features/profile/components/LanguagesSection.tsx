import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fonts } from '@/theme';
import { AppText, AppAlert } from '@/components';
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
    AppAlert.confirm({
      title: t('languages.deleteConfirmTitle', 'Eliminar idioma'),
      message: t('languages.deleteConfirmMessage', {
        name: langItem.name,
        defaultValue: `¿Estás seguro de que deseas eliminar ${langItem.name} de tu lista de idiomas?`,
      }),
      cancelText: t('languages.cancel', 'Cancelar'),
      confirmText: t('languages.deleteConfirm', 'Eliminar'),
      confirmColor: colors.danger,
      onConfirm: () => onPressRemoveLanguageItem?.(langItem.code),
    });
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con título */}
      <View style={styles.headerRow}>
        <AppText style={styles.title}>
          {t('languages.title', 'Mis Idiomas')}
        </AppText>
      </View>

      {/* Idioma Nativo Principal */}
      <View style={styles.languageCard}>
        <View style={styles.langInfoRow}>
          <View style={styles.flagCircle}>
            <AppText style={styles.flagEmoji}>{user.nativeLanguage.flag}</AppText>
          </View>
          <View style={styles.langTextColumn}>
            <AppText style={styles.langName}>
              {user.nativeLanguage.name}
            </AppText>
            <AppText style={styles.langSub}>
              {t('languages.nativeLabel', 'Idioma Nativo')}
            </AppText>
          </View>
          <View style={styles.nativeBadge}>
            <AppText style={styles.nativeBadgeText}>
              {t('languages.nativeBadge', 'Nativo')}
            </AppText>
          </View>
        </View>
      </View>

      {/* Lista Dinámica de Idiomas con Barras de Progreso e Ícono de Eliminar */}
      {languagesList.map((langItem) => {
        const isNativeItem =
          langItem.isNative || (langItem.progressPercentage ?? 0) >= 100;
        const progress = langItem.progressPercentage ?? 60;
        const target = langItem.targetLevel || 'B2';
        const isHighProficiency = progress >= 80;

        return (
          <TouchableOpacity
            key={langItem.code}
            activeOpacity={0.8}
            onPress={() => onPressEditLanguageItem?.(langItem.code)}
            style={styles.languageCard}
          >
            <View style={styles.langInfoRow}>
              <View style={styles.flagCircle}>
                <AppText style={styles.flagEmoji}>{langItem.flag}</AppText>
              </View>
              <View style={styles.langTextColumn}>
                <AppText style={styles.langName}>{langItem.name}</AppText>
                <AppText style={styles.langSub}>
                  {langItem.level || t('languages.levels.b1Title', 'Nivel B1 · Intermedio')}
                </AppText>
              </View>

              {isNativeItem ? (
                <View style={styles.nativeBadge}>
                  <AppText style={styles.nativeBadgeText}>
                    {t('languages.nativeBadge', 'Nativo')}
                  </AppText>
                </View>
              ) : (
                <View
                  style={[
                    styles.progressBadge,
                    isHighProficiency && styles.progressBadgeHigh,
                  ]}
                >
                  <AppText
                    style={[
                      styles.progressBadgeText,
                      isHighProficiency && styles.progressBadgeTextHigh,
                    ]}
                  >
                    {t('languages.targetProgress', {
                      percent: progress,
                      target,
                      defaultValue: `${progress}% a ${target}`,
                    })}
                  </AppText>
                </View>
              )}

              {/* Botón de papelera sutil a la derecha */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleConfirmRemove(langItem)}
                hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
                style={styles.trashIconButton}
                accessibilityRole="button"
                accessibilityLabel={`${t('languages.deleteLanguageButton', 'Eliminar idioma')} ${langItem.name}`}
              >
                <Trash2
                  size={15}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            </View>

            {/* Barra de Progreso del Nivel */}
            {!isNativeItem && (
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${Math.min(100, Math.max(8, progress))}%`,
                      backgroundColor: isHighProficiency ? '#10B981' : colors.primary,
                    },
                  ]}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Botón Agregar otro idioma */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressAddLanguage}
        style={styles.addLanguageButton}
        accessibilityRole="button"
        accessibilityLabel="Agregar otro idioma"
      >
        <Plus size={16} color={colors.primary} style={styles.addIcon} />
        <AppText style={styles.addLanguageText}>
          {t('languages.addLanguage', 'Agregar otro idioma')}
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
    marginBottom: spacing.sm + 2,
  },
  title: {
    fontFamily: fonts.extraBold,
    fontSize: 18,
    color: colors.textPrimary,
  },
  languageCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    marginBottom: spacing.xs + 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  langInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  flagEmoji: {
    fontSize: 22,
  },
  langTextColumn: {
    flex: 1,
  },
  langName: {
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    fontSize: 15.5,
  },
  langSub: {
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  nativeBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },
  nativeBadgeText: {
    fontFamily: fonts.bold,
    color: '#059669',
    fontSize: 11.5,
  },
  progressBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },
  progressBadgeHigh: {
    backgroundColor: '#ECFDF5',
  },
  progressBadgeText: {
    fontFamily: fonts.bold,
    color: colors.primary,
    fontSize: 11.5,
  },
  progressBadgeTextHigh: {
    color: '#059669',
  },
  trashIconButton: {
    marginLeft: spacing.sm,
    padding: 6,
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EEF2F6',
    marginTop: spacing.sm + 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  addLanguageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryBgSubtle,
    borderRadius: 20,
    paddingVertical: spacing.sm + 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
  },
  addIcon: {
    marginRight: 6,
  },
  addLanguageText: {
    fontFamily: fonts.bold,
    color: colors.primary,
    fontSize: 13.5,
  },
});
