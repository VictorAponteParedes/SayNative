import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { EyeOff, Star, Sparkles } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';
import type { PrivacySettings } from '../types';

export interface PrivacySettingsSectionProps {
  settings: PrivacySettings;
  onToggle: (key: keyof PrivacySettings, value: boolean) => void;
}

export const PrivacySettingsSection: React.FC<PrivacySettingsSectionProps> = ({
  settings,
  onToggle,
}) => {
  const { t } = useTranslation('security');

  return (
    <View style={styles.container}>
      {/* Encabezado con badge Protección Activa */}
      <View style={styles.sectionHeaderRow}>
        <AppText variant="caption" style={styles.sectionTitle}>
          {t('privacy.sectionTitle')}
        </AppText>
        <View style={styles.protectionPill}>
          <View style={styles.protectionDot} />
          <AppText variant="caption" style={styles.protectionText}>
            {t('privacy.activeProtection')}
          </AppText>
        </View>
      </View>

      <View style={styles.card}>
        {/* Item 1: Ocultar mi edad */}
        <View style={styles.settingRow}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryBgSubtle }]}>
            <EyeOff size={18} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.itemTitle}>
              {t('privacy.hideAgeTitle')}
            </AppText>
            <AppText variant="caption" style={styles.itemDesc}>
              {t('privacy.hideAgeDesc')}
            </AppText>
          </View>
          <Switch
            value={settings.hideAge}
            onValueChange={(val) => onToggle('hideAge', val)}
            trackColor={{ false: colors.borderDark, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>

        <View style={styles.divider} />

        {/* Item 2: Filtro de reputación para llamadas */}
        <View style={styles.settingRow}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryBgSubtle }]}>
            <Star size={18} color={colors.primary} />
          </View>
          <View style={styles.textColumn}>
            <AppText variant="body" style={styles.itemTitle}>
              {t('privacy.reputationFilterTitle')}
            </AppText>
            <AppText variant="caption" style={styles.itemDesc}>
              {t('privacy.reputationFilterDesc')}
            </AppText>
          </View>
          <Switch
            value={settings.reputationFilter}
            onValueChange={(val) => onToggle('reputationFilter', val)}
            trackColor={{ false: colors.borderDark, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>

        <View style={styles.divider} />

        {/* Item 3: Protección anti-shock */}
        <View style={styles.settingRow}>
          <View style={[styles.iconCircle, { backgroundColor: colors.dangerBgSubtle }]}>
            <Sparkles size={18} color={colors.danger} />
          </View>
          <View style={styles.textColumn}>
            <View style={styles.titleBadgeRow}>
              <AppText variant="body" style={styles.itemTitle}>
                {t('privacy.antiShockTitle')}
              </AppText>
              <View style={styles.recommendedBadge}>
                <AppText variant="caption" style={styles.recommendedText}>
                  {t('privacy.recommendedBadge')}
                </AppText>
              </View>
            </View>
            <AppText variant="caption" style={styles.itemDesc}>
              {t('privacy.antiShockDesc')}
            </AppText>
          </View>
          <Switch
            value={settings.antiShock}
            onValueChange={(val) => onToggle('antiShock', val)}
            trackColor={{ false: colors.borderDark, true: colors.primary }}
            thumbColor={colors.surface}
          />
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  protectionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.actionLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 12,
  },
  protectionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.online,
    marginRight: 4,
  },
  protectionText: {
    color: colors.actionDark,
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textColumn: {
    flex: 1,
    marginRight: spacing.sm,
  },
  itemTitle: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 2,
  },
  itemDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  recommendedBadge: {
    backgroundColor: colors.dangerBgSubtle,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 1,
    borderRadius: 6,
  },
  recommendedText: {
    color: colors.dangerDark,
    fontSize: 10,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
});
