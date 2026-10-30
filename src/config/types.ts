export interface AdmobConfig {
  banner: string;
  rewarded: string;
  interstitial: string;
}

export interface AppConfig {
  appName: string;
  baseUrl: string;
  environment: 'development' | 'production';
  timeout?: number;
  agoraAppId?: string;
  googleWebClientId?: string;
  admob: AdmobConfig;
}
