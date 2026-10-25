import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText, AppLogo, Avatar } from '@/components';
import { useAuthStore } from '@/store/useAuthStore';

export interface HomeHeaderProps {
  onPressNotifications?: () => void;
  onPressProfile?: () => void;
  avatarUrl?: string;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onPressNotifications,
  onPressProfile,
  avatarUrl,
}) => {
  const { t } = useTranslation('home');
  const user = useAuthStore((s) => s.user);
  const currentAvatarUrl = avatarUrl || user?.avatarUrl;

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <AppLogo size={36} />
        <AppText variant="h2" style={styles.title}>
          {t('header.title')}
        </AppText>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressNotifications}
          style={styles.iconButton}
        >
          <Bell size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressProfile}
          style={styles.avatarButton}
        >
          {currentAvatarUrl ? (
            <Avatar uri={currentAvatarUrl} name={user?.name} size={36} />
          ) : (
            <User size={18} color={colors.surface} />
          )}
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default HomeHeader;
