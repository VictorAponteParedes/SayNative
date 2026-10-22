import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquarePlus, MoreVertical } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';

export interface ChatsHeaderProps {
  totalCount?: number;
  onPressNewChat?: () => void;
  onPressOptions?: () => void;
}

export const ChatsHeader: React.FC<ChatsHeaderProps> = ({
  totalCount = 4,
  onPressNewChat,
  onPressOptions,
}) => {
  const { t } = useTranslation('chats');

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <AppText variant="h1" style={styles.title}>
          {t('title')}
        </AppText>
        <View style={styles.badge}>
          <AppText variant="caption" style={styles.badgeText}>
            {totalCount}
          </AppText>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressNewChat}
          style={styles.iconButton}
        >
          <MessageSquarePlus size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressOptions}
          style={styles.iconButton}
        >
          <MoreVertical size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.primaryBgSubtle,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
