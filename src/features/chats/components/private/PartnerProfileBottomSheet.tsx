import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, Star, Check, Globe } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppBottomSheet, AppText, Avatar } from '@/components';
import { colors, spacing, borderRadius } from '@/theme';

export interface PartnerProfileBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  partnerName: string;
  partnerAvatar?: string;
  partnerFlag?: string;
  ratePerMinute?: number;
  onStartCall: () => void;
}

export const PartnerProfileBottomSheet: React.FC<
  PartnerProfileBottomSheetProps
> = ({
  visible,
  onClose,
  partnerName,
  partnerAvatar,
  partnerFlag = '🌐',
  ratePerMinute = 10,
  onStartCall,
}) => {
  const { t } = useTranslation('chats');

  const handleCall = () => {
    onClose();
    setTimeout(() => {
      onStartCall();
    }, 250);
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={t('partnerOptions.profileSheet.title', {
        defaultValue: 'Perfil de usuario',
      })}
      subtitle={t('partnerOptions.profileSheet.subtitle', {
        defaultValue: 'Información pública del compañero',
      })}
    >
      <View style={styles.container}>
        {/* Cabecera de perfil */}
        <View style={styles.avatarSection}>
          <Avatar
            uri={partnerAvatar}
            name={partnerName}
            size={72}
            isOnline
            flag={partnerFlag}
          />
          <View style={styles.nameRow}>
            <AppText variant="h2" style={styles.nameText}>
              {partnerName}
            </AppText>
            <View style={styles.verifiedBadge}>
              <Check size={12} color={colors.surface} strokeWidth={3} />
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Star size={15} color={colors.star} fill={colors.star} />
            <AppText variant="bodySmall" style={styles.ratingScore}>
              4.9
            </AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              · {t('partnerOptions.profileSheet.reviews', { count: 24, defaultValue: '24 valoraciones' })}
            </AppText>
          </View>
        </View>

        {/* Tarjetas de idiomas y tarifa */}
        <View style={styles.infoCardsGrid}>
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Globe size={16} color={colors.primary} />
              <AppText variant="caption" color={colors.textSecondary} style={styles.cardHeaderTitle}>
                {t('partnerOptions.profileSheet.speaks', { defaultValue: 'Idioma nativo' })}
              </AppText>
            </View>
            <AppText variant="bodyMedium" style={styles.cardValue}>
              {partnerFlag} Inglés
            </AppText>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <AppText style={styles.emojiIcon}>🎯</AppText>
              <AppText variant="caption" color={colors.textSecondary} style={styles.cardHeaderTitle}>
                {t('partnerOptions.profileSheet.learning', { defaultValue: 'Aprendiendo' })}
              </AppText>
            </View>
            <AppText variant="bodyMedium" style={styles.cardValue}>
              🇪🇸 Español (B2)
            </AppText>
          </View>
        </View>

        {/* Tarjeta de tarifa */}
        <View style={styles.rateCard}>
          <View>
            <AppText variant="caption" color={colors.textSecondary}>
              {t('partnerOptions.profileSheet.rate', { defaultValue: 'Tarifa de práctica' })}
            </AppText>
            <AppText variant="h3" style={styles.rateValue}>
              {t('partnerOptions.profileSheet.ratePerMin', {
                rate: ratePerMinute,
                defaultValue: `🪙 ${ratePerMinute} / min`,
              })}
            </AppText>
          </View>
          <View style={styles.onlinePill}>
            <View style={styles.onlineDot} />
            <AppText variant="caption" style={styles.onlinePillText}>
              {t('privateChat.online', { defaultValue: 'En línea' })}
            </AppText>
          </View>
        </View>

        {/* Acerca de mí / Bio */}
        <View style={styles.bioSection}>
          <AppText variant="caption" color={colors.textSecondary} style={styles.bioTitle}>
            {t('partnerOptions.profileSheet.about', { defaultValue: 'Acerca de mí' })}
          </AppText>
          <AppText variant="bodySmall" color={colors.textPrimary} style={styles.bioText}>
            {t('partnerOptions.profileSheet.defaultBio', {
              defaultValue:
                '¡Hola! Me encanta intercambiar idiomas y aprender sobre nuevas culturas. ¡Hablemos!',
            })}
          </AppText>
        </View>

        {/* Botón de acción: Llamar */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCall}
          style={styles.callButton}
        >
          <Video size={20} color={colors.surface} />
          <AppText variant="button" style={styles.callButtonText}>
            {t('partnerOptions.profileSheet.startCall', {
              defaultValue: 'Iniciar videollamada',
            })}
          </AppText>
        </TouchableOpacity>
      </View>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  nameText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  verifiedBadge: {
    backgroundColor: colors.primary,
    borderRadius: 9,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingScore: {
    fontWeight: '700',
    marginLeft: 4,
    color: colors.textPrimary,
  },
  infoCardsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardHeaderTitle: {
    marginLeft: 4,
    fontSize: 11,
  },
  cardValue: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  emojiIcon: {
    fontSize: 14,
  },
  rateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  rateValue: {
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.online,
    marginRight: 6,
  },
  onlinePillText: {
    fontWeight: '600',
    color: colors.online,
  },
  bioSection: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  bioTitle: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bioText: {
    lineHeight: 18,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  callButtonText: {
    color: colors.surface,
    fontWeight: '700',
  },
});
