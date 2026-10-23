import { httpClient } from '@/lib/httpClient';
import {
  RegisterPayload,
  RegisteredUser,
  LoginPayload,
  LoginResponse,
} from '../types';

interface BackendWrapper<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}

export const authApi = {
  /**
   * Registra un nuevo usuario en SayNative a través del backend NestJS.
   * Valida obligatoriamente que `acceptedTerms` sea true.
   */
  async register(payload: RegisterPayload): Promise<RegisteredUser> {
    try {
      const response = await httpClient.post<
        BackendWrapper<{ user?: RegisteredUser } & RegisteredUser> | RegisteredUser
      >('/auth/register', payload);

      if (
        response.data &&
        typeof response.data === 'object' &&
        'data' in response.data &&
        response.data.data
      ) {
        const d = (response.data as BackendWrapper<{ user?: RegisteredUser } & RegisteredUser>).data;
        return d.user || (d as RegisteredUser);
      }

      const resAny = response.data as { user?: RegisteredUser } & RegisteredUser;
      return resAny.user || resAny;
    } catch {
      // Fallback de compatibilidad con /users
      const fallback = await httpClient.post<BackendWrapper<RegisteredUser> | RegisteredUser>(
        '/users',
        payload,
      );

      if (
        fallback.data &&
        typeof fallback.data === 'object' &&
        'data' in fallback.data &&
        fallback.data.data
      ) {
        return (fallback.data as BackendWrapper<RegisteredUser>).data;
      }

      return fallback.data as RegisteredUser;
    }
  },

  /**
   * Inicia sesión en SayNative a través del backend NestJS (/auth/login).
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await httpClient.post<BackendWrapper<LoginResponse> | LoginResponse>(
      '/auth/login',
      payload
    );

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as BackendWrapper<LoginResponse>).data;
    }

    return response.data as LoginResponse;
  },
};

export default authApi;
