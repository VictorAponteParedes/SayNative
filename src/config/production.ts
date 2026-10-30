import { AppConfig } from './types';

export const config: AppConfig = {
  appName: 'AmistTalk',
  baseUrl: 'https://amisttalk-backend.onrender.com/api/v1',
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
