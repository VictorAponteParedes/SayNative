export interface CoinPackage {
  id: string;
  type: 'basic' | 'popular' | 'bestValue';
  price: string;
  currency: string;
  badge?: string;
  floatingBadge?: string;
  promoBadge?: string;
  titleKey: string;
  coinsCount: string;
  originalCoinsCount?: string;
  subtitleKey: string;
  buttonKey: string;
  iconType: 'coin' | 'silver' | 'crown';
  accentColor?: string;
}

export type TransactionFilter = 'all' | 'purchases' | 'earned' | 'spent';

export type TransactionType = 'purchase' | 'earned' | 'spent';

export type TransactionIconType = 'card' | 'call' | 'tutor' | 'ad' | 'gift';

export interface CoinTransaction {
  id: string;
  titleKey: string;
  subtitleKey: string;
  amount: number;
  type: TransactionType;
  iconType: TransactionIconType;
  section: 'today' | 'thisWeek' | 'september2024';
}

export interface TransactionSectionGroup {
  sectionKey: 'today' | 'thisWeek' | 'september2024';
  data: CoinTransaction[];
}
