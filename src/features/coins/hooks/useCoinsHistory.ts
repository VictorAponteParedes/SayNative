import { useState, useMemo, useEffect, useCallback } from 'react';
import { useCoinsStore } from '../store/useCoinsStore';
import { useAuthStore } from '@/store/useAuthStore';
import { coinsApi, CoinBackendTransaction } from '../api/coinsApi';
import type {
  CoinTransaction,
  TransactionFilter,
  TransactionSectionGroup,
} from '../types';

const MOCK_TRANSACTIONS: CoinTransaction[] = [
  {
    id: 'tx-1',
    titleKey: 'items.popularPurchase',
    subtitleKey: 'items.appleIap',
    amount: 900,
    type: 'purchase',
    iconType: 'card',
    section: 'today',
  },
  {
    id: 'tx-2',
    titleKey: 'items.callSarah',
    subtitleKey: 'items.callSarahSub',
    amount: -80,
    type: 'spent',
    iconType: 'call',
    section: 'today',
  },
  {
    id: 'tx-3',
    titleKey: 'items.taughtDavid',
    subtitleKey: 'items.taughtDavidSub',
    amount: 84,
    type: 'earned',
    iconType: 'tutor',
    section: 'thisWeek',
  },
  {
    id: 'tx-4',
    titleKey: 'items.adReward',
    subtitleKey: 'items.adRewardSub',
    amount: 5,
    type: 'earned',
    iconType: 'ad',
    section: 'thisWeek',
  },
  {
    id: 'tx-5',
    titleKey: 'items.welcomeBonus',
    subtitleKey: 'items.welcomeBonusSub',
    amount: 1000,
    type: 'earned',
    iconType: 'gift',
    section: 'september2024',
  },
];

export const useCoinsHistory = () => {
  const user = useAuthStore((state) => state.user);
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('all');
  const currentBalance = useCoinsStore((state) => state.coins);
  const totalEarned = useCoinsStore((state) => state.totalEarned);
  const totalConsumed = useCoinsStore((state) => state.totalSpent);
  const storeTransactions = useCoinsStore((state) => state.transactions);
  const [backendTransactions, setBackendTransactions] = useState<CoinTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!user.id) return;
    setIsLoading(true);
    try {
      const list = await coinsApi.getHistory(user.id);
      if (Array.isArray(list) && list.length > 0) {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const startOfWeek = startOfToday - 7 * 24 * 60 * 60 * 1000;

        const mapped: CoinTransaction[] = list.map((tx: CoinBackendTransaction) => {
          const txTime = new Date(tx.createdAt).getTime();
          let section: 'today' | 'thisWeek' | 'september2024' = 'september2024';
          if (txTime >= startOfToday) {
            section = 'today';
          } else if (txTime >= startOfWeek) {
            section = 'thisWeek';
          }

          let iconType: 'card' | 'call' | 'tutor' | 'ad' | 'gift' = 'card';
          if (tx.type === 'REWARD_AD') iconType = 'ad';
          else if (tx.type === 'WELCOME_BONUS') iconType = 'gift';
          else if (tx.type === 'CALL_EARNING') iconType = 'tutor';
          else if (tx.type === 'CALL_EXPENSE') iconType = 'call';

          return {
            id: tx.id,
            titleKey: tx.description,
            subtitleKey: new Date(tx.createdAt).toLocaleDateString([], {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            }),
            amount: tx.amount,
            type: tx.amount > 0 ? (tx.type === 'RECHARGE' ? 'purchase' : 'earned') : 'spent',
            iconType,
            section,
          };
        });
        setBackendTransactions(mapped);
      }
    } catch (err) {
      if (__DEV__) {
        console.log('[useCoinsHistory] Error cargando historial backend:', err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const allTransactions =
    backendTransactions.length > 0
      ? backendTransactions
      : storeTransactions.length > 0
      ? storeTransactions
      : MOCK_TRANSACTIONS;

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'all') {
      return allTransactions;
    }
    return allTransactions.filter((item) => {
      if (activeFilter === 'purchases') return item.type === 'purchase';
      if (activeFilter === 'earned') return item.type === 'earned';
      if (activeFilter === 'spent') return item.type === 'spent';
      return true;
    });
  }, [activeFilter, allTransactions]);

  const sections = useMemo<TransactionSectionGroup[]>(() => {
    const sectionKeys: ('today' | 'thisWeek' | 'september2024')[] = [
      'today',
      'thisWeek',
      'september2024',
    ];

    return sectionKeys
      .map((key) => {
        const items = filteredTransactions.filter((tx) => tx.section === key);
        return {
          sectionKey: key,
          data: items,
        };
      })
      .filter((group) => group.data.length > 0);
  }, [filteredTransactions]);

  return {
    activeFilter,
    setActiveFilter,
    currentBalance,
    totalEarned,
    totalConsumed,
    sections,
    allCount: filteredTransactions.length,
    isLoading,
    refreshHistory: fetchHistory,
  };
};
