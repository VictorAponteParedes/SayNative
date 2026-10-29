import { Platform } from 'react-native';

/**
 * Configuración de la API del Backend.
 *
 * En Android Emulator:
 * - '10.0.2.2' es el alias del sistema que apunta directamente a 'localhost' de tu Mac/PC.
 * En iOS Simulator:
 * - 'localhost' apunta directamente a tu Mac.
 * En Dispositivo Físico (Wi-Fi):
 * - Usa la IP local actual de tu máquina (tu IP actual es 192.168.47.37).
 * - O ejecuta en terminal: `adb reverse tcp:3000 tcp:3000` para usar 'localhost:3000'.
 */
const getDevBaseUrl = (): string => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api/v1';
  }
  return 'http://localhost:3000/api/v1';
};

export const API_CONFIG = {
  BASE_URL: getDevBaseUrl(),
  // 10 segundos: Un timeout saludable para peticiones locales con DB/hash/WebSockets.
  // El valor anterior (1500 ms = 1.5s) abortaba las conexiones prematuramente.
  TIMEOUT: 10000,
} as const;

export default API_CONFIG;
