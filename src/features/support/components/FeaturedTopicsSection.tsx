import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CreditCard, Video, User, ChevronRight } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

export interface FeaturedTopicItem {
  id: string;
  titleKey: string;
  subtitleKey: string;
  icon: React.ReactNode;
  iconBgColor: string;
}

export interface FeaturedTopicsSectionProps {
  onPressTopic: (topicId: string) => void;
}

export const FeaturedTopicsSection: React.FC<FeaturedTopicsSectionProps> = ({
  onPressTopic,
}) => {
  const { t } = useTranslation('support');

  const topics: FeaturedTopicItem[] = [
    {
      id: 'coins_payments',
      titleKey: 'featuredTopics.coinsPaymentsTitle',
      subtitleKey: 'featuredTopics.coinsPaymentsSubtitle',
      icon: <CreditCard size={20} color={colors.primary} />,
      iconBgColor: colors.primaryBgSubtle,
    },
    {
      id: 'video_issues',
      titleKey: 'featuredTopics.videoIssuesTitle',
      subtitleKey: 'featuredTopics.videoIssuesSubtitle',
      icon: <Video size={20} color={colors.actionDark} />,
      iconBgColor: colors.actionLight,
    },
    {
      id: 'account_languages',
      titleKey: 'featuredTopics.accountLanguagesTitle',
      subtitleKey: 'featuredTopics.accountLanguagesSubtitle',
      icon: <User size={20} color={colors.primaryLight} />,
      iconBgColor: colors.surfaceHighlight,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Encabezado de la Sección */}
      <View style={styles.headerRow}>
        <AppText variant="h3" style={styles.sectionTitle}>
          {t('featuredTopics.title')}
        </AppText>
        <AppText variant="caption" style={styles.counterText}>
          {t('featuredTopics.count')}
        </AppText>
      </View>

      {/* Lista de Tarjetas */}
      <View style={styles.cardsList}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            activeOpacity={0.7}
            onPress={() => onPressTopic(topic.id)}
            style={styles.card}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: topic.iconBgColor },
              ]}
            >
              {topic.icon}
            </View>

            <View style={styles.textColumn}>
              <AppText variant="body" style={styles.topicTitle}>
                {t(topic.titleKey)}
              </AppText>
              <AppText variant="caption" style={styles.topicSubtitle}>
                {t(topic.subtitleKey)}
              </AppText>
            </View>

            <ChevronRight size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  counterText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  cardsList: {
    gap: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  textColumn: {
    flex: 1,
    paddingRight: spacing.xs,
  },
  topicTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  topicSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
});
