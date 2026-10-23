import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText, Avatar, CoinBadge } from '@/components';
import { useAuthStore } from '@/store/useAuthStore';

export interface UserProfileBarProps {
  onPressAddCoins?: () => void;
  onPressCoins?: () => void;
}

export const UserProfileBar: React.FC<UserProfileBarProps> = ({
  onPressAddCoins,
  onPressCoins,
}) => {
  const { t } = useTranslation('home');
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Avatar uri={user.avatarUrl} size={48} isOnline />
        <View style={styles.textContainer}>
          <AppText variant="bodyLarge" style={styles.greetingText}>
            {t('userProfile.greeting', { name: user.name })}
          </AppText>
          <AppText variant="bodySmall" color={colors.textSecondary}>
            {t('userProfile.subtitle')}
          </AppText>
        </View>
      </View>

      <View style={styles.coinsSection}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressCoins}
          disabled={!onPressCoins}
        >
          <CoinBadge amount={user.coins} variant="pill" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressAddCoins}
          style={styles.plusButton}
        >
          <Plus size={18} color={colors.surface} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  textContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  coinsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  plusButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
