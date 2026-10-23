import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { HelpCircle, ChevronRight, ShieldCheck } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export interface HistorySupportFooterProps {
  onPressSupport?: () => void;
}

export const HistorySupportFooter: React.FC<HistorySupportFooterProps> = ({
  onPressSupport,
}) => {
  const { t } = useTranslation('coins');

  const handleSupport = () => {
    if (onPressSupport) {
      onPressSupport();
    } else {
      Alert.alert(
        t('history.support.supportTitle'),
        t('history.support.supportMessage')
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Banner de Contactar Soporte */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSupport}
        style={styles.supportBanner}
      >
        <View style={styles.iconCircle}>
          <HelpCircle size={18} color={colors.primary} />
        </View>

        <AppText variant="bodySmall" style={styles.bannerText}>
          {t('history.support.banner')}
        </AppText>

        <ChevronRight size={18} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Footer de Seguridad y Cifrado */}
      <View style={styles.securityRow}>
        <ShieldCheck size={14} color={colors.textMuted} style={styles.shieldIcon} />
        <AppText variant="caption" style={styles.securityText}>
          {t('history.support.accountId')}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  supportBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryBgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  bannerText: {
    flex: 1,
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 13,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldIcon: {
    marginRight: 6,
  },
  securityText: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
  },
});
