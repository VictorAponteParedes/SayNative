import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '../../../../theme';
import { AppText } from '../../../../componentes';

export interface LearningContextBannerProps {
  languageName?: string;
  onPressTopic?: () => void;
}

export const LearningContextBanner: React.FC<LearningContextBannerProps> = ({
  languageName = 'Inglés',
  onPressTopic,
}) => {
  const { t } = useTranslation('chats');

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Lightbulb size={18} color="#E11D48" />
      </View>

      <View style={styles.textContainer}>
        <AppText variant="bodySmall" numberOfLines={1} style={styles.text}>
          Estás practicando <AppText style={styles.highlightText}>{languageName}</AppText>. ¡Pide correcciones!
        </AppText>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressTopic}
        style={styles.topicButton}
      >
        <AppText variant="caption" style={styles.topicText}>
          {t('privateChat.topic')}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  text: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  highlightText: {
    fontWeight: '800',
    color: colors.primary,
  },
  topicButton: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: 12,
  },
  topicText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
});
