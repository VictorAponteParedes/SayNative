export const Routes = {
  Auth: {
    Login: 'Login',
    Register: 'Register',
    ForgotPassword: 'ForgotPassword',
  },
  App: {
    Home: 'Home',
    Explore: 'Explore',
    Chats: 'Chats',
    PrivateChat: 'PrivateChat',
    Profile: 'Profile',
    EditProfile: 'EditProfile',
    ActiveCall: 'ActiveCall',
    CallLobby: 'CallLobby',
    Coins: 'Coins',
    CoinsHistory: 'CoinsHistory',
  },
} as const;

export type RouteValues =
  | (typeof Routes.Auth)[keyof typeof Routes.Auth]
  | (typeof Routes.App)[keyof typeof Routes.App];
