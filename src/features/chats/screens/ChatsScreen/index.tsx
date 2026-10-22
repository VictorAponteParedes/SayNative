import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, BottomTabBar, AppText } from '../../../../componentes';
import { SearchAndFilterBar } from '../../../discovery/components/SearchAndFilterBar';
import { ChatsHeader } from '../../components/ChatsHeader';
import { OnlinePeersRow } from '../../components/OnlinePeersRow';
import { ChatFilterTabs } from '../../components/ChatFilterTabs';
import { ChatItemCard } from '../../components/ChatItemCard';
import { DailyTipCard } from '../../components/DailyTipCard';
import { useChatsList } from '../../hooks/useChatsList';
import { navigate } from '../../../../navigation/NavigationRef';
import { Routes } from '../../../../navigation/routes';
import { ChatConversation, OnlinePeer } from '../../types';
import { styles } from './styles';

export const ChatsScreen: React.FC = () => {
  const { t } = useTranslation('chats');
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    onlinePeers,
    chats,
    totalUnread,
  } = useChatsList();

  const handleNewChat = () => {
    Alert.alert(t('options.newChat'), t('options.newChatMessage'));
  };

  const handleOptions = () => {
    Alert.alert(t('options.title'), t('options.markAllRead'));
  };

  const handleFilterSearch = () => {
    Alert.alert('Filtros', 'Filtrar chats por fecha, no leídos o llamadas.');
  };

  const handlePeerPress = (peer: OnlinePeer) => {
    navigate(Routes.App.PrivateChat, {
      chatId: `peer_${peer.id}`,
      partnerName: peer.name,
      partnerAvatar: peer.avatarUrl,
      partnerFlag: peer.countryFlag,
      ratePerMinute: 10,
    });
  };

  const handleChatPress = (chat: ChatConversation) => {
    navigate(Routes.App.PrivateChat, {
      chatId: chat.id,
      partnerName: chat.name,
      partnerAvatar: chat.avatarUrl,
      partnerFlag: chat.countryFlag,
      ratePerMinute: 10,
    });
  };

  const handleTipPress = () => {
    Alert.alert(
      t('tipCard.title'),
      'La práctica diaria de 10 minutos acelera tu fluidez hasta un 70% más rápido que estudiar gramática pasiva.'
    );
  };

  const renderHeader = () => (
    <View>
      {/* Cabecera superior con título Mensajes, badge y botones */}
      <ChatsHeader
        totalCount={chats.length}
        onPressNewChat={handleNewChat}
        onPressOptions={handleOptions}
      />

      {/* Buscador de conversaciones */}
      <SearchAndFilterBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPressFilterButton={handleFilterSearch}
        placeholder={t('searchPlaceholder')}
      />

      {/* Fila horizontal con compañeros en línea y botón nuevo */}
      <OnlinePeersRow
        peers={onlinePeers}
        onlineCount={12}
        onPressNewPeer={handleNewChat}
        onPressPeer={handlePeerPress}
      />

      {/* Píldoras de filtrado: Todos, No leídos, Videollamadas */}
      <ChatFilterTabs
        activeFilter={activeFilter}
        totalCount={chats.length}
        unreadCount={totalUnread}
        onSelectFilter={setActiveFilter}
      />
    </View>
  );

  return (
    <SafeAreaContainer>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItemCard chat={item} onPress={handleChatPress} />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<DailyTipCard onPress={handleTipPress} />}
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
      <BottomTabBar activeTab="Chats" />
    </SafeAreaContainer>
  );
};
