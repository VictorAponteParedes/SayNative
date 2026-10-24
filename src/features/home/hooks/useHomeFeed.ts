import { useState, useCallback, useEffect } from 'react';
import httpClient from '@/lib/httpClient';
import { useAuthStore } from '@/store/useAuthStore';
import { useCoinsStore } from '@/features/coins';
import { calculateAge } from '@/utils/calculateAge';
import { resolveAvatarUrl } from '@/utils/resolveAvatarUrl';
import { ApiResponse } from '@/types';
import { PeerUser } from '../types';

interface BackendUserItem {
  id: string;
  fullName?: string;
  birthDate?: string | Date | null;
  avatar?: { url?: string } | null;
  countryFlag?: string | null;
  rating?: number;
  reviewCount?: number;
  learningCostPerMin?: number;
  earningRatePerMin?: number;
  isAvailableToTeach?: boolean;
}

export const useHomeFeed = () => {
  const currentUserId = useAuthStore(s => s.user.id);
  const [peers, setPeers] = useState<PeerUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isSearchingInstant, setIsSearchingInstant] = useState<boolean>(false);

  const fetchPeers = useCallback(async () => {
    try {
      // Sincronizar saldo actual de monedas desde el backend
      if (currentUserId) {
        try {
          const meRes = await httpClient.get<
            ApiResponse<BackendUserItem & { coins?: number }>
          >('/users/me', {
            headers: { 'x-user-id': currentUserId },
          });
          const meData =
            meRes.data && 'data' in meRes.data ? meRes.data.data : meRes.data;
          if (meData && meData.coins !== undefined) {
            useCoinsStore.getState().setCoins(Number(meData.coins));
          }
        } catch {
          // Error de sincronización ignorado
        }
      }

      const response = await httpClient.get<
        ApiResponse<BackendUserItem[]> | BackendUserItem[]
      >('/users', {
        headers: currentUserId ? { 'x-user-id': currentUserId } : {},
      });

      const rawData =
        response.data && 'data' in response.data
          ? response.data.data
          : response.data;

      if (Array.isArray(rawData) && rawData.length > 0) {
        const mappedPeers: PeerUser[] = rawData
          .filter(u => u.id !== currentUserId)
          .map(u => ({
            id: u.id,
            name: u.fullName || 'Compañero',
            age: calculateAge(u.birthDate),
            avatarUrl: resolveAvatarUrl(u.avatar?.url || ''),
            isOnline: true,
            countryFlag: u.countryFlag || '🌐',
            rating: Number(u.rating) || 5.0,
            reviewsCount: u.reviewCount || 0,
            tags: ['Conversación', 'Práctica'],
            ratePerMinute: u.learningCostPerMin || 10,
          }));

        setPeers(mappedPeers);
        setOnlineCount(mappedPeers.length);
      } else {
        setPeers([]);
        setOnlineCount(0);
      }
    } catch {
      // Si el backend no responde, dejamos la lista vacía
      setPeers([]);
      setOnlineCount(0);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchPeers();
  }, [fetchPeers]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchPeers();
  }, [fetchPeers]);

  const startInstantMatch = useCallback(() => {
    setIsSearchingInstant(true);
    setTimeout(() => {
      setIsSearchingInstant(false);
    }, 1500);
  }, []);

  return {
    peers,
    isLoading,
    isRefreshing,
    onRefresh,
    onlineCount,
    isSearchingInstant,
    startInstantMatch,
  };
};

export default useHomeFeed;
