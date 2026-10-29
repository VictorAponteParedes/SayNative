import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Clock, MessageCircle, Star } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fonts } from '@/theme';
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
        <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
          <Clock size={19} color="#0284C7" strokeWidth={2.4} />
        </View>
        <AppText style={styles.statValue}>
          {t('stats.practicedValue', { hours: hoursPracticed, defaultValue: `${hoursPracticed} hrs` })}
        </AppText>
        <AppText style={styles.statLabel}>
          {t('stats.practiced', 'Practicadas')}
        </AppText>
      </View>

      {/* Llamadas / Sesiones */}
      <View style={styles.statCard}>
        <View style={[styles.iconCircle, { backgroundColor: '#FFE4E6' }]}>
          <MessageCircle size={19} color="#E11D48" strokeWidth={2.4} />
        </View>
        <AppText style={styles.statValue}>
          {t('stats.callsValue', { count: totalCalls, defaultValue: `${totalCalls} ses.` })}
        </AppText>
        <AppText style={styles.statLabel}>
          {t('stats.calls', 'Llamadas')}
        </AppText>
      </View>

      {/* Reputación / Reseñas */}
      <View style={styles.statCard}>
        <View style={[styles.iconCircle, { backgroundColor: '#CCFBF1' }]}>
          <Star size={19} color="#0D9488" fill="#0D9488" />
        </View>
        <AppText style={styles.statValue}>
          {t('stats.reputationValue', {
            rating: Number(rating).toFixed(1),
            defaultValue: Number(rating).toFixed(1),
          })}
        </AppText>
        <AppText style={styles.statLabel}>
          {t('stats.reputation', 'Reputación')}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm + 2,
    marginVertical: spacing.xs + 2,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs + 2,
  },
  statValue: {
    fontFamily: fonts.bold,
    fontSize: 17,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: fonts.medium,
    color: colors.textMuted,
    fontSize: 12,
  },
});
