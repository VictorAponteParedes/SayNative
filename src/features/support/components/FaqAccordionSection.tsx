import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { ChevronDown, Flame } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface FaqItemData {
  id: string;
  questionKey: string;
  answerKey: string;
}

export const FaqAccordionSection: React.FC = () => {
  const { t } = useTranslation('support');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqItems: FaqItemData[] = [
    {
      id: 'faq1',
      questionKey: 'faq.q1',
      answerKey: 'faq.a1',
    },
    {
      id: 'faq2',
      questionKey: 'faq.q2',
      answerKey: 'faq.a2',
    },
    {
      id: 'faq3',
      questionKey: 'faq.q3',
      answerKey: 'faq.a3',
    },
    {
      id: 'faq4',
      questionKey: 'faq.q4',
      answerKey: 'faq.a4',
    },
  ];

  const handleToggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con Badge Populares */}
      <View style={styles.headerRow}>
        <View style={styles.titleColumn}>
          <AppText variant="h3" style={styles.sectionTitle}>
            {t('faq.title')}
          </AppText>
          <AppText variant="caption" style={styles.sectionSubtitle}>
            {t('faq.subtitle')}
          </AppText>
        </View>

        <View style={styles.popularBadge}>
          <Flame size={14} color={colors.danger} style={styles.badgeIcon} />
          <AppText variant="caption" style={styles.badgeText}>
            {t('faq.badge')}
          </AppText>
        </View>
      </View>

      {/* Lista de Acordeones */}
      <View style={styles.faqList}>
        {faqItems.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <View key={item.id} style={styles.faqCard}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleToggle(item.id)}
                style={styles.questionRow}
              >
                <AppText variant="body" style={styles.questionText}>
                  {t(item.questionKey)}
                </AppText>
                <View
                  style={[
                    styles.chevronWrapper,
                    isExpanded && styles.chevronWrapperRotated,
                  ]}
                >
                  <ChevronDown size={20} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.answerContainer}>
                  <View style={styles.divider} />
                  <AppText variant="bodySmall" style={styles.answerText}>
                    {t(item.answerKey)}
                  </AppText>
                </View>
              )}
            </View>
          );
        })}
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  titleColumn: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dangerLight,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: 16,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    color: colors.dangerDark,
    fontSize: 12,
    fontWeight: '700',
  },
  faqList: {
    gap: spacing.sm,
  },
  faqCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 20,
    paddingRight: spacing.sm,
  },
  chevronWrapper: {
    transform: [{ rotate: '0deg' }],
  },
  chevronWrapperRotated: {
    transform: [{ rotate: '180deg' }],
  },
  answerContainer: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.xs,
  },
  answerText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
