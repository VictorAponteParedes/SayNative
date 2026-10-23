import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText } from '@/components';

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
        <Lightbulb size={18} color={colors.waveformRed} />
      </View>

      <View style={styles.textContainer}>
        <AppText variant="bodySmall" numberOfLines={1} style={styles.text}>
          {t('privateChat.practicingPrefix')}
          <AppText style={styles.highlightText}>{languageName}</AppText>
          {t('privateChat.practicingSuffix')}
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
    backgroundColor: colors.surfaceHighlight,
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
    backgroundColor: colors.dangerBgSubtle,
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
    backgroundColor: colors.borderHighlight,
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
