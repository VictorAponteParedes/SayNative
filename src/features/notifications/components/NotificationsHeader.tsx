import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, CheckCheck } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText, AppLogo } from '../../../components';
import { goBack } from '../../../navigation/NavigationRef';

export interface NotificationsHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
}

export const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead,
}) => {
  const { t } = useTranslation('notifications');

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={goBack}
          style={styles.backButton}
        >
          <ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <AppLogo size={28} />

        <AppText variant="h2" style={styles.title}>
          {t('header.title')}
        </AppText>

        {unreadCount > 0 && (
          <View style={styles.newBadge}>
            <AppText variant="caption" style={styles.newBadgeText}>
              {t('header.newBadge', { count: unreadCount })}
            </AppText>
          </View>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onMarkAllAsRead}
        style={styles.markReadButton}
      >
        <CheckCheck size={16} color={colors.primary} style={styles.checkIcon} />
        <AppText variant="bodySmall" style={styles.markReadText}>
          {t('header.markAllRead')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  newBadge: {
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 4,
  },
  newBadgeText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 11,
  },
  markReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryBgSubtle,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: 14,
  },
  checkIcon: {
    marginRight: 4,
  },
  markReadText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
});
