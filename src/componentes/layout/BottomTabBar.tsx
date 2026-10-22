import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Compass, MessageSquare, User } from 'lucide-react-native';
import { colors, spacing } from '../../theme';
import { AppText } from '../ui/AppText';
import { useAppConfigStore } from '../../store/useAppConfigStore';

export type TabKey = 'Inicio' | 'Explorar' | 'Chats' | 'Perfil';

interface TabItem {
  key: TabKey;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

const TABS: TabItem[] = [
  {
    key: 'Inicio',
    label: 'Inicio',
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
    icon: (active) => (
      <User
        size={22}
        color={active ? colors.primary : colors.textSecondary}
        strokeWidth={active ? 2.5 : 2}
      />
    ),
  },
];

export const BottomTabBar: React.FC = () => {
  const { currentTab, setCurrentTab } = useAppConfigStore();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = currentTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.7}
            onPress={() => setCurrentTab(tab.key)}
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
