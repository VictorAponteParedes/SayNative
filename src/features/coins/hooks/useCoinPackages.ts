import { useState, useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { CoinPackage } from '../types';

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'pkg_basic',
    type: 'basic',
    price: '$2.99',
    currency: 'USD',
    badge: 'ENTRADA',
    titleKey: 'packages.basic.title',
    coinsCount: '200',
    subtitleKey: 'packages.basic.subtitle',
    buttonKey: 'packages.basic.button',
    iconType: 'coin',
  },
  {
    id: 'pkg_popular',
    type: 'popular',
    price: '$9.99',
    currency: 'USD',
    floatingBadge: '🔥 MÁS POPULAR',
    promoBadge: '+12% extra gratis',
    titleKey: 'packages.popular.title',
    coinsCount: '900',
    originalCoinsCount: '800',
    subtitleKey: 'packages.popular.subtitle',
    buttonKey: 'packages.popular.button',
    iconType: 'silver',
  },
  {
    id: 'pkg_best_value',
    type: 'bestValue',
    price: '$19.99',
    currency: 'USD',
    floatingBadge: '⭐ MEJOR VALOR · AHORRA 30%',
    promoBadge: '+500 monedas de regalo',
    titleKey: 'packages.bestValue.title',
    coinsCount: '2,500',
    originalCoinsCount: '2,000',
    subtitleKey: 'packages.bestValue.subtitle',
    buttonKey: 'packages.bestValue.button',
    iconType: 'crown',
  },
];

export const useCoinPackages = () => {
  const addCoins = useAuthStore((state) => state.addCoins);
  const currentCoins = useAuthStore((state) => state.user.coins);
  const [adsAvailable, setAdsAvailable] = useState<number>(3);
  const [totalAds] = useState<number>(3);

  const watchRewardedAd = useCallback((): boolean => {
    if (adsAvailable <= 0) return false;
    setAdsAvailable((prev) => Math.max(0, prev - 1));
    addCoins(5);
    return true;
  }, [adsAvailable, addCoins]);

  const purchasePackage = useCallback(
    (pkg: CoinPackage) => {
      const numericCoins = parseInt(pkg.coinsCount.replace(/,/g, ''), 10) || 0;
      addCoins(numericCoins);
    },
    [addCoins]
  );

  return {
    packages: COIN_PACKAGES,
    currentCoins,
    adsAvailable,
    totalAds,
    watchRewardedAd,
    purchasePackage,
  };
};
