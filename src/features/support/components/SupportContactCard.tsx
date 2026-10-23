import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquare, MessageCircle } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export interface SupportContactCardProps {
  onPressContact: () => void;
}

export const SupportContactCard: React.FC<SupportContactCardProps> = ({
  onPressContact,
}) => {
  const { t } = useTranslation('support');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Cabecera de la tarjeta: Icono y badge de disponibilidad */}
        <View style={styles.topRow}>
          <View style={styles.iconCircle}>
            <MessageCircle size={22} color={colors.actionDark} />
          </View>

          <View style={styles.responseBadge}>
            <View style={styles.onlineDot} />
            <AppText variant="caption" style={styles.responseBadgeText}>
              {t('contact.badge')}
            </AppText>
          </View>
        </View>

        {/* Título y subtítulo */}
        <AppText variant="h3" style={styles.title}>
          {t('contact.title')}
        </AppText>
        <AppText variant="bodySmall" style={styles.subtitle}>
          {t('contact.subtitle')}
        </AppText>

        {/* Botón CTA Enviar mensaje a Soporte */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressContact}
          style={styles.ctaButton}
        >
          <MessageSquare size={18} color={colors.white} style={styles.buttonIcon} />
          <AppText variant="button" style={styles.buttonText}>
            {t('contact.button')}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Footer de Versión y Políticas */}
      <AppText variant="caption" style={styles.footerText}>
        {t('footer.text')}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.actionLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  responseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.online,
    marginRight: 6,
  },
  responseBadgeText: {
    color: colors.actionDark,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 19,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.action,
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: spacing.md,
    shadowColor: colors.action,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: spacing.xs,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  footerText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: spacing.lg,
    fontSize: 12,
  },
});
