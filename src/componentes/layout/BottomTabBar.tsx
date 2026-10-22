import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Home, Compass, MessageSquare, User } from 'lucide-react-native';
import { colors, spacing } from '../../theme';
import { AppText } from '../ui/AppText';
import { navigate } from '../../navigation/NavigationRef';
import { Routes } from '../../navigation/routes';
import { useAppConfigStore } from '../../store/useAppConfigStore';

export type TabKey = 'Inicio' | 'Explorar' | 'Chats' | 'Perfil';

interface TabItem {
  key: TabKey;
  label: string;
  route?: keyof typeof Routes.App;
  icon: (active: boolean) => React.ReactNode;
}

const TABS: TabItem[] = [
  {
    key: 'Inicio',
    label: 'Inicio',
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
    label: 'Explorar',
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
    label: 'Chats',
    route: 'Chats',
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
    label: 'Perfil',
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
  const storeTab = useAppConfigStore((state) => state.currentTab);
  const setStoreTab = useAppConfigStore((state) => state.setCurrentTab);
  const currentTab = activeTab || storeTab;

  const handleTabPress = (tab: TabItem) => {
    setStoreTab(tab.key);
    if (tab.route === 'Home') {
      navigate(Routes.App.Home);
    } else if (tab.route === 'Explore') {
      navigate(Routes.App.Explore);
    } else {
      Alert.alert(tab.label, `La sección de ${tab.label} estará disponible pronto.`);
    }
  };

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => handleTabPress(tab)}
            style={styles.tabItem}
          >
            {tab.icon(isActive)}
            <AppText
              variant="caption"
              style={[
                styles.tabLabel,
                { color: isActive ? colors.primary : colors.textSecondary },
                isActive ? styles.activeLabel : undefined,
              ]}
            >
              {tab.label}
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
  tabLabel: {
    marginTop: 4,
    fontSize: 11,
  },
  activeLabel: {
    fontWeight: '700',
  },
});
