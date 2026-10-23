import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Clock, MessageSquare, Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export interface ProfileStatsRowProps {
  hoursPracticed: number;
  totalCalls: number;
  rating: number;
}

export const ProfileStatsRow: React.FC<ProfileStatsRowProps> = ({
  hoursPracticed,
  totalCalls,
  rating,
}) => {
  const { t } = useTranslation('profile');

  return (
    <View style={styles.container}>
      {/* Horas Practicadas */}
      <View style={styles.statCard}>
        <View style={[styles.iconCircle, { backgroundColor: colors.primaryBgSubtle }]}>
          <Clock size={18} color={colors.primary} />
        </View>
        <AppText variant="h3" style={styles.statValue}>
          {t('stats.practicedValue', { hours: hoursPracticed })}
        </AppText>
        <AppText variant="caption" style={styles.statLabel}>
          {t('stats.practiced')}
        </AppText>
      </View>

      {/* Llamadas / Sesiones */}
      <View style={styles.statCard}>
        <View style={[styles.iconCircle, { backgroundColor: colors.dangerBgSubtle }]}>
          <MessageSquare size={18} color={colors.danger} />
        </View>
        <AppText variant="h3" style={styles.statValue}>
          {t('stats.callsValue', { count: totalCalls })}
        </AppText>
        <AppText variant="caption" style={styles.statLabel}>
          {t('stats.calls')}
        </AppText>
      </View>

      {/* Reputación / Reseñas */}
      <View style={styles.statCard}>
        <View style={[styles.iconCircle, { backgroundColor: colors.actionLight }]}>
          <Star size={18} color={colors.actionDark} fill={colors.actionDark} />
        </View>
        <AppText variant="h3" style={styles.statValue}>
          {t('stats.reputationValue', { rating })}
        </AppText>
        <AppText variant="caption" style={styles.statLabel}>
          {t('stats.reputation')}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    marginVertical: spacing.xs,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
