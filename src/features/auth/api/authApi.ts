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
  async register(payload: RegisterPayload): Promise<RegisteredUser> {
    try {
      const response = await httpClient.post<
        | BackendWrapper<{ user?: RegisteredUser } & RegisteredUser>
        | RegisteredUser
      >('/auth/register', payload);

      if (
        response.data &&
        typeof response.data === 'object' &&
        'data' in response.data &&
        response.data.data
      ) {
        const d = (
          response.data as BackendWrapper<
            {
              user?: RegisteredUser;
              accessToken?: string;
              refreshToken?: string;
              token?: string;
            } & RegisteredUser
          >
        ).data;
        if (d.user) {
          return {
            ...d.user,
            accessToken:
              d.accessToken ||
              d.token ||
              (d.user as RegisteredUser).accessToken,
            refreshToken:
              d.refreshToken || (d.user as RegisteredUser).refreshToken,
          };
        }
        return d as RegisteredUser;
      }

      const resAny = response.data as {
        user?: RegisteredUser;
        accessToken?: string;
        refreshToken?: string;
        token?: string;
      } & RegisteredUser;
      if (resAny.user) {
        return {
          ...resAny.user,
          accessToken:
            resAny.accessToken || resAny.token || resAny.user.accessToken,
          refreshToken: resAny.refreshToken || resAny.user.refreshToken,
        };
      }
      return resAny;
    } catch {
      // Fallback de compatibilidad con /users
      const fallback = await httpClient.post<
        BackendWrapper<RegisteredUser> | RegisteredUser
      >('/users', payload);

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

  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await httpClient.post<
      BackendWrapper<LoginResponse> | LoginResponse
    >('/auth/login', payload);

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

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const response = await httpClient.post<
      BackendWrapper<{ accessToken: string; refreshToken: string }>
    >('/auth/refresh', { refreshToken });

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (
        response.data as BackendWrapper<{
          accessToken: string;
          refreshToken: string;
        }>
      ).data;
    }

    return response.data as unknown as {
      accessToken: string;
      refreshToken: string;
    };
  },

  async logout(refreshToken: string): Promise<void> {
    try {
      await httpClient.post('/auth/logout', { refreshToken });
    } catch {
      // Ignorar errores al cerrar sesión
    }
  },
};

export default authApi;
