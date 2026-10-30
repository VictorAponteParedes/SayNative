import { AppConfig } from './types';

export const config: AppConfig = {
  appName: 'AmistTalk',
  baseUrl: 'https://api.amistappofficial.com/api',
  environment: 'production',
  timeout: 10000,
  googleWebClientId:
    '543452374033-c90jv0rpipdp2k8vkmg4l2sh06903f9g.apps.googleusercontent.com',
  admob: {
    banner: '',
    rewarded: '',
    interstitial: '',
  },
};

export default config;
