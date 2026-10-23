import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, PhoneMissed, CheckCheck, Phone } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, Avatar } from '@/components';
import { ChatConversation } from '../types';

export interface ChatItemCardProps {
  chat: ChatConversation;
  onPress: (chat: ChatConversation) => void;
}

export const ChatItemCard: React.FC<ChatItemCardProps> = ({ chat, onPress }) => {
  const isMissedCall = chat.messageType === 'missed_call';
  const isVideoCallEnded = chat.messageType === 'videocall_ended';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(chat)}
      style={styles.card}
    >
      {/* Avatar con status y bandera */}
      <View style={styles.avatarWrapper}>
        <Avatar
          uri={chat.avatarUrl}
          name={chat.name}
          size={54}
          isOnline={chat.isOnline}
          flag={chat.countryFlag}
        />
      </View>

      {/* Información del chat */}
      <View style={styles.infoWrapper}>
        <View style={styles.topNameRow}>
          <View style={styles.nameAndBadge}>
            <AppText variant="bodyLarge" style={styles.nameText} numberOfLines={1}>
              {chat.name}
            </AppText>
            {chat.badge && (
              <View style={styles.superTutorBadge}>
                <AppText style={styles.superTutorText}>{chat.badge}</AppText>
              </View>
            )}
          </View>

          <AppText
            variant="caption"
            style={[
              styles.timeText,
              chat.unreadCount ? styles.timeUnread : undefined,
            ]}
          >
            {chat.time}
          </AppText>
        </View>

        {/* Último mensaje y estado */}
        <View style={styles.bottomMessageRow}>
          <View style={styles.messageContent}>
            {isVideoCallEnded && (
              <Video size={15} color={colors.primary} style={styles.msgIcon} />
            )}
            {isMissedCall && (
              <PhoneMissed size={15} color={colors.danger} style={styles.msgIcon} />
            )}
            <AppText
              variant="bodySmall"
              numberOfLines={1}
              style={[
                styles.messageText,
                isMissedCall && styles.missedCallText,
                chat.unreadCount ? styles.unreadMessageText : undefined,
              ]}
            >
              {chat.lastMessage}
            </AppText>
          </View>

          {/* Indicador derecho: Badge no leído, CheckCheck o botón de llamada perdida */}
          {chat.unreadCount ? (
            <View style={styles.unreadBadge}>
              <AppText variant="caption" style={styles.unreadBadgeText}>
                {chat.unreadCount}
              </AppText>
            </View>
          ) : chat.isRead ? (
            <CheckCheck size={18} color={colors.primaryLight} />
          ) : isMissedCall ? (
            <View style={styles.missedCallButton}>
              <Phone size={13} color={colors.dangerDark} />
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.borderLight,
  },
  onlineDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  flagBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  flagText: {
    fontSize: 14,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  topNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameAndBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  nameText: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 15,
  },
  superTutorBadge: {
    backgroundColor: colors.actionLight,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  superTutorText: {
    color: colors.textDarkTeal,
    fontSize: 10,
    fontWeight: '700',
  },
  timeText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  timeUnread: {
    color: colors.primary,
    fontWeight: '700',
  },
  bottomMessageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  msgIcon: {
    marginRight: 5,
  },
  messageText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  unreadMessageText: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  missedCallText: {
    color: colors.danger,
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadBadgeText: {
    color: colors.textWhite,
    fontSize: 11,
    fontWeight: '800',
  },
  missedCallButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.dangerLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
