export interface PeerUser {
  id: string;
  name: string;
  age: number;
  avatarUrl: string;
  isOnline: boolean;
  countryFlag: string;
  rating: number;
  reviewsCount: number;
  tags: string[];
  ratePerMinute: number;
}

export interface HomeFeedData {
  featuredPeers: PeerUser[];
  onlineCount: number;
}
