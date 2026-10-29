import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Headphones,
  Search,
  SlidersHorizontal,
  LifeBuoy,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fonts } from '@/theme';
import { AppText } from '@/components';

export interface SupportHeroCardProps {
  searchQuery: string;
  onChangeSearchQuery: (text: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  onPressFilter?: () => void;
}

export const SupportHeroCard: React.FC<SupportHeroCardProps> = ({
  searchQuery,
  onChangeSearchQuery,
  selectedCategory,
  onSelectCategory,
  onPressFilter,
}) => {
  const { t } = useTranslation('support');

  const categories = [
    { id: 'coins', label: t('hero.categories.coins'), emoji: '🪙' },
    { id: 'calls', label: t('hero.categories.calls'), emoji: '📹' },
    { id: 'languages', label: t('hero.categories.languages'), emoji: '🗣️' },
    { id: 'payments', label: t('hero.categories.payments'), emoji: '💳' },
  ];

  return (
    <View style={styles.card}>
      {/* Fila superior: Badge y Auriculares */}
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <LifeBuoy size={14} color={colors.primary} style={styles.badgeIcon} />
          <AppText variant="caption" style={styles.badgeText}>
            {t('hero.badge')}
          </AppText>
        </View>

        <View style={styles.headphonesCircle}>
          <Headphones size={22} color={colors.white} />
        </View>
      </View>

      {/* Título Principal y Subtítulo */}
      <AppText variant="h2" style={styles.title}>
        {t('hero.title')}
      </AppText>
      <AppText variant="bodySmall" style={styles.subtitle}>
        {t('hero.subtitle')}
      </AppText>

      {/* Input de Búsqueda */}
      <View style={styles.searchContainer}>
        <Search size={18} color={colors.textMuted} style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          onChangeText={onChangeSearchQuery}
          placeholder={t('hero.searchPlaceholder')}
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
        {onPressFilter && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPressFilter}
            style={styles.filterButton}
          >
            <SlidersHorizontal size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Pills de Categorías Rápidas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.7}
              onPress={() => onSelectCategory(cat.id)}
              style={[
                styles.categoryPill,
                isSelected && styles.categoryPillSelected,
              ]}
            >
              <AppText style={styles.categoryEmoji}>{cat.emoji}</AppText>
              <AppText
                variant="bodySmall"
                style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextSelected,
                ]}
              >
                {cat.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryBgSubtle,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeIcon: {
    marginRight: 5,
  },
  badgeText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  headphonesCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    lineHeight: 28,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 20,
    fontSize: 13,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  searchIcon: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoriesScroll: {
    flexDirection: 'row',
    gap: spacing.xs + 2,
    marginTop: spacing.md,
    paddingBottom: 2,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  categoryPillSelected: {
    backgroundColor: colors.primaryBgSubtle,
    borderColor: colors.primary,
  },
  categoryEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  categoryTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
});
