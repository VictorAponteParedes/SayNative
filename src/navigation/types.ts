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
    callId?: string;
    peerId: string;
    peerName: string;
    peerAvatar?: string;
    peerFlag?: string;
    ratePerMinute?: number;
  };
  CallLobby?: {
    peerId: string;
    peerName?: string;
    peerAvatar?: string;
    peerFlag?: string;
    ratePerMinute?: number;
    isIncoming?: boolean;
  };
  Coins?: undefined;
  CoinsHistory?: undefined;
  Notifications?: undefined;
  Security?: undefined;
  Support?: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type RootStackParamList = AppStackParamList & AuthStackParamList;
