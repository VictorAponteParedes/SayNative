import devConfig from './development';
import prodConfig from './production';
import { AppConfig } from './types';

// Detect environment (__DEV__ is true in debug/development mode)
const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : false;
const env = isDev ? 'development' : 'production';
const selectedConfig: AppConfig = isDev ? devConfig : prodConfig;

if (isDev) {
  console.log(`[${selectedConfig.appName}] Running in ${env} mode`);
  console.log(`[API Base URL]: ${selectedConfig.baseUrl}`);
}

export const config = {
  ...selectedConfig,
  env,
  isDev,
};

export const API_CONFIG = {
  get BASE_URL() {
    return config.baseUrl;
  },
  get TIMEOUT() {
    return config.timeout ?? 10000;
  },
} as const;

export * from './types';
export default config;
