import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Ban, Flag, ShieldCheck, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppBottomSheet, AppText, Avatar } from '@/components';
import { colors, spacing, borderRadius } from '@/theme';

export interface ChatPartnerOptionsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  partnerName: string;
  partnerAvatar?: string;
  partnerFlag?: string;
  ratePerMinute?: number;
  isBlocked?: boolean;
  onViewProfile: () => void;
  onBlockUser: () => void;
  onUnblockUser?: () => void;
  onReportUser: () => void;
}

export const ChatPartnerOptionsBottomSheet: React.FC<
  ChatPartnerOptionsBottomSheetProps
> = ({
  visible,
  onClose,
  partnerName,
  partnerAvatar,
  partnerFlag = '🌐',
  ratePerMinute = 10,
  isBlocked = false,
  onViewProfile,
  onBlockUser,
  onUnblockUser,
  onReportUser,
}) => {
  const { t } = useTranslation('chats');

  const handleSelectViewProfile = () => {
    onClose();
    setTimeout(() => {
      onViewProfile();
    }, 250);
  };

  const handleSelectBlockUser = () => {
    onClose();
    setTimeout(() => {
      onBlockUser();
    }, 250);
  };

  const handleSelectUnblockUser = () => {
    onClose();
    setTimeout(() => {
      onUnblockUser?.();
    }, 250);
  };

  const handleSelectReportUser = () => {
    onClose();
    setTimeout(() => {
      onReportUser();
    }, 250);
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={t('partnerOptions.title', { defaultValue: 'Opciones del contacto' })}
      subtitle={t('partnerOptions.subtitle', {
        defaultValue: `Acciones y privacidad con ${partnerName}`,
        name: partnerName,
      })}
    >
      <View style={styles.container}>
        {/* Cabecera resumen del compañero */}
        <View style={styles.partnerCard}>
          <Avatar
            uri={partnerAvatar}
            name={partnerName}
            size={52}
            isOnline
            flag={partnerFlag}
          />
          <View style={styles.partnerInfo}>
            <AppText variant="h3" style={styles.partnerName} numberOfLines={1}>
              {partnerName}
            </AppText>
            <View style={styles.partnerMetaRow}>
              <View style={styles.onlineDot} />
              <AppText variant="caption" color={colors.textSecondary}>
                {t('privateChat.online', { defaultValue: 'En línea' })}
              </AppText>
              <AppText variant="caption" color={colors.textMuted} style={styles.metaDivider}>
                ·
              </AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                🪙 {ratePerMinute} / min
              </AppText>
            </View>
          </View>
        </View>

        {/* Lista de opciones de acción */}
        <View style={styles.optionsList}>
          {/* Opción 1: Ver perfil */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSelectViewProfile}
            style={styles.optionRow}
          >
            <View style={[styles.iconContainer, styles.profileIconBg]}>
              <User size={22} color={colors.primary} />
            </View>
            <View style={styles.textContainer}>
              <AppText variant="bodyMedium" style={styles.optionTitle}>
                {t('partnerOptions.viewProfile', { defaultValue: 'Ver perfil' })}
              </AppText>
              <AppText
                variant="caption"
                color={colors.textSecondary}
                style={styles.optionDesc}
              >
                {t('partnerOptions.viewProfileDesc', {
                  defaultValue: 'Ver biografía, idiomas que domina y valoraciones',
                })}
              </AppText>
            </View>
            <ChevronRight size={18} color={colors.textMuted} />
          </TouchableOpacity>

          {/* Opción 2: Bloquear / Desbloquear perfil */}
          {isBlocked ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSelectUnblockUser}
              style={styles.optionRow}
            >
              <View style={[styles.iconContainer, styles.unblockIconBg]}>
                <ShieldCheck size={22} color={colors.online} />
              </View>
              <View style={styles.textContainer}>
                <AppText
                  variant="bodyMedium"
                  style={[styles.optionTitle, styles.unblockTitle]}
                >
                  {t('partnerOptions.unblockUser', {
                    defaultValue: 'Desbloquear perfil',
                  })}
                </AppText>
                <AppText
                  variant="caption"
                  color={colors.textSecondary}
                  style={styles.optionDesc}
                >
                  {t('partnerOptions.unblockUserDesc', {
                    defaultValue:
                      'Permitir volver a interactuar y enviar mensajes',
                  })}
                </AppText>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSelectBlockUser}
              style={styles.optionRow}
            >
              <View style={[styles.iconContainer, styles.blockIconBg]}>
                <Ban size={22} color={colors.coinDark} />
              </View>
              <View style={styles.textContainer}>
                <AppText
                  variant="bodyMedium"
                  style={[styles.optionTitle, styles.blockTitle]}
                >
                  {t('partnerOptions.blockUser', {
                    defaultValue: 'Bloquear perfil',
                  })}
                </AppText>
                <AppText
                  variant="caption"
                  color={colors.textSecondary}
                  style={styles.optionDesc}
                >
                  {t('partnerOptions.blockUserDesc', {
                    defaultValue:
                      'No podrá enviarte mensajes ni realizar llamadas',
                  })}
                </AppText>
              </View>
              <ChevronRight size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}

          {/* Opción 3: Reportar perfil */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSelectReportUser}
            style={[styles.optionRow, styles.lastOptionRow]}
          >
            <View style={[styles.iconContainer, styles.reportIconBg]}>
              <Flag size={22} color={colors.danger} />
            </View>
            <View style={styles.textContainer}>
              <AppText variant="bodyMedium" style={[styles.optionTitle, styles.reportTitle]}>
                {t('partnerOptions.reportUser', { defaultValue: 'Reportar perfil' })}
              </AppText>
              <AppText
                variant="caption"
                color={colors.textSecondary}
                style={styles.optionDesc}
              >
                {t('partnerOptions.reportUserDesc', {
                  defaultValue: 'Notificar conducta inapropiada o spam a moderación',
                })}
              </AppText>
            </View>
            <ChevronRight size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  partnerInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  partnerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.online,
    marginRight: 6,
  },
  metaDivider: {
    marginHorizontal: 6,
  },
  optionsList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  lastOptionRow: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  profileIconBg: {
    backgroundColor: colors.primaryLight ?? '#EFF6FF',
  },
  unblockIconBg: {
    backgroundColor: '#ECFDF5',
  },
  blockIconBg: {
    backgroundColor: '#FEF3C7',
  },
  reportIconBg: {
    backgroundColor: '#FEE2E2',
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  unblockTitle: {
    color: colors.online,
  },
  blockTitle: {
    color: colors.textPrimary,
  },
  reportTitle: {
    color: colors.danger,
  },
  optionDesc: {
    marginTop: 2,
    fontSize: 12,
  },
});
