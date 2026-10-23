import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { Banknote, Lock } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export interface TeachingModeCardProps {
  isAvailable: boolean;
  onToggle: (value: boolean) => void;
  ratePerMin: number;
  languageName: string;
}

export const TeachingModeCard: React.FC<TeachingModeCardProps> = ({
  isAvailable,
  onToggle,
  ratePerMin,
  languageName,
}) => {
  const { t } = useTranslation('profile');

  return (
    <View style={styles.container}>
      <AppText variant="h3" style={styles.sectionTitle}>
        {t('teachingMode.sectionTitle')}
      </AppText>

      <View style={styles.card}>
        {/* Toggle Superior */}
        <View style={styles.switchRow}>
          <AppText variant="body" style={styles.cardTitle}>
            {t('teachingMode.cardTitle')}
          </AppText>
          <Switch
            value={isAvailable}
            onValueChange={onToggle}
            trackColor={{ false: colors.borderDark, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>

        <AppText variant="caption" style={styles.cardSubtitle}>
          {t('teachingMode.cardSubtitle', { language: languageName })}
        </AppText>

        {/* Sub-tarjeta de Tarifa */}
        <View style={styles.rateCard}>
          <View style={styles.rateLeft}>
            <Banknote size={18} color={colors.primary} style={styles.rateIcon} />
            <AppText variant="bodySmall" style={styles.rateLabel}>
              {t('teachingMode.rateLabel')}
            </AppText>
          </View>

          <View style={styles.ratePill}>
            <AppText style={styles.coinEmoji}>🪙</AppText>
            <AppText variant="bodySmall" style={styles.rateValueText}>
              {t('teachingMode.rateValue', { rate: `${ratePerMin}` })}
            </AppText>
            <Lock size={12} color={colors.textSecondary} style={styles.lockIcon} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 15,
  },
  cardSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: spacing.md,
  },
  rateCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryBgSubtle,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  rateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateIcon: {
    marginRight: 8,
  },
  rateLabel: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  ratePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  coinEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  rateValueText: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 12,
  },
  lockIcon: {
    marginLeft: 6,
  },
});
