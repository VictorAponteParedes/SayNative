import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '../../../theme';
import { AppText } from '../../../components';
import { useAuthStore } from '../../../store/useAuthStore';

export interface TeachingAvailabilityCardProps {
  onToggleAvailability?: (value: boolean) => void;
}

export const TeachingAvailabilityCard: React.FC<TeachingAvailabilityCardProps> = ({
  onToggleAvailability,
}) => {
  const { t } = useTranslation('home');
  const { isAvailableToTeach, nativeLanguage, earningRatePerMin } = useAuthStore(
    (state) => state.user
  );
  const setAvailableToTeach = useAuthStore((state) => state.setAvailableToTeach);

  const handleToggle = (value: boolean) => {
    setAvailableToTeach(value);
    onToggleAvailability?.(value);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Icono verde teal */}
      <View style={styles.iconBox}>
        <Volume2 size={22} color={colors.surface} />
      </View>

      {/* Textos centrales */}
      <View style={styles.infoContainer}>
        <AppText variant="bodyMedium" numberOfLines={1} style={styles.title}>
          {t('teacherAvailability.title', { language: nativeLanguage.name })}
        </AppText>
        <View style={styles.earningRow}>
          <AppText style={styles.coinIcon}>🪙</AppText>
          <AppText variant="caption" style={styles.subtitle}>
            {t('teacherAvailability.earningRate', { rate: earningRatePerMin })}
          </AppText>
        </View>
      </View>

      {/* Switch Toggle */}
      <Switch
        value={isAvailableToTeach}
        onValueChange={handleToggle}
        trackColor={{ false: colors.borderDark, true: colors.action }}
        thumbColor={colors.surface}
        ios_backgroundColor={colors.borderDark}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.action,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  title: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 14,
  },
  earningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 4,
  },
  coinIcon: {
    fontSize: 11,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
});
