import { useState, useMemo, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthStore } from '@/store/useAuthStore';
import { getSocket } from '@/lib/socketClient';
import { useChatsStore } from '../store/useChatsStore';
import { chatsApi } from '../api/chatsApi';
import { ChatFilterType, BackendChatFilterOption } from '../types';

export const useChatsList = () => {
  const currentUserId = useAuthStore(s => s.user.id);
  const {
    chats,
    onlinePeers,
    isLoading,
    isRefreshing,
    setChats,
    setOnlinePeers,
    setIsLoading,
    setIsRefreshing,
  } = useChatsStore();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<ChatFilterType>('all');
  const [filterOptions, setFilterOptions] = useState<BackendChatFilterOption[]>([]);
  const [isFilterBottomSheetOpen, setIsFilterBottomSheetOpen] = useState<boolean>(false);

  const fetchChats = useCallback(async () => {
    try {
      const [realConversations, realPeers, backendFilters] = await Promise.all([
        chatsApi.getConversations(currentUserId, activeFilter),
        chatsApi.getOnlinePeers(currentUserId),
        chatsApi.getFilterOptions(currentUserId),
      ]);
      setChats(realConversations);
      setOnlinePeers(realPeers);
      if (Array.isArray(backendFilters) && backendFilters.length > 0) {
        setFilterOptions(backendFilters);
      }
    } catch {
      setChats([]);
      setOnlinePeers([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [currentUserId, activeFilter, setChats, setOnlinePeers, setIsLoading, setIsRefreshing]);

  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, [fetchChats]),
  );

  useEffect(() => {
    fetchChats();
  }, [activeFilter, fetchChats]);

  // Escuchar mensajes en tiempo real desde el socket de chats para actualizar la lista
  useEffect(() => {
    const socket = getSocket({ namespace: '/chats' });
    if (!socket.connected) {
      socket.connect();
    }

    if (currentUserId) {
      socket.emit('register_user', { userId: currentUserId });
      socket.emit('chat:register-user', { userId: currentUserId });
    }

    const handleNewMessage = () => {
      fetchChats();
    };

    socket.on('new_message', handleNewMessage);
    socket.on('new_message_notification', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
      socket.off('new_message_notification', handleNewMessage);
    };
  }, [currentUserId, fetchChats]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchChats();
  }, [fetchChats, setIsRefreshing]);

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    return chats.filter(
      item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [chats, searchQuery]);

  const totalUnread = useMemo(() => {
    return chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  }, [chats]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filterOptions,
    isFilterBottomSheetOpen,
    setIsFilterBottomSheetOpen,
    onlinePeers,
    chats: filteredChats,
    totalCount: chats.length,
    totalUnread,
    isLoading,
    isRefreshing,
    onRefresh,
  };
};

export default useChatsList;
