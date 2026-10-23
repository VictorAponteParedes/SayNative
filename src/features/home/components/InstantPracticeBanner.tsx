import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText } from '@/components';

export interface InstantPracticeBannerProps {
  onPressStartSearch: () => void;
  ratePerMinute?: number;
}

export const InstantPracticeBanner: React.FC<InstantPracticeBannerProps> = ({
  onPressStartSearch,
  ratePerMinute = 10,
}) => {
  const { t } = useTranslation('home');

  return (
    <View style={styles.cardContainer}>
      {/* Badges superiores */}
      <View style={styles.topBadgesRow}>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <AppText variant="caption" style={styles.liveText}>
            {t('instantPractice.badgeLive')}
          </AppText>
        </View>

        <View style={styles.rateBadge}>
          <AppText style={styles.coinIcon}>🪙</AppText>
          <AppText variant="caption" style={styles.rateText}>
            {t('instantPractice.badgeRate', { rate: ratePerMinute })}
          </AppText>
        </View>
      </View>

      {/* Contenido principal */}
      <View style={styles.contentSection}>
        <AppText variant="h2" style={styles.title}>
          {t('instantPractice.title')}
        </AppText>
        <AppText variant="bodySmall" style={styles.subtitle}>
          {t('instantPractice.subtitle')}
        </AppText>
      </View>

      {/* Botón CTA Blanco */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressStartSearch}
        style={styles.ctaButton}
      >
        <Video size={20} color={colors.primary} fill={colors.primary} />
        <AppText variant="button" style={styles.ctaButtonText}>
          {t('instantPractice.ctaButton')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: spacing.xl,
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  topBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.online,
  },
  liveText: {
    color: colors.textWhite,
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  rateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    gap: 4,
  },
  coinIcon: {
    fontSize: 12,
  },
  rateText: {
    color: colors.textWhite,
    fontWeight: '600',
    fontSize: 11,
  },
  contentSection: {
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.textWhite,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    lineHeight: 18,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 14,
    borderRadius: borderRadius.md,
    gap: 8,
  },
  ctaButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
});
