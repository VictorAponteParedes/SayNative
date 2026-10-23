import { Platform } from 'react-native';

export const API_CONFIG = {
  // En Android Emulator 10.0.2.2 mapea a localhost de la máquina host
  // En iOS Simulator localhost mapea a la máquina host
  BASE_URL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/api/v1'
      : 'http://localhost:3000/api/v1',
  TIMEOUT: 15000,
} as const;

export default API_CONFIG;
