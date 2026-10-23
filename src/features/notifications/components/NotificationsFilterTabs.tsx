import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Phone, Coins, Users } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';
import type { NotificationCategory } from '../types';

export interface NotificationsFilterTabsProps {
  activeFilter: NotificationCategory;
  onSelectFilter: (filter: NotificationCategory) => void;
  totalCount: number;
}

interface FilterTabOption {
  key: NotificationCategory;
  labelKey: string;
  renderIcon?: (active: boolean) => React.ReactNode;
  showBadge?: boolean;
}

export const NotificationsFilterTabs: React.FC<NotificationsFilterTabsProps> = ({
  activeFilter,
  onSelectFilter,
  totalCount,
}) => {
  const { t } = useTranslation('notifications');

  const tabs: FilterTabOption[] = [
    {
      key: 'all',
      labelKey: 'filters.all',
      showBadge: true,
    },
    {
      key: 'calls',
      labelKey: 'filters.calls',
      renderIcon: (active) => (
        <Phone size={14} color={active ? colors.surface : colors.textSecondary} />
      ),
    },
    {
      key: 'coins',
      labelKey: 'filters.coins',
      renderIcon: (active) => (
        <Coins size={14} color={active ? colors.surface : colors.coin} />
      ),
    },
    {
      key: 'social',
      labelKey: 'filters.social',
      renderIcon: (active) => (
        <Users size={14} color={active ? colors.surface : colors.textSecondary} />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.7}
              onPress={() => onSelectFilter(tab.key)}
              style={[
                styles.tabPill,
                isActive ? styles.tabPillActive : styles.tabPillInactive,
              ]}
            >
              {tab.renderIcon && (
                <View style={styles.tabIconWrapper}>
                  {tab.renderIcon(isActive)}
                </View>
              )}

              <AppText
                variant="bodySmall"
                style={[
                  styles.tabText,
                  isActive ? styles.tabTextActive : styles.tabTextInactive,
                ]}
              >
                {t(tab.labelKey)}
              </AppText>

              {tab.showBadge && (
                <View
                  style={[
                    styles.countBadge,
                    isActive ? styles.countBadgeActive : styles.countBadgeInactive,
                  ]}
                >
                  <AppText
                    variant="caption"
                    style={[
                      styles.countBadgeText,
                      isActive
                        ? styles.countBadgeTextActive
                        : styles.countBadgeTextInactive,
                    ]}
                  >
                    {totalCount}
                  </AppText>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs + 2,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
  },
  tabPillActive: {
    backgroundColor: colors.primary,
  },
  tabPillInactive: {
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabIconWrapper: {
    marginRight: 6,
  },
  tabText: {
    fontWeight: '700',
    fontSize: 13,
  },
  tabTextActive: {
    color: colors.surface,
  },
  tabTextInactive: {
    color: colors.textSecondary,
  },
  countBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  countBadgeActive: {
    backgroundColor: colors.primaryDark,
  },
  countBadgeInactive: {
    backgroundColor: colors.borderDark,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  countBadgeTextActive: {
    color: colors.surface,
  },
  countBadgeTextInactive: {
    color: colors.textPrimary,
  },
});
