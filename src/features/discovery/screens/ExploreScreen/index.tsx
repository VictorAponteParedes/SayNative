import React from 'react';
import { View, FlatList, Alert, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, BottomTabBar, AppText, SearchBar } from '@/components';
import { HomeHeader } from '@/features/home/components/HomeHeader';
import { ExploreHeader } from '../../components/ExploreHeader';
import { FilterPillsRow } from '../../components/FilterPillsRow';
import { SpeakersCountSortRow } from '../../components/SpeakersCountSortRow';
import { SpeakerCard } from '../../components/SpeakerCard';
import { SpeakerCardSkeleton } from '../../components/SpeakerCardSkeleton';
import { useExploreSpeakers } from '../../hooks/useExploreSpeakers';
import { SpeakerUser, ExploreSortType } from '../../types';
import { useCallSessionStore } from '@/features/videocalls';
import { useCoinsStore } from '@/features/coins';
import { colors } from '@/theme';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { styles } from './styles';

export const ExploreScreen: React.FC = () => {
  const { t } = useTranslation('explore');
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    currentSort,
    setCurrentSort,
    speakers,
    totalAvailable,
    isLoading,
    isRefreshing,
    onRefresh,
  } = useExploreSpeakers();

  const handleNotifications = () => {
    navigate(Routes.App.Notifications);
  };

  const handleProfile = () => {
    navigate(Routes.App.Profile);
  };

  const handleHelp = () => {
    Alert.alert(t('help.title'), t('help.desc'));
  };

  const handleOpenFilters = () => {
    Alert.alert(t('advancedFilters.title'), t('advancedFilters.desc'));
  };

  const sortLabels: Record<ExploreSortType, string> = {
    relevant: t('sort.mostRelevant', { defaultValue: 'Más relevantes' }),
    rating: t('sort.topRated', { defaultValue: 'Mejor calificados' }),
    price_low: t('sort.priceLow', { defaultValue: 'Precio: menor a mayor' }),
    price_high: t('sort.priceHigh', { defaultValue: 'Precio: mayor a menor' }),
  };

  const handleSort = () => {
    Alert.alert(
      t('sort.title', { defaultValue: 'Ordenar por' }),
      '',
      [
        {
          text: sortLabels.relevant,
          onPress: () => setCurrentSort('relevant'),
        },
        {
          text: sortLabels.rating,
          onPress: () => setCurrentSort('rating'),
        },
        {
          text: sortLabels.price_low,
          onPress: () => setCurrentSort('price_low'),
        },
        {
          text: sortLabels.price_high,
          onPress: () => setCurrentSort('price_high'),
        },
        {
          text: t('cancel', { defaultValue: 'Cancelar' }),
          style: 'cancel',
        },
      ]
    );
  };

  const handleCallSpeaker = (speaker: SpeakerUser) => {
    const userCoins = useCoinsStore.getState().coins;
    if (!__DEV__ && userCoins < speaker.ratePerMinute) {
      Alert.alert(
        'Monedas insuficientes',
        'No tienes monedas suficientes para iniciar esta llamada.'
      );
      return;
    }

    useCallSessionStore.getState().initCallSession(
      {
        id: speaker.id,
        name: speaker.name,
        avatarUrl: speaker.avatarUrl,
        countryFlag: speaker.countryFlag,
        role: 'caller',
        ratePerMinute: speaker.ratePerMinute,
      },
      'calling'
    );

    navigate(Routes.App.ActiveCall, {
      peerId: speaker.id,
      peerName: speaker.name,
      peerAvatar: speaker.avatarUrl,
      peerFlag: speaker.countryFlag,
      ratePerMinute: speaker.ratePerMinute,
    });
  };

  const handleChatSpeaker = (speaker: SpeakerUser) => {
    navigate(Routes.App.PrivateChat, {
      chatId: speaker.id,
      partnerName: speaker.name,
      partnerAvatar: speaker.avatarUrl,
      partnerFlag: speaker.countryFlag,
      ratePerMinute: speaker.ratePerMinute,
    });
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
        currentSortLabel={sortLabels[currentSort]}
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

      {/* Lista vertical de hablantes o Skeletons */}
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(item) => `skeleton_${item}`}
          renderItem={() => <SpeakerCardSkeleton />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
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
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Barra de navegación inferior */}
      <BottomTabBar activeTab="Explorar" />
    </SafeAreaContainer>
  );
};

export default ExploreScreen;
