import { io, Socket } from 'socket.io-client';
import { API_CONFIG } from '@/config/api';

/**
 * URL base para WebSockets eliminando el sufijo '/api/v1'
 */
const getSocketUrl = (): string => {
  const base = API_CONFIG.BASE_URL;
  return base.replace(/\/api(\/v1)?\/?$/, '');
};

const socketInstances: Record<string, Socket> = {};

export interface SocketConnectionOptions {
  token?: string;
  namespace?: string;
}

/**
 * Obtiene o inicializa la conexión singleton de Socket.IO según el namespace
 */
export const getSocket = (options?: SocketConnectionOptions): Socket => {
  const rawNamespace = options?.namespace || '/calls';
  const namespace = rawNamespace.startsWith('/') ? rawNamespace : `/${rawNamespace}`;

  if (socketInstances[namespace] && socketInstances[namespace].connected) {
    return socketInstances[namespace];
  }

  const socketUrl = getSocketUrl();
  const fullUrl = `${socketUrl}${namespace}`;

  if (!socketInstances[namespace]) {
    const socket = io(fullUrl, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      transports: ['websocket', 'polling'],
      auth: cb => {
        const storedToken =
          require('@/store/useAuthStore').useAuthStore.getState().token;
        cb({
          token: options?.token || storedToken || '',
        });
      },
    });

    socket.on('connect', () => {
      if (__DEV__) {
        console.log(`[Socket ${namespace}] Conectado exitosamente a:`, fullUrl);
      }
      const authUser = require('@/store/useAuthStore').useAuthStore.getState()
        .user;
      if (authUser && authUser.id) {
        if (namespace === '/calls') {
          socket.emit('call:register-user', { userId: authUser.id });
        } else if (namespace === '/chats') {
          socket.emit('chat:register-user', { userId: authUser.id });
        }
      }
    });

    socket.on('disconnect', reason => {
      if (__DEV__) {
        console.log(`[Socket ${namespace}] Desconectado. Razón:`, reason);
      }
    });

    socket.on('connect_error', error => {
      if (__DEV__) {
        console.warn(`[Socket ${namespace}] Error de conexión a`, fullUrl, error.message);
      }
    });

    socketInstances[namespace] = socket;
  }

  return socketInstances[namespace];
};

/**
 * Desconecta y limpia la instancia de socket del namespace especificado, o todas si no se especifica.
 */
export const disconnectSocket = (namespace?: string): void => {
  if (namespace) {
    const cleanNamespace = namespace.startsWith('/') ? namespace : `/${namespace}`;
    if (socketInstances[cleanNamespace]) {
      socketInstances[cleanNamespace].removeAllListeners();
      socketInstances[cleanNamespace].disconnect();
      delete socketInstances[cleanNamespace];
    }
  } else {
    Object.keys(socketInstances).forEach(key => {
      socketInstances[key].removeAllListeners();
      socketInstances[key].disconnect();
      delete socketInstances[key];
    });
  }
};

export default getSocket;
