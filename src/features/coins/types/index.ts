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
