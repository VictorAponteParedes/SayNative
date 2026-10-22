export type AppStackParamList = {
  Home: undefined;
  Explore: undefined;
  Chats: undefined;
  Profile: undefined;
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
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type RootStackParamList = AppStackParamList & AuthStackParamList;
