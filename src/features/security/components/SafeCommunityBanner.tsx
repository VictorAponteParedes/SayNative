import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ShieldCheck, ArrowRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';

export interface SafeCommunityBannerProps {
  onPressGuidelines: () => void;
}

export const SafeCommunityBanner: React.FC<SafeCommunityBannerProps> = ({
  onPressGuidelines,
}) => {
  const { t } = useTranslation('security');

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          <ShieldCheck size={22} color={colors.surface} />
        </View>

        <View style={styles.headerTextColumn}>
          <View style={styles.titleRow}>
            <AppText variant="h3" style={styles.title}>
              {t('safeCommunity.title')}
            </AppText>
            <View style={styles.shieldBadge}>
              <AppText variant="caption" style={styles.shieldBadgeText}>
                {t('safeCommunity.badge')}
              </AppText>
            </View>
          </View>
        </View>
      </View>

      <AppText variant="caption" style={styles.description}>
        {t('safeCommunity.description')}
      </AppText>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressGuidelines}
        style={styles.linkRow}
      >
        <AppText variant="bodySmall" style={styles.linkText}>
          {t('safeCommunity.guidelinesLink')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.actionLight,
    borderRadius: 18,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.action,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  headerTextColumn: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.actionDark,
  },
  shieldBadge: {
    backgroundColor: colors.actionDark,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: 8,
  },
  shieldBadgeText: {
    color: colors.surface,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  description: {
    color: colors.textDarkTeal,
    lineHeight: 18,
    fontSize: 12,
    marginTop: 4,
    marginBottom: spacing.sm,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    color: colors.actionDark,
    fontWeight: '800',
    fontSize: 13,
  },
});
