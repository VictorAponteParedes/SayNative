import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, BottomTabBar, AppText, SearchBar } from '../../../../components';
import { HomeHeader } from '../../../home/components/HomeHeader';
import { ExploreHeader } from '../../components/ExploreHeader';
import { FilterPillsRow } from '../../components/FilterPillsRow';
import { SpeakersCountSortRow } from '../../components/SpeakersCountSortRow';
import { SpeakerCard } from '../../components/SpeakerCard';
import { useExploreSpeakers } from '../../hooks/useExploreSpeakers';
import { SpeakerUser } from '../../types';
import { styles } from './styles';

export const ExploreScreen: React.FC = () => {
  const { t } = useTranslation('explore');
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    speakers,
    totalAvailable,
  } = useExploreSpeakers();

  const handleNotifications = () => {
    Alert.alert('Notificaciones', 'No tienes notificaciones pendientes.');
  };

  const handleProfile = () => {
    Alert.alert('Perfil', 'Abriendo perfil de usuario...');
  };

  const handleHelp = () => {
    Alert.alert(t('help.title'), t('help.desc'));
  };

  const handleOpenFilters = () => {
    Alert.alert(t('advancedFilters.title'), t('advancedFilters.desc'));
  };

  const handleSort = () => {
    Alert.alert(t('sort.title'), t('sort.desc'));
  };

  const handleCallSpeaker = (speaker: SpeakerUser) => {
    Alert.alert(
      t('dialog.callTitle'),
      t('dialog.callMessage', {
        name: speaker.name,
        rate: speaker.ratePerMinute,
      })
    );
  };

  const handleChatSpeaker = (speaker: SpeakerUser) => {
    Alert.alert(
      t('dialog.chatTitle'),
      t('dialog.chatMessage', { name: speaker.name })
    );
  };

  const renderHeader = () => (
    <View>
      {/* Título de la sección con badge de total y botón de ayuda */}
      <ExploreHeader totalCount={totalAvailable} onPressHelp={handleHelp} />

      {/* Buscador global y botón de filtros */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPressFilter={handleOpenFilters}
        placeholder={t('searchPlaceholder')}
      />

      {/* Píldoras de filtrado rápido */}
      <FilterPillsRow
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* Fila con conteo de resultados y ordenamiento */}
      <SpeakersCountSortRow
        count={totalAvailable}
        onPressSort={handleSort}
      />
    </View>
  );

  return (
    <SafeAreaContainer>
      {/* Barra superior de la aplicación */}
      <HomeHeader
        onPressNotifications={handleNotifications}
        onPressProfile={handleProfile}
      />

      {/* Lista vertical de hablantes */}
      <FlatList
        data={speakers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SpeakerCard
            speaker={item}
            onPressCall={handleCallSpeaker}
            onPressChat={handleChatSpeaker}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <AppText variant="bodyLarge" style={styles.emptyText}>
              {t('empty')}
            </AppText>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Barra de navegación inferior */}
      <BottomTabBar activeTab="Explorar" />
    </SafeAreaContainer>
  );
};
