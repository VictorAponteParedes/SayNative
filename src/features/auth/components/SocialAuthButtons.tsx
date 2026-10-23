import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Apple } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export interface SocialAuthButtonsProps {
  onPressApple?: () => void;
  onPressGoogle?: () => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  onPressApple,
  onPressGoogle,
}) => {
  const { t } = useTranslation('auth');

  return (
    <View style={styles.container}>
      {/* Botón Apple */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressApple}
        style={styles.socialButton}
      >
        <Apple size={20} color={colors.textPrimary} style={styles.icon} />
        <AppText variant="body" style={styles.buttonText}>
          {t('register.appleButton')}
        </AppText>
      </TouchableOpacity>

      {/* Botón Google */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressGoogle}
        style={styles.socialButton}
      >
        <AppText style={styles.googleIconText}>G</AppText>
        <AppText variant="body" style={styles.buttonText}>
          {t('register.googleButton')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  icon: {
    marginRight: spacing.xs,
  },
  googleIconText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#4285F4',
    marginRight: spacing.xs,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
