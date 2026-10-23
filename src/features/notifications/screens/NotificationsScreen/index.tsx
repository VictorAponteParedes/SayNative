import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText } from '@/components';
import {
  NotificationsHeader,
  NotificationsFilterTabs,
  NotificationItemCard,
} from '../../components';
import { useNotifications } from '../../hooks/useNotifications';
import { styles } from './styles';

export const NotificationsScreen: React.FC = () => {
  const { t } = useTranslation('notifications');
  const {
    notifications,
    sections,
    unreadCount,
    activeFilter,
    setActiveFilter,
    handleMarkAllAsRead,
    handleAction,
  } = useNotifications();

  return (
    <SafeAreaContainer edges={['top', 'bottom']} style={styles.container}>
      {/* Cabecera con título Actividad, badge y botón Marcar Leídas */}
      <NotificationsHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      {/* Píldoras de Filtro: Todas (con contador), Llamadas, Monedas, Comunidad */}
      <NotificationsFilterTabs
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        totalCount={notifications.length}
      />

      {/* Lista de Notificaciones agrupada por Secciones */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((group) => (
          <View key={group.sectionKey}>
            <View style={styles.sectionHeader}>
              <AppText variant="caption" style={styles.sectionTitle}>
                {t(`sections.${group.sectionKey}`)}
              </AppText>
              {group.sectionKey === 'today' && (
                <AppText variant="caption" style={styles.sectionCount}>
                  {t('sections.todayCount', { count: group.data.length })}
                </AppText>
              )}
            </View>

            {group.data.map((item) => (
              <NotificationItemCard
                key={item.id}
                notification={item}
                onPressAction={handleAction}
              />
            ))}
          </View>
        ))}

        {sections.length === 0 && (
          <View style={styles.emptyContainer}>
            <AppText variant="body" style={styles.emptyText}>
              {t('sections.empty')}
            </AppText>
          </View>
        )}
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default NotificationsScreen;
