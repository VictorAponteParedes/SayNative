import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText, AppLogo } from '../../../components';

export interface ProfileHeaderProps {
  onPressNotifications?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onPressNotifications,
}) => {
  const { t } = useTranslation('profile');

  const handleNotifications = () => {
    if (onPressNotifications) {
      onPressNotifications();
    } else {
      Alert.alert(t('account.notifications'), 'No tienes notificaciones pendientes.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <AppLogo size={36} />
        <AppText variant="h2" style={styles.title}>
          {t('header.title')}
        </AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleNotifications}
        style={styles.iconButton}
      >
        <Bell size={22} color={colors.textPrimary} />
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
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
});
