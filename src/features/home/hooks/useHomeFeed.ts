import { useState, useCallback, useEffect } from 'react';
import httpClient from '@/lib/httpClient';
import { useAuthStore } from '@/store/useAuthStore';
import { ApiResponse } from '@/types';
import { PeerUser } from '../types';

interface BackendUserItem {
  id: string;
  fullName?: string;
  avatar?: { url?: string } | null;
  countryFlag?: string | null;
  rating?: number;
  reviewCount?: number;
  learningCostPerMin?: number;
  earningRatePerMin?: number;
  isAvailableToTeach?: boolean;
}

const INITIAL_PEERS: PeerUser[] = [
  {
    id: 'peer_1',
    name: 'Sarah',
    age: 24,
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    isOnline: true,
    countryFlag: '🇺🇸',
    rating: 4.9,
    reviewsCount: 128,
    tags: ['Cine', 'Viajes'],
    ratePerMinute: 10,
  },
  {
    id: 'peer_2',
    name: 'David',
    age: 28,
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    isOnline: true,
    countryFlag: '',
    rating: 5.0,
    reviewsCount: 94,
    tags: ['Tecnología', 'Música'],
    ratePerMinute: 10,
  },
];

export const useHomeFeed = () => {
  const currentUserId = useAuthStore((s) => s.user.id);
  const [peers, setPeers] = useState<PeerUser[]>(INITIAL_PEERS);
  const [onlineCount, setOnlineCount] = useState<number>(3);
  const [isSearchingInstant, setIsSearchingInstant] = useState<boolean>(false);

  useEffect(() => {
    const fetchPeers = async () => {
      try {
        const response = await httpClient.get<ApiResponse<BackendUserItem[]> | BackendUserItem[]>('/users', {
          headers: currentUserId ? { 'x-user-id': currentUserId } : {},
        });

        const rawData = (response.data && 'data' in response.data) ? response.data.data : response.data;

        if (Array.isArray(rawData) && rawData.length > 0) {
          const mappedPeers: PeerUser[] = rawData
            .filter((u) => u.id !== currentUserId)
            .map((u) => ({
              id: u.id,
              name: u.fullName || 'Compañero',
              age: 25,
              avatarUrl: u.avatar?.url || '',
              isOnline: true,
              countryFlag: u.countryFlag || '🌐',
              rating: Number(u.rating) || 5.0,
              reviewsCount: u.reviewCount || 0,
              tags: ['Conversación', 'Práctica'],
              ratePerMinute: u.learningCostPerMin || 10,
            }));

          if (mappedPeers.length > 0) {
            setPeers(mappedPeers);
            setOnlineCount(mappedPeers.length);
          }
        }
      } catch {
        // Fallback a INITIAL_PEERS si el backend no responde
      }
    };

    fetchPeers();
  }, [currentUserId]);

  const startInstantMatch = useCallback(() => {
    setIsSearchingInstant(true);
    setTimeout(() => {
      setIsSearchingInstant(false);
    }, 1500);
  }, []);

  return {
    peers,
    onlineCount,
    isSearchingInstant,
    startInstantMatch,
  };
};

export default useHomeFeed;
