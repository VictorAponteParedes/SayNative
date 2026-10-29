import { useState, useCallback, useEffect } from 'react';
import { useCoinsStore } from '../store/useCoinsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { coinsApi } from '../api/coinsApi';
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
  const user = useAuthStore((state) => state.user);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);
  const currentCoins = useCoinsStore((state) => state.coins);
  const adsAvailable = useCoinsStore((state) => state.adsRemaining);
  const totalAds = useCoinsStore((state) => state.totalAdsPerDay);
  const watchRewardedAdStore = useCoinsStore((state) => state.watchRewardedAd);
  const chargeCoinsStore = useCoinsStore((state) => state.chargeCoins);
  const setCoins = useCoinsStore((state) => state.setCoins);

  const [isLoading, setIsLoading] = useState(false);

  // Sincronizar saldo con el backend si hay user.id
  const refreshBalance = useCallback(async () => {
    if (!user.id) return;
    try {
      const balance = await coinsApi.getBalance(user.id);
      setCoins(balance);
      updateUserProfile({ coins: balance });
    } catch {
      // Ignorar si está temporalmente offline
    }
  }, [user.id, setCoins, updateUserProfile]);

  useEffect(() => {
    refreshBalance();
  }, [refreshBalance]);

  const purchasePackage = useCallback(
    async (pkg: CoinPackage) => {
      const numericCoins = parseInt(pkg.coinsCount.replace(/,/g, ''), 10) || 0;
      const cleanPrice = parseFloat(pkg.price.replace(/[^0-9.]/g, '')) || 0;

      // Actualizar estado local inmediatamente para UX instantánea
      chargeCoinsStore(numericCoins, {
        titleKey: pkg.titleKey,
        subtitleKey: pkg.price,
      });

      // Persistir transacción en la base de datos backend
      if (user.id) {
        setIsLoading(true);
        try {
          const res = await coinsApi.recharge(user.id, {
            packageId: pkg.id,
            amount: numericCoins,
            pricePaid: cleanPrice,
            currency: pkg.currency || 'USD',
          });
          if (res?.balance !== undefined) {
            setCoins(res.balance);
            updateUserProfile({ coins: res.balance });
          }
        } catch (err) {
          if (__DEV__) {
            console.log('[useCoinPackages] Error recargando en backend:', err);
          }
        } finally {
          setIsLoading(false);
        }
      }
    },
    [user.id, chargeCoinsStore, setCoins, updateUserProfile]
  );

  const watchRewardedAd = useCallback(async (): Promise<boolean> => {
    if (adsAvailable <= 0) return false;

    // Disminuir anuncio restante local
    const success = watchRewardedAdStore();
    if (!success) return false;

    // Reclamar en el backend para poblar la tabla wallets y coin_transactions
    if (user.id) {
      try {
        const res = await coinsApi.claimReward(user.id, {
          rewardType: 'AD_WATCH',
          amount: 5,
        });
        if (res?.balance !== undefined) {
          setCoins(res.balance);
          updateUserProfile({ coins: res.balance });
        }
      } catch (err) {
        if (__DEV__) {
          console.log('[useCoinPackages] Error reclamando anuncio en backend:', err);
        }
      }
    }
    return true;
  }, [adsAvailable, user.id, watchRewardedAdStore, setCoins, updateUserProfile]);

  return {
    packages: COIN_PACKAGES,
    currentCoins,
    adsAvailable,
    totalAds,
    isLoading,
    watchRewardedAd,
    purchasePackage,
    refreshBalance,
  };
};
