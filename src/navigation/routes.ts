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
    Profile: 'Profile',
    ActiveCall: 'ActiveCall',
    CallLobby: 'CallLobby',
    Coins: 'Coins',
  },
} as const;

export type RouteValues =
  | (typeof Routes.Auth)[keyof typeof Routes.Auth]
  | (typeof Routes.App)[keyof typeof Routes.App];
