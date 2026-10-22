import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  PhoneOff,
  Coins,
  MessageSquare,
  Gift,
  UserCheck,
  Clock,
  Video,
  Mic,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';
import type { NotificationItem, NotificationType } from '../types';

export interface NotificationItemCardProps {
  notification: NotificationItem;
  onPressAction: (item: NotificationItem) => void;
}

export const NotificationItemCard: React.FC<NotificationItemCardProps> = ({
  notification,
  onPressAction,
}) => {
  const { t } = useTranslation('notifications');

  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case 'missedCall':
        return (
          <View style={[styles.iconCircle, { backgroundColor: colors.dangerLight }]}>
            <PhoneOff size={18} color={colors.danger} />
          </View>
        );
      case 'coinsEarned':
        return (
          <View style={[styles.iconCircle, { backgroundColor: colors.pillSkyBg }]}>
            <Coins size={18} color={colors.coin} />
          </View>
        );
      case 'newMessage':
        return (
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryBgSubtle }]}>
            <MessageSquare size={18} color={colors.primary} />
          </View>
        );
      case 'streakBonus':
        return (
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryBgSubtle }]}>
            <Gift size={18} color={colors.primary} />
          </View>
        );
      case 'tutorOnline':
        return (
          <View style={[styles.iconCircle, { backgroundColor: colors.actionLight }]}>
            <UserCheck size={18} color={colors.actionDark} />
          </View>
        );
      case 'reminder':
      default:
        return (
          <View style={[styles.iconCircle, { backgroundColor: colors.pillSkyBg }]}>
            <Clock size={18} color={colors.primary} />
          </View>
        );
    }
  };

  const renderActionButton = () => {
    if (!notification.actionType) return null;

    if (notification.actionType === 'call') {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressAction(notification)}
          style={styles.callActionButton}
        >
          <Video size={16} color={colors.surface} style={styles.buttonIcon} />
          <AppText variant="bodySmall" style={styles.callActionButtonText}>
            {t(notification.actionTextKey || 'items.missedCallAction')}
          </AppText>
        </TouchableOpacity>
      );
    }

    if (notification.actionType === 'playAudio') {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressAction(notification)}
          style={styles.audioActionButton}
        >
          <Mic size={14} color={colors.primary} style={styles.buttonIcon} />
          <AppText variant="caption" style={styles.audioActionButtonText}>
            {t(notification.actionTextKey || 'items.newMessageAudio')}
          </AppText>
        </TouchableOpacity>
      );
    }

    if (notification.actionType === 'claimBonus') {
      const isClaimed = notification.isClaimed;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressAction(notification)}
          disabled={isClaimed}
          style={[
            styles.bonusActionButton,
            isClaimed && styles.bonusActionButtonClaimed,
          ]}
        >
          <Gift
            size={16}
            color={isClaimed ? colors.textMuted : colors.surface}
            style={styles.buttonIcon}
          />
          <AppText
            variant="bodySmall"
            style={[
              styles.bonusActionButtonText,
              isClaimed && styles.bonusActionButtonTextClaimed,
            ]}
          >
            {isClaimed
              ? t('items.streakClaimed')
              : t(notification.actionTextKey || 'items.streakAction')}
          </AppText>
        </TouchableOpacity>
      );
    }

    if (notification.actionType === 'sayHello') {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressAction(notification)}
          style={styles.helloActionButton}
        >
          <AppText variant="bodySmall" style={styles.helloActionButtonText}>
            {t(notification.actionTextKey || 'items.tutorOnlineAction')}
          </AppText>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        {/* Icono con badge de no leído */}
        <View style={styles.iconWrapper}>
          {renderIcon(notification.type)}
          {!notification.isRead && <View style={styles.unreadDot} />}
        </View>

        {/* Textos y detalles */}
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <AppText variant="body" numberOfLines={1} style={styles.title}>
              {t(notification.titleKey)}
            </AppText>

            {notification.coinsAmount ? (
              <View style={styles.coinBadge}>
                <AppText variant="caption" style={styles.coinBadgeText}>
                  +{notification.coinsAmount} 🪙
                </AppText>
              </View>
            ) : (
              <AppText variant="caption" style={styles.timeText}>
                {t(notification.timeKey)}
              </AppText>
            )}
          </View>

          {/* Subtítulo de tiempo para tarjetas de monedas */}
          {!!notification.coinsAmount && (
            <AppText variant="caption" style={styles.subTimeText}>
              {t(notification.timeKey)}
            </AppText>
          )}

          {/* Descripción */}
          <AppText variant="caption" style={styles.description}>
            {t(notification.descKey)}
          </AppText>

          {/* Botón de acción */}
          {renderActionButton()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    position: 'relative',
    marginRight: spacing.sm + 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    flex: 1,
    fontWeight: '700',
    fontSize: 14,
    color: colors.textPrimary,
    marginRight: spacing.xs,
  },
  timeText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  subTimeText: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: 4,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
  coinBadge: {
    backgroundColor: colors.actionLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  coinBadgeText: {
    color: colors.actionDark,
    fontWeight: '800',
    fontSize: 12,
  },
  buttonIcon: {
    marginRight: 6,
  },
  callActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.action,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
  callActionButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 13,
  },
  audioActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryBgSubtle,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
  audioActionButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  bonusActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
  bonusActionButtonClaimed: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bonusActionButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 13,
  },
  bonusActionButtonTextClaimed: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  helloActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pillSkyBg,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
  helloActionButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
});
