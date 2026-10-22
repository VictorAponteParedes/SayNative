import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../../theme';
import { AppText } from '../../../../componentes';

export interface RecommendedTopicsRowProps {
  onSelectTopic: (topic: string) => void;
}

export const RecommendedTopicsRow: React.FC<RecommendedTopicsRowProps> = ({
  onSelectTopic,
}) => {
  const { t } = useTranslation('chats');

  const topics = [
    { id: '1', emoji: '🍜', label: t('privateChat.topics.gastronomy') },
    { id: '2', emoji: '✈️', label: t('privateChat.topics.travelCulture') },
    { id: '3', emoji: '💬', label: t('privateChat.topics.idioms') },
  ];

  return (
    <View style={styles.container}>
      <AppText variant="caption" style={styles.label}>
        {t('privateChat.recommendedTopics')}
      </AppText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {topics.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => onSelectTopic(`${item.emoji} ${item.label}`)}
            style={styles.topicPill}
          >
            <AppText style={styles.emoji}>{item.emoji}</AppText>
            <AppText variant="caption" style={styles.topicText}>
              {item.label}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  label: {
    color: colors.textSecondary,
    marginBottom: spacing.xs + 2,
    fontSize: 12,
  },
  scrollList: {
    gap: spacing.sm,
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 5,
  },
  emoji: {
    fontSize: 13,
  },
  topicText: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 12,
  },
});
