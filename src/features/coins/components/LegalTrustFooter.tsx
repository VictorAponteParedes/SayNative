import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ShieldCheck, Smartphone, Award } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../components';

export const LegalTrustFooter: React.FC = () => {
  const { t } = useTranslation('coins');

  const handleRestore = () => {
    Alert.alert(t('legal.restore'), 'Buscando compras anteriores en tu cuenta de App Store / Play Store...');
  };

  const handleTerms = () => {
    Alert.alert(t('legal.terms'), 'Abriendo Términos y Condiciones del servicio.');
  };

  const handlePrivacy = () => {
    Alert.alert(t('legal.privacy'), 'Abriendo Política de Privacidad.');
  };

  return (
    <View style={styles.container}>
      {/* Insignias de confianza */}
      <View style={styles.trustBadgesRow}>
        <View style={styles.trustItem}>
          <ShieldCheck size={16} color={colors.textSecondary} />
          <AppText variant="caption" style={styles.trustText}>
            {t('trust.ssl')}
          </AppText>
        </View>

        <AppText style={styles.separator}>·</AppText>

        <View style={styles.trustItem}>
          <Smartphone size={16} color={colors.textSecondary} />
          <AppText variant="caption" style={styles.trustText}>
            {t('trust.iap')}
          </AppText>
        </View>

        <AppText style={styles.separator}>·</AppText>

        <View style={styles.trustItem}>
          <Award size={16} color={colors.textSecondary} />
          <AppText variant="caption" style={styles.trustText}>
            {t('trust.guaranteed')}
          </AppText>
        </View>
      </View>

      {/* Texto de descargo legal */}
      <AppText variant="caption" style={styles.disclaimerText}>
        {t('legal.disclaimer')}
      </AppText>

      {/* Enlaces de pie de página */}
      <View style={styles.linksRow}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleRestore}>
          <AppText variant="caption" style={styles.linkText}>
            {t('legal.restore')}
          </AppText>
        </TouchableOpacity>

        <AppText style={styles.separator}>·</AppText>

        <TouchableOpacity activeOpacity={0.7} onPress={handleTerms}>
          <AppText variant="caption" style={styles.linkText}>
            {t('legal.terms')}
          </AppText>
        </TouchableOpacity>

        <AppText style={styles.separator}>·</AppText>

        <TouchableOpacity activeOpacity={0.7} onPress={handlePrivacy}>
          <AppText variant="caption" style={styles.linkText}>
            {t('legal.privacy')}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  trustBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  separator: {
    color: colors.textMuted,
    fontSize: 14,
  },
  disclaimerText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: spacing.lg,
  },
  linksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
});
