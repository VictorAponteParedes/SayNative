import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, fonts } from '@/theme';
import { AppText } from '@/components/ui/AppText';
import { AppAlert } from '@/store/useModalStore';
import { Routes } from '@/navigation/routes';
import { useAppConfigStore } from '@/store/useAppConfigStore';
import { navigate } from '@/navigation/NavigationRef';
import { useCoinsStore } from '@/features/coins';

export type TabKey = 'Inicio' | 'Explorar' | 'Chats' | 'Perfil';

interface TabItem {
  key: TabKey;
  labelKey: string;
  route: keyof typeof Routes.App;
  badge?: number;
  icon: (active: boolean) => React.ReactNode;
}

/**
 * Iconos SVG estilo Iconly / Solar (trazos orgánicos redondeados con relleno suave al estar activos)
 */
const HomeIcon: React.FC<{ active: boolean }> = ({ active }) => {
  const strokeColor = active ? colors.primary : colors.textSecondary;
  const fillColor = active ? colors.primaryBgSubtle : 'none';
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.02 2.84L3.63 7.04C2.73 7.74 2 9.23 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29 21.19 7.74 20.2 7.05L14.02 2.72C12.62 1.74 10.37 1.79 9.02 2.84Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={active ? 2.1 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17.99V14.99"
        stroke={strokeColor}
        strokeWidth={active ? 2.2 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const ExploreIcon: React.FC<{ active: boolean }> = ({ active }) => {
  const strokeColor = active ? colors.primary : colors.textSecondary;
  const fillColor = active ? colors.primaryBgSubtle : 'none';
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="9.5"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={active ? 2.1 : 1.8}
      />
      <Path
        d="M14.83 9.17L13.41 13.41L9.17 14.83L10.59 10.59L14.83 9.17Z"
        fill={active ? colors.primary : 'none'}
        stroke={strokeColor}
        strokeWidth={active ? 1.9 : 1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const ChatsIcon: React.FC<{ active: boolean }> = ({ active }) => {
  const strokeColor = active ? colors.primary : colors.textSecondary;
  const fillColor = active ? colors.primaryBgSubtle : 'none';
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.5 11.75C21.5 16.86 17.25 21 12 21C10.35 21 8.8 20.59 7.44 19.86L3.35 20.92C2.73 21.08 2.17 20.52 2.33 19.9L3.39 15.81C2.82 14.57 2.5 13.2 2.5 11.75C2.5 6.64 6.75 2.5 12 2.5C17.25 2.5 21.5 6.64 21.5 11.75Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={active ? 2.1 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="8.5" cy="11.75" r="1.15" fill={strokeColor} />
      <Circle cx="12" cy="11.75" r="1.15" fill={strokeColor} />
      <Circle cx="15.5" cy="11.75" r="1.15" fill={strokeColor} />
    </Svg>
  );
};

const ProfileIcon: React.FC<{ active: boolean }> = ({ active }) => {
  const strokeColor = active ? colors.primary : colors.textSecondary;
  const fillColor = active ? colors.primaryBgSubtle : 'none';
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="8"
        r="4.25"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={active ? 2.1 : 1.8}
      />
      <Path
        d="M5 19.5C5 16.46 8.13 14 12 14C15.87 14 19 16.46 19 19.5C19 20.33 18.33 21 17.5 21H6.5C5.67 21 5 20.33 5 19.5Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={active ? 2.1 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const VideoCallIcon: React.FC = () => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.53 20.42H6.21C3.05 20.42 2 18.32 2 16.21V7.79C2 4.63 3.05 3.58 6.21 3.58H12.53C15.69 3.58 16.74 4.63 16.74 7.79V16.21C16.74 19.37 15.68 20.42 12.53 20.42Z"
      stroke={colors.white}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.52 17.1L16.74 15.15V8.84L19.52 6.89C20.88 5.94 22 6.52 22 8.19V15.81C22 17.48 20.88 18.06 19.52 17.1Z"
      stroke={colors.white}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="11.5" cy="9.5" r="1.5" stroke={colors.white} strokeWidth={1.8} />
  </Svg>
);

const LEFT_TABS: TabItem[] = [
  {
    key: 'Inicio',
    labelKey: 'tabs.home',
    route: 'Home',
    icon: (active) => <HomeIcon active={active} />,
  },
  {
    key: 'Explorar',
    labelKey: 'tabs.explore',
    route: 'Explore',
    icon: (active) => <ExploreIcon active={active} />,
  },
];

const RIGHT_TABS: TabItem[] = [
  {
    key: 'Chats',
    labelKey: 'tabs.chats',
    route: 'Chats',
    badge: 2,
    icon: (active) => <ChatsIcon active={active} />,
  },
  {
    key: 'Perfil',
    labelKey: 'tabs.profile',
    route: 'Profile',
    icon: (active) => <ProfileIcon active={active} />,
  },
];

const BAR_HEIGHT = 68;
const HORIZONTAL_MARGIN = spacing.md;
const FAB_SIZE = 58;

/**
 * Genera el trazado SVG de la barra inferior blanca con esquinas redondeadas
 * y la curva cóncava central que abraza el botón flotante de Videollamada.
 */
const buildCurvedBarPath = (width: number, height: number): string => {
  const topRadius = 26;
  const bottomRadius = 22;
  const cx = width / 2;
  const notchHalfWidth = 52;
  const notchDepth = 34;

  const startNotchX = cx - notchHalfWidth;
  const endNotchX = cx + notchHalfWidth;

  return [
    `M ${topRadius} 0`,
    `L ${startNotchX} 0`,
    `C ${cx - 30} 0, ${cx - 25} ${notchDepth}, ${cx} ${notchDepth}`,
    `C ${cx + 25} ${notchDepth}, ${cx + 30} 0, ${endNotchX} 0`,
    `L ${width - topRadius} 0`,
    `Q ${width} 0, ${width} ${topRadius}`,
    `L ${width} ${height - bottomRadius}`,
    `Q ${width} ${height}, ${width - bottomRadius} ${height}`,
    `L ${bottomRadius} ${height}`,
    `Q 0 ${height}, 0 ${height - bottomRadius}`,
    `L 0 ${topRadius}`,
    `Q 0 0, ${topRadius} 0`,
    'Z',
  ].join(' ');
};

export interface BottomTabBarProps {
  activeTab?: TabKey;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab }) => {
  const { t } = useTranslation('common');
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  const storeTab = useAppConfigStore((state) => state.currentTab);
  const setStoreTab = useAppConfigStore((state) => state.setCurrentTab);
  const currentTab = activeTab || storeTab;

  const barWidth = Math.max(280, screenWidth - HORIZONTAL_MARGIN * 2);
  const svgPath = buildCurvedBarPath(barWidth, BAR_HEIGHT);

  const handleTabPress = (tab: TabItem) => {
    setStoreTab(tab.key);
    if (tab.route === 'Home') {
      navigate(Routes.App.Home);
    } else if (tab.route === 'Explore') {
      navigate(Routes.App.Explore);
    } else if (tab.route === 'Chats') {
      navigate(Routes.App.Chats);
    } else if (tab.route === 'Profile') {
      navigate(Routes.App.Profile);
    } else {
      const label = t(tab.labelKey);
      AppAlert.info(label, `${label} estará disponible pronto.`);
    }
  };

  const handlePressVideoCall = () => {
    const userCoins = useCoinsStore.getState().coins;
    if (!__DEV__ && userCoins < 10) {
      AppAlert.info(
        t('actions.call', { defaultValue: 'Videollamada' }),
        'No tienes monedas suficientes para iniciar una videollamada de práctica.'
      );
      return;
    }

    navigate(Routes.App.CallLobby, {
      isInstantMatch: true,
      ratePerMinute: 10,
    });
  };

  const renderTabButton = (tab: TabItem) => {
    const isActive = currentTab === tab.key;
    const translatedLabel = t(tab.labelKey);

    return (
      <TouchableOpacity
        key={tab.key}
        activeOpacity={0.75}
        onPress={() => handleTabPress(tab)}
        style={styles.tabItem}
        accessibilityRole="button"
        accessibilityLabel={translatedLabel}
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
            isActive ? styles.activeLabel : styles.inactiveLabel,
          ]}
        >
          {translatedLabel}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.outerWrapper,
        { paddingBottom: Math.max(insets.bottom, spacing.sm) },
      ]}
    >
      <View style={[styles.barContainer, { width: barWidth }]}>
        {/* Halo difuso debajo del botón central en la cuna cóncava */}
        <View style={styles.centerGlowHalo} pointerEvents="none" />

        {/* Fondo SVG blanco con curva cóncava central */}
        <View style={styles.svgShadowContainer} pointerEvents="none">
          <Svg width={barWidth} height={BAR_HEIGHT}>
            <Path d={svgPath} fill={colors.surface} />
          </Svg>
        </View>

        {/* Botón Central Flotante: Videollamada */}
        <View style={styles.fabWrapper} pointerEvents="box-none">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handlePressVideoCall}
            style={styles.centerFabButton}
            accessibilityRole="button"
            accessibilityLabel={t('tabs.videoCall', 'Videollamada')}
          >
            <VideoCallIcon />
          </TouchableOpacity>
        </View>

        {/* Fila de los 4 accesos (2 a la izquierda, 2 a la derecha) */}
        <View style={styles.tabsRow}>
          <View style={styles.sideGroup}>
            {LEFT_TABS.map(renderTabButton)}
          </View>

          {/* Espacio reservado para la curva central */}
          <View style={styles.centerNotchSpacer} pointerEvents="none" />

          <View style={styles.sideGroup}>
            {RIGHT_TABS.map(renderTabButton)}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 22,
  },
  barContainer: {
    height: BAR_HEIGHT,
    position: 'relative',
    justifyContent: 'center',
  },
  svgShadowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 10,
  },
  centerGlowHalo: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    width: FAB_SIZE + 14,
    height: FAB_SIZE + 14,
    borderRadius: borderRadius.full,
    backgroundColor: colors.borderHighlight,
    opacity: 0.65,
  },
  fabWrapper: {
    position: 'absolute',
    top: -24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  centerFabButton: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.38,
    shadowRadius: 10,
    elevation: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: BAR_HEIGHT,
    paddingHorizontal: spacing.sm,
    zIndex: 5,
  },
  sideGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  centerNotchSpacer: {
    width: 96,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    minWidth: 58,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 28,
  },
  tabBadge: {
    position: 'absolute',
    top: -3,
    right: -6,
    backgroundColor: colors.dangerDark,
    minWidth: 16,
    height: 16,
    borderRadius: borderRadius.full,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeText: {
    fontFamily: fonts.extraBold,
    color: colors.textWhite,
    fontSize: 10,
  },
  tabLabel: {
    marginTop: 2,
    fontSize: 11,
  },
  activeLabel: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  inactiveLabel: {
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
});
