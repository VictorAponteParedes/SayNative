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
}));

export default useChatsStore;
