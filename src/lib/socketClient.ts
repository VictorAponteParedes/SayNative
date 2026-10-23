import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '@/config/api';

/**
 * URL base para WebSockets eliminando el sufijo '/api/v1'
 */
const getSocketUrl = (): string => {
  const base = API_CONFIG.BASE_URL;
  return base.replace(/\/api\/v1\/?$/, '');
};

let socketInstance: Socket | null = null;

export interface SocketConnectionOptions {
  token?: string;
  namespace?: string;
}

/**
 * Obtiene o inicializa la conexión singleton de Socket.IO
 */
export const getSocket = (options?: SocketConnectionOptions): Socket => {
  if (socketInstance && socketInstance.connected) {
    return socketInstance;
  }

  const socketUrl = getSocketUrl();
  const namespace = options?.namespace || '/calls';
  const fullUrl = `${socketUrl}${namespace.startsWith('/') ? namespace : `/${namespace}`}`;

  if (!socketInstance) {
    socketInstance = io(fullUrl, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      transports: ['websocket', 'polling'],
      auth: (cb) => {
        cb({
          token: options?.token || '',
        });
      },
    });

    socketInstance.on('connect', () => {
      // Conexión establecida
    });

    socketInstance.on('disconnect', (_reason) => {
      // Conexión terminada
    });

    socketInstance.on('connect_error', (_error) => {
      // Error de conexión
    });
  }

  return socketInstance;
};

/**
 * Desconecta y limpia la instancia de socket
 */
export const disconnectSocket = (): void => {
  if (socketInstance) {
    socketInstance.removeAllListeners();
    socketInstance.disconnect();
    socketInstance = null;
  }
};

export default getSocket;
