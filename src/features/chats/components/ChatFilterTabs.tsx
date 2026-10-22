import React from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../componentes';
import { ChatFilterType } from '../types';

export interface ChatFilterTabsProps {
  activeFilter: ChatFilterType;
  totalCount: number;
  unreadCount: number;
  onSelectFilter: (filter: ChatFilterType) => void;
}

export const ChatFilterTabs: React.FC<ChatFilterTabsProps> = ({
  activeFilter,
  totalCount,
  unreadCount,
  onSelectFilter,
}) => {
  const { t } = useTranslation('chats');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* Tab: Todos */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSelectFilter('all')}
        style={[
          styles.tabPill,
          activeFilter === 'all' ? styles.activePill : styles.inactivePill,
        ]}
      >
        <AppText
          variant="bodySmall"
          style={[
            styles.tabText,
            activeFilter === 'all' ? styles.activeText : styles.inactiveText,
          ]}
        >
          {t('filters.all')}
        </AppText>
        <View
          style={[
            styles.countBadge,
            activeFilter === 'all' ? styles.activeBadge : styles.inactiveBadge,
          ]}
        >
          <AppText
            variant="caption"
            style={[
              styles.badgeText,
              activeFilter === 'all' ? styles.activeBadgeText : styles.inactiveBadgeText,
            ]}
          >
            {totalCount}
          </AppText>
        </View>
      </TouchableOpacity>

      {/* Tab: No leídos */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSelectFilter('unread')}
        style={[
          styles.tabPill,
          activeFilter === 'unread' ? styles.activePill : styles.inactivePill,
        ]}
      >
        <AppText
          variant="bodySmall"
          style={[
            styles.tabText,
            activeFilter === 'unread' ? styles.activeText : styles.inactiveText,
          ]}
        >
          {t('filters.unread')}
        </AppText>
        {unreadCount > 0 && (
          <View style={styles.unreadRedBadge}>
            <AppText variant="caption" style={styles.unreadRedBadgeText}>
              {unreadCount}
            </AppText>
          </View>
        )}
      </TouchableOpacity>

      {/* Tab: Videollamadas */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onSelectFilter('videocalls')}
        style={[
          styles.tabPill,
          activeFilter === 'videocalls' ? styles.activePill : styles.inactivePill,
        ]}
      >
        <Video
          size={16}
          color={activeFilter === 'videocalls' ? colors.surface : colors.primary}
        />
        <AppText
          variant="bodySmall"
          style={[
            styles.tabText,
            activeFilter === 'videocalls' ? styles.activeText : styles.inactiveText,
          ]}
        >
          {t('filters.videocalls')}
        </AppText>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  tabPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: 6,
  },
  activePill: {
    backgroundColor: colors.primary,
  },
  inactivePill: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabText: {
    fontWeight: '700',
    fontSize: 13,
  },
  activeText: {
    color: colors.textWhite,
  },
  inactiveText: {
    color: colors.textPrimary,
  },
  countBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  inactiveBadge: {
    backgroundColor: '#EEF2FF',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  activeBadgeText: {
    color: colors.textWhite,
  },
  inactiveBadgeText: {
    color: colors.primary,
  },
  unreadRedBadge: {
    backgroundColor: '#DC2626',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadRedBadgeText: {
    color: colors.textWhite,
    fontSize: 11,
    fontWeight: '700',
  },
});
