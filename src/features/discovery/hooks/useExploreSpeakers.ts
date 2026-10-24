import { useState, useMemo, useCallback, useEffect } from 'react';
import httpClient from '@/lib/httpClient';
import { useAuthStore } from '@/store/useAuthStore';
import { ApiResponse } from '@/types';
import {
  SpeakerUser,
  BackendUserItem,
  ExploreFilterType,
  ExploreSortType,
} from '../types';

const mapBackendUserToSpeaker = (u: BackendUserItem): SpeakerUser => {
  const nativeLangs = u.userLanguages?.filter(l => l.isNative) || [];
  const learningLangs = u.userLanguages?.filter(l => !l.isNative) || [];

  const nativeStr =
    nativeLangs.length > 0
      ? nativeLangs
          .map(l => `${u.countryFlag || '🌐'} ${l.languageCode.toUpperCase()}`)
          .join(', ')
      : `${u.countryFlag || '🇺🇸'} Inglés`;

  const learningStr =
    learningLangs.length > 0
      ? learningLangs
          .map(
            l =>
              `🇪🇸 ${l.languageCode.toUpperCase()} (${
                l.proficiencyLevel || 'B1'
              })`,
          )
          .join(', ')
      : '🇪🇸 Español (Intermedio)';

  const defaultTags = ['Conversación', 'Práctica', 'Cultura'];
  const tags =
    u.bio && u.bio.length > 0
      ? u.bio
          .split(',')
          .map(t => t.trim())
          .filter(Boolean)
          .slice(0, 3)
      : defaultTags;

  return {
    id: u.id,
    name: u.fullName || 'Compañero',
    age: 26,
    avatarUrl: u.avatar?.url || '',
    countryFlag: u.countryFlag || '🌐',
    isOnline: true,
    isVerified: Boolean(u.isVerified),
    badge: u.isAvailableToTeach ? 'SUPER TUTOR' : undefined,
    rating: Number(u.rating) || 5.0,
    reviewsCount: Number(u.reviewCount) || 0,
    ratePerMinute: Number(u.learningCostPerMin) || 10,
    nativeLanguages: nativeStr,
    learningLanguages: learningStr,
    tags: tags.length > 0 ? tags : defaultTags,
  };
};

export const useExploreSpeakers = () => {
  const currentUserId = useAuthStore(s => s.user.id);
  const [speakersList, setSpeakersList] = useState<SpeakerUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<ExploreFilterType>('online');
  const [currentSort, setCurrentSort] = useState<ExploreSortType>('relevant');

  const fetchSpeakers = useCallback(async () => {
    try {
      const response = await httpClient.get<
        ApiResponse<BackendUserItem[]> | BackendUserItem[]
      >('/users', {
        headers: currentUserId ? { 'x-user-id': currentUserId } : {},
      });

      const rawData =
        response.data && 'data' in response.data
          ? response.data.data
          : response.data;

      if (Array.isArray(rawData)) {
        const mapped = rawData
          .filter(u => u.id !== currentUserId)
          .map(mapBackendUserToSpeaker);
        setSpeakersList(mapped);
      } else {
        setSpeakersList([]);
      }
    } catch {
      setSpeakersList([]);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchSpeakers();
  }, [fetchSpeakers]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchSpeakers();
  }, [fetchSpeakers]);

  const filteredAndSortedSpeakers = useMemo(() => {
    let result = speakersList.filter(speaker => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speaker.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ||
        speaker.nativeLanguages
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        speaker.learningLanguages
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === 'online'
          ? speaker.isOnline
          : activeFilter === 'native_english'
          ? speaker.nativeLanguages.toLowerCase().includes('inglés') ||
            speaker.nativeLanguages.toLowerCase().includes('english') ||
            speaker.nativeLanguages.toLowerCase().includes('en')
          : activeFilter === 'top_rated'
          ? speaker.rating >= 4.8
          : true;

      return matchesSearch && matchesFilter;
    });

    if (currentSort === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (currentSort === 'price_low') {
      result = [...result].sort((a, b) => a.ratePerMinute - b.ratePerMinute);
    } else if (currentSort === 'price_high') {
      result = [...result].sort((a, b) => b.ratePerMinute - a.ratePerMinute);
    }

    return result;
  }, [speakersList, searchQuery, activeFilter, currentSort]);

  return {
    speakers: filteredAndSortedSpeakers,
    isLoading,
    isRefreshing,
    onRefresh,
    totalAvailable: filteredAndSortedSpeakers.length,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    currentSort,
    setCurrentSort,
  };
};

export default useExploreSpeakers;
