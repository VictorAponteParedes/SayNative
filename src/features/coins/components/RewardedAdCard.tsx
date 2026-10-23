import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Clapperboard, Play } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText } from '@/components';

export interface RewardedAdCardProps {
  availableCount: number;
  totalCount: number;
  onPressWatch: () => void;
}

export const RewardedAdCard: React.FC<RewardedAdCardProps> = ({
  availableCount,
  totalCount,
  onPressWatch,
}) => {
  const { t } = useTranslation('coins');

  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Clapperboard size={20} color={colors.action} />
      </View>

      <View style={styles.infoWrapper}>
        <View style={styles.titleRow}>
          <AppText variant="bodyLarge" style={styles.title}>
            {t('rewardedAd.title')}
          </AppText>
          <View style={styles.badgeFree}>
            <AppText variant="caption" style={styles.badgeFreeText}>
              {t('rewardedAd.badgeFree')}
            </AppText>
          </View>
        </View>

        <AppText variant="caption" style={styles.subtitle}>
          {t('rewardedAd.available', {
            available: availableCount,
            total: totalCount,
          })}
        </AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressWatch}
        style={styles.watchButton}
      >
        <Play size={13} color={colors.action} fill={colors.action} />
        <AppText variant="caption" style={styles.watchButtonText}>
          {t('rewardedAd.button')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHighlight,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.actionLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  title: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 14,
  },
  badgeFree: {
    backgroundColor: colors.action,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  badgeFreeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 4,
  },
  watchButtonText: {
    color: colors.action,
    fontWeight: '800',
    fontSize: 13,
  },
});
