import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { SafeAreaContainer, BottomTabBar, AppText } from '../../../../componentes';
import { HomeHeader } from '../../../home/components/HomeHeader';
import { ExploreHeader } from '../../components/ExploreHeader';
import { SearchAndFilterBar } from '../../components/SearchAndFilterBar';
import { FilterPillsRow } from '../../components/FilterPillsRow';
import { SpeakersCountSortRow } from '../../components/SpeakersCountSortRow';
import { SpeakerCard } from '../../components/SpeakerCard';
import { useExploreSpeakers } from '../../hooks/useExploreSpeakers';
import { SpeakerUser } from '../../types';
import { styles } from './styles';

export const ExploreScreen: React.FC = () => {
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
    Alert.alert(
      'Explorar Hablantes',
      'Aquí encuentras a hablantes nativos de todo el mundo. Puedes filtrar por idioma, calificación o buscar por temas de conversación.'
    );
  };

  const handleOpenFilters = () => {
    Alert.alert(
      'Filtros Avanzados',
      'Filtrar por país, rango de edad, tarifa por minuto y disponibilidad.'
    );
  };

  const handleSort = () => {
    Alert.alert(
      'Ordenar Hablantes',
      'Ordenar por: Más relevantes, Mayor puntuación, Tarifa más baja o Recientes.'
    );
  };

  const handleCallSpeaker = (speaker: SpeakerUser) => {
    Alert.alert(
      'Videollamada Directa',
      `Iniciando llamada con ${speaker.name}. Tarifa: ${speaker.ratePerMinute} monedas por minuto.`
    );
  };

  const handleChatSpeaker = (speaker: SpeakerUser) => {
    Alert.alert('Chat Directo', `Iniciando conversación escrita con ${speaker.name}.`);
  };

  const renderHeader = () => (
    <View>
      {/* Título de la sección con badge de total y botón de ayuda */}
      <ExploreHeader totalCount={totalAvailable} onPressHelp={handleHelp} />

      {/* Buscador y botón de filtros */}
      <SearchAndFilterBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPressFilterButton={handleOpenFilters}
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
              No se encontraron hablantes disponibles con los criterios seleccionados.
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
