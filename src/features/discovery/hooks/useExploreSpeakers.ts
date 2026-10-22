import { useState, useMemo } from 'react';
import { SpeakerUser, ExploreFilterType, ExploreSortType } from '../types';

const INITIAL_SPEAKERS: SpeakerUser[] = [
  {
    id: 'spk_1',
    name: 'Emma',
    age: 26,
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    countryFlag: '🇺🇸',
    isOnline: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 210,
    ratePerMinute: 10,
    nativeLanguages: '🇺🇸 Inglés',
    learningLanguages: '🇪🇸 Español (B1)',
    tags: ['Música', 'Fotografía', 'Negocios'],
  },
  {
    id: 'spk_2',
    name: 'Liam',
    age: 29,
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    countryFlag: '🇬🇧',
    isOnline: true,
    badge: 'SUPER TUTOR',
    rating: 5.0,
    reviewsCount: 184,
    ratePerMinute: 12,
    nativeLanguages: '🇬🇧 Inglés',
    learningLanguages: '🇪🇸 Español (A2)',
    tags: ['Cine', 'Tecnología', 'Videojuegos'],
  },
  {
    id: 'spk_3',
    name: 'Chloe',
    age: 25,
    avatarUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    countryFlag: '🇨🇦',
    isOnline: true,
    isVerified: true,
    rating: 4.8,
    reviewsCount: 95,
    ratePerMinute: 8,
    nativeLanguages: '🇨🇦 Inglés, Francés',
    learningLanguages: '🇪🇸 Español (B2)',
    tags: ['Literatura', 'Viajes', 'Cocina'],
  },
  {
    id: 'spk_4',
    name: 'Oliver',
    age: 27,
    avatarUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    countryFlag: '🇦🇺',
    isOnline: true,
    isVerified: true,
    rating: 4.9,
    reviewsCount: 132,
    ratePerMinute: 10,
    nativeLanguages: '🇦🇺 Inglés',
    learningLanguages: '🇪🇸 Español (Intermedio)',
    tags: ['Deportes', 'Surf', 'Idiomas'],
  },
];

export const useExploreSpeakers = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<ExploreFilterType>('online');
  const [currentSort, setCurrentSort] = useState<ExploreSortType>('relevant');

  const filteredSpeakers = useMemo(() => {
    return INITIAL_SPEAKERS.filter((speaker) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        speaker.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        speaker.nativeLanguages
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFilter =
        activeFilter === 'online'
          ? speaker.isOnline
          : activeFilter === 'native_english'
          ? speaker.nativeLanguages.includes('Inglés')
          : activeFilter === 'top_rated'
          ? speaker.rating >= 4.9
          : true;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    currentSort,
    setCurrentSort,
    speakers: filteredSpeakers,
    totalAvailable: 142,
  };
};
