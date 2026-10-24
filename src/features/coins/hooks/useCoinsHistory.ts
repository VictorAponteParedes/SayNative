import { useState, useMemo } from 'react';
import { useCoinsStore } from '../store/useCoinsStore';
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
    titleKey: 'items.callEmma',
    subtitleKey: 'items.callEmmaSub',
    amount: -150,
    type: 'spent',
    iconType: 'call',
    section: 'thisWeek',
  },
  {
    id: 'tx-6',
    titleKey: 'items.welcomeBonus',
    subtitleKey: 'items.welcomeBonusSub',
    amount: 200,
    type: 'earned',
    iconType: 'gift',
    section: 'september2024',
  },
  {
    id: 'tx-7',
    titleKey: 'items.basicPurchase',
    subtitleKey: 'items.googlePlay',
    amount: 200,
    type: 'purchase',
    iconType: 'card',
    section: 'september2024',
  },
];

export const useCoinsHistory = () => {
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>('all');
  const currentBalance = useCoinsStore((state) => state.coins);
  const totalEarned = useCoinsStore((state) => state.totalEarned);
  const totalConsumed = useCoinsStore((state) => state.totalSpent);
  const storeTransactions = useCoinsStore((state) => state.transactions);

  const allTransactions = storeTransactions.length > 0 ? storeTransactions : MOCK_TRANSACTIONS;

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
  };
};
