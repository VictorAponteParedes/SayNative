import { useState, useCallback } from 'react';
import { PeerUser } from '../types';

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
  {
    id: 'peer_3',
    name: 'Emma',
    age: 26,
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    isOnline: true,
    countryFlag: '🇬🇧',
    rating: 4.8,
    reviewsCount: 76,
    tags: ['Arte', 'Literatura'],
    ratePerMinute: 10,
  },
];

export const useHomeFeed = () => {
  const [peers, setPeers] = useState<PeerUser[]>(INITIAL_PEERS);
  const [onlineCount] = useState<number>(3);
  const [isSearchingInstant, setIsSearchingInstant] = useState<boolean>(false);

  const startInstantMatch = useCallback(() => {
    setIsSearchingInstant(true);
    // Simulación de búsqueda instantánea
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
