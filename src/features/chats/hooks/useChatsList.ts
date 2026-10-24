import { useState, useMemo, useCallback, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatsStore } from '../store/useChatsStore';
import { chatsApi } from '../api/chatsApi';
import { ChatFilterType } from '../types';

export const useChatsList = () => {
  const currentUserId = useAuthStore((s) => s.user.id);
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

  const fetchChats = useCallback(async () => {
    try {
      const [realConversations, realPeers] = await Promise.all([
        chatsApi.getConversations(currentUserId),
        chatsApi.getOnlinePeers(currentUserId),
      ]);
      setChats(realConversations);
      setOnlinePeers(realPeers);
    } catch {
      setChats([]);
      setOnlinePeers([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [currentUserId, setChats, setOnlinePeers, setIsLoading, setIsRefreshing]);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchChats();
  }, [fetchChats, setIsRefreshing]);

  const filteredChats = useMemo(() => {
    return chats.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === 'all'
          ? true
          : activeFilter === 'unread'
          ? !!item.unreadCount && item.unreadCount > 0
          : activeFilter === 'videocalls'
          ? item.messageType === 'videocall_ended' ||
            item.messageType === 'missed_call'
          : true;

      return matchesSearch && matchesFilter;
    });
  }, [chats, searchQuery, activeFilter]);

  const totalUnread = useMemo(() => {
    return chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  }, [chats]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
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
