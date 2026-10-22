import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquare, Bell, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';

export interface HomeHeaderProps {
  onPressNotifications?: () => void;
  onPressProfile?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  onPressNotifications,
  onPressProfile,
}) => {
  const { t } = useTranslation('home');

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.logoBadge}>
          <MessageSquare size={20} color={colors.surface} />
        </View>
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
          <User size={18} color={colors.surface} />
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
  },
});
