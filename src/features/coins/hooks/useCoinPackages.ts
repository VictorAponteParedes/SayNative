import { useState, useCallback } from 'react';
import { useCoinsStore } from '../store/useCoinsStore';
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
  const currentCoins = useCoinsStore((state) => state.coins);
  const adsAvailable = useCoinsStore((state) => state.adsRemaining);
  const totalAds = useCoinsStore((state) => state.totalAdsPerDay);
  const watchRewardedAd = useCoinsStore((state) => state.watchRewardedAd);
  const chargeCoins = useCoinsStore((state) => state.chargeCoins);

  const purchasePackage = useCallback(
    (pkg: CoinPackage) => {
      const numericCoins = parseInt(pkg.coinsCount.replace(/,/g, ''), 10) || 0;
      chargeCoins(numericCoins, {
        titleKey: pkg.titleKey,
        subtitleKey: pkg.price,
      });
    },
    [chargeCoins]
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
