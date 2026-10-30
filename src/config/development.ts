import { AppConfig } from './types';

export const config: AppConfig = {
  appName: 'AmistTalk',
  baseUrl: 'http://192.168.47.37:3000/api/v1',
  environment: 'development',
  timeout: 10000,
  agoraAppId: '3fcb9c6a314b4d2695aaee25bdf6b5dc',
  googleWebClientId:
    '543452374033-c90jv0rpipdp2k8vkmg4l2sh06903f9g.apps.googleusercontent.com',
  admob: {
    banner: '',
    rewarded: '',
    interstitial: '',
  },
};

export default config;
