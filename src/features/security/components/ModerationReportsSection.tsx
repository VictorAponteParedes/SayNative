import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Flag, ChevronRight, ShieldAlert, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';

export interface ModerationReportsSectionProps {
  onPressReportsStatus: () => void;
  onDeleteAccount: () => void;
}

export const ModerationReportsSection: React.FC<
  ModerationReportsSectionProps
> = ({ onPressReportsStatus, onDeleteAccount }) => {
  const { t } = useTranslation('security');

  return (
    <View style={styles.container}>
      <AppText variant="caption" style={styles.sectionTitle}>
        {t('moderation.sectionTitle')}
      </AppText>

      {/* Tarjeta: Estado de mis reportes */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressReportsStatus}
        style={styles.reportStatusCard}
      >
        <View style={styles.flagIconCircle}>
          <Flag size={18} color={colors.primary} />
        </View>

        <View style={styles.textColumn}>
          <View style={styles.titleBadgeRow}>
            <AppText variant="body" style={styles.cardTitle}>
              {t('moderation.reportsStatusTitle')}
            </AppText>
            <View style={styles.inReviewBadge}>
              <AppText variant="caption" style={styles.inReviewText}>
                {t('moderation.inReviewBadge')}
              </AppText>
            </View>
          </View>
          <AppText variant="caption" style={styles.cardDesc}>
            {t('moderation.reportsStatusDesc')}
          </AppText>
        </View>

        <ChevronRight size={18} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Tarjeta Informativa de Pautas de App Store y Google Play */}
      <View style={styles.complianceCard}>
        <ShieldAlert size={18} color={colors.textSecondary} style={styles.shieldIcon} />
        <AppText variant="caption" style={styles.complianceText}>
          {t('moderation.complianceText')}
        </AppText>
      </View>

      {/* Botón de Zona de Peligro: Eliminar Cuenta */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onDeleteAccount}
        style={styles.deleteButton}
      >
        <Trash2 size={16} color={colors.dangerDark} style={styles.trashIcon} />
        <AppText variant="bodySmall" style={styles.deleteButtonText}>
          {t('moderation.deleteAccountButton')}
        </AppText>
      </TouchableOpacity>

      <AppText variant="caption" style={styles.deleteWarningText}>
        {t('moderation.deleteAccountWarning')}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  reportStatusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.sm,
  },
  flagIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primaryBgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textColumn: {
    flex: 1,
    marginRight: spacing.xs,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  cardTitle: {
    fontWeight: '800',
    color: colors.textPrimary,
    fontSize: 14,
  },
  inReviewBadge: {
    backgroundColor: colors.dangerBgSubtle,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: 8,
  },
  inReviewText: {
    color: colors.dangerDark,
    fontSize: 11,
    fontWeight: '700',
  },
  cardDesc: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  complianceCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shieldIcon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  complianceText: {
    flex: 1,
    color: colors.textSecondary,
    lineHeight: 18,
    fontSize: 11,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dangerBgSubtle,
    borderRadius: 14,
    paddingVertical: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.dangerLight,
  },
  trashIcon: {
    marginRight: 8,
  },
  deleteButtonText: {
    color: colors.dangerDark,
    fontWeight: '800',
    fontSize: 14,
  },
  deleteWarningText: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
    paddingHorizontal: spacing.md,
  },
});
