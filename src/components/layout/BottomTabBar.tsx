import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Home, Compass, MessageSquare, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../theme';
import { AppText } from '../ui/AppText';
import { navigate } from '../../navigation/NavigationRef';
import { Routes } from '../../navigation/routes';
import { useAppConfigStore } from '../../store/useAppConfigStore';

export type TabKey = 'Inicio' | 'Explorar' | 'Chats' | 'Perfil';

interface TabItem {
  key: TabKey;
  labelKey: string;
  route?: keyof typeof Routes.App;
  badge?: number;
  icon: (active: boolean) => React.ReactNode;
}

const TABS: TabItem[] = [
  {
    key: 'Inicio',
    labelKey: 'tabs.home',
    route: 'Home',
    icon: (active) => (
      <Home
        size={22}
        color={active ? colors.primary : colors.textSecondary}
        strokeWidth={active ? 2.5 : 2}
      />
    ),
  },
  {
    key: 'Explorar',
    labelKey: 'tabs.explore',
    route: 'Explore',
    icon: (active) => (
      <Compass
        size={22}
        color={active ? colors.primary : colors.textSecondary}
        strokeWidth={active ? 2.5 : 2}
      />
    ),
  },
  {
    key: 'Chats',
    labelKey: 'tabs.chats',
    route: 'Chats',
    badge: 2,
    icon: (active) => (
      <MessageSquare
        size={22}
        color={active ? colors.primary : colors.textSecondary}
        strokeWidth={active ? 2.5 : 2}
      />
    ),
  },
  {
    key: 'Perfil',
    labelKey: 'tabs.profile',
    route: 'Profile',
    icon: (active) => (
      <User
        size={22}
        color={active ? colors.primary : colors.textSecondary}
        strokeWidth={active ? 2.5 : 2}
      />
    ),
  },
];

export interface BottomTabBarProps {
  activeTab?: TabKey;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab }) => {
  const { t } = useTranslation('common');
  const storeTab = useAppConfigStore((state) => state.currentTab);
  const setStoreTab = useAppConfigStore((state) => state.setCurrentTab);
  const currentTab = activeTab || storeTab;

  const handleTabPress = (tab: TabItem) => {
    setStoreTab(tab.key);
    if (tab.route === 'Home') {
      navigate(Routes.App.Home);
    } else if (tab.route === 'Explore') {
      navigate(Routes.App.Explore);
    } else if (tab.route === 'Chats') {
      navigate(Routes.App.Chats);
    } else {
      const label = t(tab.labelKey);
      Alert.alert(label, `${label} estará disponible pronto.`);
    }
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = currentTab === tab.key;
        const translatedLabel = t(tab.labelKey);

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => handleTabPress(tab)}
            style={styles.tabItem}
          >
            <View style={styles.iconWrapper}>
              {tab.icon(isActive)}
              {!!tab.badge && tab.badge > 0 && (
                <View style={styles.tabBadge}>
                  <AppText style={styles.tabBadgeText}>{tab.badge}</AppText>
                </View>
              )}
            </View>
            <AppText
              variant="caption"
              style={[
                styles.tabLabel,
                { color: isActive ? colors.primary : colors.textSecondary },
                isActive ? styles.activeLabel : undefined,
              ]}
            >
              {translatedLabel}
            </AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 60,
  },
  iconWrapper: {
    position: 'relative',
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: colors.dangerDark,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeText: {
    color: colors.textWhite,
    fontSize: 10,
    fontWeight: '800',
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 11,
  },
  activeLabel: {
    fontWeight: '700',
  },
});
