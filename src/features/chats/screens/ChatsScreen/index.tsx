import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, BottomTabBar, AppText, SearchBar, AppAlert } from '@/components';
import { ChatsHeader } from '../../components/ChatsHeader';
import { OnlinePeersRow } from '../../components/OnlinePeersRow';
import { OnlinePeersSkeleton } from '../../components/OnlinePeersSkeleton';
import { ChatFiltersBottomSheet } from '../../components/ChatFiltersBottomSheet';
import { ChatItemCard } from '../../components/ChatItemCard';
import { ChatItemCardSkeleton } from '../../components/ChatItemCardSkeleton';
import { DailyTipCard } from '../../components/DailyTipCard';
import { useChatsList } from '../../hooks/useChatsList';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { ChatConversation, OnlinePeer } from '../../types';
import { colors } from '@/theme';
import { styles } from './styles';

export const ChatsScreen: React.FC = () => {
  const { t } = useTranslation('chats');
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filterOptions,
    isFilterBottomSheetOpen,
    setIsFilterBottomSheetOpen,
    onlinePeers,
    chats,
    totalCount,
    totalUnread,
    isLoading,
    isRefreshing,
    onRefresh,
  } = useChatsList();

  const handleNewChat = () => {
    AppAlert.info(t('options.newChat'), t('options.newChatMessage'));
  };

  const handleOptions = () => {
    AppAlert.info(t('options.title'), t('options.markAllRead'));
  };

  const handleFilterSearch = () => {
    setIsFilterBottomSheetOpen(true);
  };

  const handlePeerPress = (peer: OnlinePeer) => {
    navigate(Routes.App.PrivateChat, {
      chatId: peer.id,
      partnerId: peer.id,
      partnerName: peer.name,
      partnerAvatar: peer.avatarUrl,
      partnerFlag: peer.countryFlag,
      ratePerMinute: peer.ratePerMinute || 10,
    });
  };

  const handleChatPress = (chat: ChatConversation) => {
    navigate(Routes.App.PrivateChat, {
      chatId: chat.partnerId || chat.id,
      roomId: chat.id,
      partnerId: chat.partnerId,
      partnerName: chat.name,
      partnerAvatar: chat.avatarUrl,
      partnerFlag: chat.countryFlag,
      ratePerMinute: chat.ratePerMinute || 10,
    });
  };

  const handleTipPress = () => {
    AppAlert.info(
      t('tipCard.title'),
      'La práctica diaria de 10 minutos acelera tu fluidez hasta un 70% más rápido que estudiar gramática pasiva.'
    );
  };

  const renderHeader = () => (
    <View>
      {/* Cabecera superior con título Mensajes, badge y botones */}
      <ChatsHeader
        totalCount={totalCount}
        onPressNewChat={handleNewChat}
        onPressOptions={handleOptions}
      />

      {/* Buscador global de conversaciones */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPressFilter={handleFilterSearch}
        placeholder={t('searchPlaceholder')}
      />

      {/* Fila horizontal con compañeros en línea y botón nuevo */}
      <OnlinePeersRow
        peers={onlinePeers}
        onlineCount={onlinePeers.length}
        onPressNewPeer={handleNewChat}
        onPressPeer={handlePeerPress}
      />
    </View>
  );

  const renderSkeletonHeader = () => (
    <View>
      <ChatsHeader
        totalCount={0}
        isLoading={true}
        onPressNewChat={handleNewChat}
        onPressOptions={handleOptions}
      />
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPressFilter={handleFilterSearch}
        placeholder={t('searchPlaceholder')}
      />
      <OnlinePeersSkeleton />
    </View>
  );

  return (
    <SafeAreaContainer>
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => `skel_chat_${item}`}
          renderItem={() => <ChatItemCardSkeleton />}
          ListHeaderComponent={renderSkeletonHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatItemCard chat={item} onPress={handleChatPress} />
          )}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={chats.length > 0 ? <DailyTipCard onPress={handleTipPress} /> : undefined}
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
      <BottomTabBar activeTab="Chats" />

      {/* Modal BottomSheet de filtros procedentes del backend */}
      <ChatFiltersBottomSheet
        visible={isFilterBottomSheetOpen}
        onClose={() => setIsFilterBottomSheetOpen(false)}
        activeFilter={activeFilter}
        filterOptions={filterOptions}
        onSelectFilter={setActiveFilter}
      />
    </SafeAreaContainer>
  );
};

export default ChatsScreen;
