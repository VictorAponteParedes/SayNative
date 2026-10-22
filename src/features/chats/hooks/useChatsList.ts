import { useState, useMemo } from 'react';
import { OnlinePeer, ChatConversation, ChatFilterType } from '../types';

const INITIAL_ONLINE_PEERS: OnlinePeer[] = [
  {
    id: 'peer_1',
    name: 'Sarah',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    countryFlag: '🇺🇸',
    isOnline: true,
  },
  {
    id: 'peer_2',
    name: 'David',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    countryFlag: '🇬🇧',
    isOnline: true,
  },
  {
    id: 'peer_3',
    name: 'Emma',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    countryFlag: '🇺🇸',
    isOnline: true,
  },
  {
    id: 'peer_4',
    name: 'Liam',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    countryFlag: '🇬🇧',
    isOnline: true,
  },
  {
    id: 'peer_5',
    name: 'Chloe',
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    countryFlag: '🇨🇦',
    isOnline: true,
  },
];

const INITIAL_CHATS: ChatConversation[] = [
  {
    id: 'chat_1',
    name: 'Sarah Jenkins',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    countryFlag: '🇺🇸',
    isOnline: true,
    lastMessage: '¡Genial! Nos vemos mañana p...',
    time: '14:32',
    unreadCount: 2,
    messageType: 'text',
  },
  {
    id: 'chat_2',
    name: 'David Smith',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    countryFlag: '🇬🇧',
    isOnline: true,
    lastMessage: 'Videollamada finalizada · 18 min',
    time: '11:15',
    unreadCount: 1,
    messageType: 'videocall_ended',
    callDuration: '18 min',
  },
  {
    id: 'chat_3',
    name: 'Emma Watson',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    countryFlag: '🇺🇸',
    isOnline: false,
    lastMessage: 'Thanks for the Spanish tips to...',
    time: 'Ayer',
    isRead: true,
    messageType: 'text',
  },
  {
    id: 'chat_4',
    name: 'Liam Davies',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    countryFlag: '🇬🇧',
    isOnline: false,
    badge: 'Super Tutor',
    lastMessage: 'Llamada perdida',
    time: 'Ayer',
    messageType: 'missed_call',
  },
  {
    id: 'chat_5',
    name: 'Chloe Moreau',
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    countryFlag: '🇨🇦',
    isOnline: false,
    lastMessage: 'Let me know when you are a...',
    time: 'Lunes',
    isRead: true,
    messageType: 'text',
  },
];

export const useChatsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<ChatFilterType>('all');
  const [chats] = useState<ChatConversation[]>(INITIAL_CHATS);
  const [onlinePeers] = useState<OnlinePeer[]>(INITIAL_ONLINE_PEERS);

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
    totalUnread,
  };
};
