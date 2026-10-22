import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, Video, MoreVertical, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../../theme';
import { AppText } from '../../../../componentes';
import { goBack } from '../../../../navigation/NavigationRef';

export interface PrivateChatHeaderProps {
  partnerName?: string;
  partnerAvatar?: string;
  isOnline?: boolean;
  onPressCall?: () => void;
  onPressOptions?: () => void;
  onPressProfile?: () => void;
}

export const PrivateChatHeader: React.FC<PrivateChatHeaderProps> = ({
  partnerName,
  isOnline = true,
  onPressCall,
  onPressOptions,
  onPressProfile,
}) => {
  const { t } = useTranslation('chats');
  const displayName = partnerName || t('privateChat.activeChat');

  return (
    <View style={styles.container}>
      {/* Botón Volver */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={goBack}
        style={styles.backButton}
      >
        <ArrowLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* Avatar e información del interlocutor */}
      <View style={styles.userInfo}>
        <View style={styles.avatarCircle}>
          <User size={20} color={colors.surface} />
          {isOnline && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.textContainer}>
          <AppText variant="h3" style={styles.nameText} numberOfLines={1}>
            {displayName}
          </AppText>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <AppText variant="caption" style={styles.statusText}>
              {t('privateChat.online')}
            </AppText>
          </View>
        </View>
      </View>

      {/* Botones de acción derecha */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressCall}
          style={styles.iconButton}
        >
          <Video size={22} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressOptions}
          style={styles.iconButton}
        >
          <MoreVertical size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressProfile}
          style={styles.profileButton}
        >
          <User size={18} color={colors.surface} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    padding: spacing.xs,
    marginRight: spacing.xs,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  textContainer: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#0D695A',
    fontWeight: '600',
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
});
