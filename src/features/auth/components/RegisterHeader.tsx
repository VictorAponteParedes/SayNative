import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText, AppLogo } from '../../../components';

export interface RegisterHeaderProps {
  onBack: () => void;
  onPressProfile?: () => void;
}

export const RegisterHeader: React.FC<RegisterHeaderProps> = ({
  onBack,
  onPressProfile,
}) => {
  const { t } = useTranslation('auth');

  return (
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onBack}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        style={styles.backButton}
      >
        <ChevronLeft size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.titleRow}>
        <AppLogo size={24} />
        <AppText variant="h3" style={styles.headerTitle}>
          {t('register.headerTitle')}
        </AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressProfile}
        style={styles.userCircle}
      >
        <User size={18} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  userCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
