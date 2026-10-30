import { create } from 'zustand';
import { ChatConversation, OnlinePeer } from '../types';

interface ChatsState {
  chats: ChatConversation[];
  onlinePeers: OnlinePeer[];
  isLoading: boolean;
  isRefreshing: boolean;
  setChats: (chats: ChatConversation[]) => void;
  setOnlinePeers: (peers: OnlinePeer[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsRefreshing: (isRefreshing: boolean) => void;
  markChatAsRead: (roomId: string) => void;
}

export const useChatsStore = create<ChatsState>((set) => ({
  chats: [],
  onlinePeers: [],
  isLoading: true,
  isRefreshing: false,
  setChats: (chats) => set({ chats }),
  setOnlinePeers: (onlinePeers) => set({ onlinePeers }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsRefreshing: (isRefreshing) => set({ isRefreshing }),
  markChatAsRead: (roomId: string) =>
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === roomId ? { ...c, unreadCount: 0, isRead: true } : c,
      ),
    })),
}));

export const selectTotalUnreadChats = (state: ChatsState): number =>
  state.chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

export default useChatsStore;
