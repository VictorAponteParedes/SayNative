import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CoinTransaction,
  TransactionType,
  TransactionIconType,
} from '../types';

export interface CoinsState {
  coins: number;
  isLoading: boolean;
  adsRemaining: number;
  totalAdsPerDay: number;
  totalEarned: number;
  totalSpent: number;
  transactions: CoinTransaction[];

  // Acciones de Monedas
  setCoins: (amount: number) => void;
  chargeCoins: (amount: number, details?: { titleKey?: string; subtitleKey?: string }) => void;
  spendCoins: (amount: number, details?: { titleKey?: string; subtitleKey?: string }) => boolean;
  rewardCoins: (
    amount: number,
    details?: {
      titleKey?: string;
      subtitleKey?: string;
      iconType?: TransactionIconType;
    }
  ) => void;
  watchRewardedAd: () => boolean;
  claimStreakBonus: () => void;
  claimWelcomeBonus: () => void;
  addCoins: (amount: number) => void;
  deductCoins: (amount: number) => void;
  resetCoins: () => void;
}

export const INITIAL_COINS = 0;
export const DEFAULT_ADS_PER_DAY = 3;

const INITIAL_TRANSACTIONS: CoinTransaction[] = [
  {
    id: 'tx-init-1',
    titleKey: 'items.welcomeBonus',
    subtitleKey: 'items.welcomeBonusSub',
    amount: 50,
    type: 'earned',
    iconType: 'gift',
    section: 'today',
  },
];

export const useCoinsStore = create<CoinsState>()(
  persist(
    (set, get) => ({
      coins: INITIAL_COINS,
      isLoading: false,
      adsRemaining: DEFAULT_ADS_PER_DAY,
      totalAdsPerDay: DEFAULT_ADS_PER_DAY,
      totalEarned: 50,
      totalSpent: 0,
      transactions: INITIAL_TRANSACTIONS,

      // Establece saldo directo (ej. desde sincronización con backend)
      setCoins: (amount: number) => {
        const safeAmount = Math.max(0, amount);
        set({ coins: safeAmount });
      },

      // Carga / Compra de monedas (In-App Purchases)
      chargeCoins: (amount, details) => {
        const safeAmount = Math.max(0, amount);
        const newTransaction: CoinTransaction = {
          id: `tx-purchase-${Date.now()}`,
          titleKey: details?.titleKey || 'items.popularPurchase',
          subtitleKey: details?.subtitleKey || 'items.appleIap',
          amount: safeAmount,
          type: 'purchase',
          iconType: 'card',
          section: 'today',
        };

        set((state) => ({
          coins: state.coins + safeAmount,
          totalEarned: state.totalEarned + safeAmount,
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      // Descuento / Consumo de monedas (ej. llamadas con tutores)
      spendCoins: (amount, details) => {
        const currentBalance = get().coins;
        const safeAmount = Math.max(0, amount);

        if (currentBalance < safeAmount) {
          return false;
        }

        const newTransaction: CoinTransaction = {
          id: `tx-spent-${Date.now()}`,
          titleKey: details?.titleKey || 'items.callCompleted',
          subtitleKey: details?.subtitleKey || 'items.callSarahSub',
          amount: -safeAmount,
          type: 'spent',
          iconType: 'call',
          section: 'today',
        };

        set((state) => ({
          coins: Math.max(0, state.coins - safeAmount),
          totalSpent: state.totalSpent + safeAmount,
          transactions: [newTransaction, ...state.transactions],
        }));

        return true;
      },

      // Recompensa / Regalo de monedas (anuncios, logros, racha, etc.)
      rewardCoins: (amount, details) => {
        const safeAmount = Math.max(0, amount);
        const newTransaction: CoinTransaction = {
          id: `tx-reward-${Date.now()}`,
          titleKey: details?.titleKey || 'items.bonusReward',
          subtitleKey: details?.subtitleKey || 'items.giftSub',
          amount: safeAmount,
          type: 'earned',
          iconType: details?.iconType || 'gift',
          section: 'today',
        };

        set((state) => ({
          coins: state.coins + safeAmount,
          totalEarned: state.totalEarned + safeAmount,
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      // Ver anuncio bonificado (+5 monedas y descuenta anuncio disponible)
      watchRewardedAd: () => {
        const state = get();
        if (state.adsRemaining <= 0) {
          return false;
        }

        const adReward = 5;
        const newTransaction: CoinTransaction = {
          id: `tx-ad-${Date.now()}`,
          titleKey: 'items.adReward',
          subtitleKey: 'items.adRewardSub',
          amount: adReward,
          type: 'earned',
          iconType: 'ad',
          section: 'today',
        };

        set((prev) => ({
          coins: prev.coins + adReward,
          adsRemaining: Math.max(0, prev.adsRemaining - 1),
          totalEarned: prev.totalEarned + adReward,
          transactions: [newTransaction, ...prev.transactions],
        }));

        return true;
      },

      // Bono de racha diaria (+10 monedas)
      claimStreakBonus: () => {
        get().rewardCoins(10, {
          titleKey: 'items.streakBonus',
          subtitleKey: 'items.streakClaimed',
          iconType: 'gift',
        });
      },

      // Bono de bienvenida (+50 monedas)
      claimWelcomeBonus: () => {
        get().rewardCoins(50, {
          titleKey: 'items.welcomeBonus',
          subtitleKey: 'items.welcomeBonusSub',
          iconType: 'gift',
        });
      },

      // Helper simple para acreditar monedas
      addCoins: (amount: number) => {
        get().rewardCoins(amount);
      },

      // Helper simple para descontar monedas
      deductCoins: (amount: number) => {
        get().spendCoins(amount);
      },

      // Restablece el store al estado inicial (ej. al hacer logout)
      resetCoins: () =>
        set({
          coins: INITIAL_COINS,
          isLoading: false,
          adsRemaining: DEFAULT_ADS_PER_DAY,
          totalEarned: 0,
          totalSpent: 0,
          transactions: [],
        }),
    }),
    {
      name: 'saynative-coins-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        coins: state.coins,
        adsRemaining: state.adsRemaining,
        totalEarned: state.totalEarned,
        totalSpent: state.totalSpent,
        transactions: state.transactions,
      }),
    }
  )
);
