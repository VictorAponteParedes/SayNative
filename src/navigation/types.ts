export type AppStackParamList = {
  Home: undefined;
  Explore: undefined;
  Chats: undefined;
  PrivateChat?: {
    chatId: string;
    partnerName?: string;
    partnerAvatar?: string;
    partnerFlag?: string;
    ratePerMinute?: number;
  };
  Profile: undefined;
  EditProfile?: undefined;
  ActiveCall?: {
    peerId: string;
    peerName: string;
    peerAvatar?: string;
    ratePerMinute?: number;
  };
  CallLobby?: {
    peerId: string;
    peerName?: string;
  };
  Coins?: undefined;
  CoinsHistory?: undefined;
  Notifications?: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type RootStackParamList = AppStackParamList & AuthStackParamList;
