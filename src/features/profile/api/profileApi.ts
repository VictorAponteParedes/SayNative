import { Platform, View } from 'react-native';
import { httpClient } from '@/lib/httpClient';

export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  birthDate?: string;
  countryCode?: string;
  countryFlag?: string;
  isAvailableToTeach?: boolean;
}

export interface SaveUserLanguagePayload {
  languageCode: string;
  languageName: string;
  flagEmoji: string;
  type: 'NATIVE' | 'LEARNING';
  cefrLevel: string;
  targetLevel?: string;
  progressPercentage: number;
}

export interface UserBackendResponse {
  id: string;
  email: string;
  fullName: string;
  birthDate?: string | Date | null;
  coins?: number;
  phone?: string | null;
  bio?: string | null;
  avatarId?: string | null;
  avatar?: {
    id: string;
    url: string;
    fileName?: string;
  } | null;
  countryCode?: string | null;
  countryFlag?: string | null;
  isVerified: boolean;
  isAvailableToTeach: boolean;
  earningRatePerMin: number;
  learningCostPerMin: number;
  rating: number;
  totalCalls: number;
  hoursPracticed: number;
  reviewCount: number;
  acceptedTerms: boolean;
  userLanguages?: Array<{
    id?: string;
    languageCode: string;
    languageName: string;
    flagEmoji?: string;
    type: 'NATIVE' | 'LEARNING';
    cefrLevel?: string | null;
    targetLevel?: string | null;
    progressPercentage?: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponseWrapper<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  timestamp: string;
}

export const profileApi = {
  async getProfile(userId: string): Promise<UserBackendResponse> {
    const response = await httpClient.get<
      ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
    >('/users/me', {
      headers: {
        'x-user-id': userId,
      },
    });

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as ApiResponseWrapper<UserBackendResponse>).data;
    }

    return response.data as UserBackendResponse;
  },

  async updateProfile(
    userId: string,
    payload: UpdateProfilePayload,
  ): Promise<UserBackendResponse> {
    const response = await httpClient.patch<
      ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
    >('/users/me', payload, {
      headers: {
        'x-user-id': userId,
      },
    });

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as ApiResponseWrapper<UserBackendResponse>).data;
    }

    return response.data as UserBackendResponse;
  },

  async uploadAvatar(
    userId: string,
    imageUri: string,
  ): Promise<UserBackendResponse> {
    const formData = new FormData();
    const cleanUri =
      Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
    const filename = cleanUri.split('/').pop() || `avatar_${Date.now()}.jpg`;
    const extension = filename.split('.').pop()?.toLowerCase();
    const mimeType =
      extension === 'png'
        ? 'image/png'
        : extension === 'webp'
        ? 'image/webp'
        : 'image/jpeg';

    formData.append('file', {
      uri: imageUri,
      name: filename,
      type: mimeType,
    } as unknown as Blob);

    try {
      const response = await httpClient.post<
        ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
      >('/users/me/avatar', formData, {
        headers: {
          'x-user-id': userId,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (
        response.data &&
        typeof response.data === 'object' &&
        'data' in response.data &&
        response.data.data
      ) {
        return (response.data as ApiResponseWrapper<UserBackendResponse>).data;
      }

      return response.data as UserBackendResponse;
    } catch {
      const fileRes = await httpClient.post<
        | ApiResponseWrapper<{ id: string; url: string }>
        | { id: string; url: string }
      >('/files/upload', formData, {
        headers: {
          'x-user-id': userId,
          'Content-Type': 'multipart/form-data',
        },
      });

      const fileData =
        fileRes.data &&
        typeof fileRes.data === 'object' &&
        'data' in fileRes.data
          ? fileRes.data.data
          : fileRes.data;

      if (fileData?.id) {
        const linkRes = await httpClient.post<
          ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
        >(`/users/me/avatar/${fileData.id}`, null, {
          headers: {
            'x-user-id': userId,
          },
        });

        if (
          linkRes.data &&
          typeof linkRes.data === 'object' &&
          'data' in linkRes.data &&
          linkRes.data.data
        ) {
          return (linkRes.data as ApiResponseWrapper<UserBackendResponse>).data;
        }

        return linkRes.data as UserBackendResponse;
      }

      throw new Error('No se pudo subir la imagen del avatar');
    }
  },

  async toggleTeachingMode(
    userId: string,
    isAvailable: boolean,
  ): Promise<UserBackendResponse> {
    const response = await httpClient.patch<
      ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
    >(
      '/users/me/teaching-mode',
      { isAvailable },
      {
        headers: {
          'x-user-id': userId,
        },
      },
    );

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as ApiResponseWrapper<UserBackendResponse>).data;
    }

    return response.data as UserBackendResponse;
  },

  async saveUserLanguage(
    userId: string,
    payload: SaveUserLanguagePayload,
  ): Promise<UserBackendResponse> {
    const response = await httpClient.post<
      ApiResponseWrapper<UserBackendResponse> | UserBackendResponse
    >('/users/me/languages', payload, {
      headers: {
        'x-user-id': userId,
      },
    });

    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data &&
      response.data.data
    ) {
      return (response.data as ApiResponseWrapper<UserBackendResponse>).data;
    }

    return response.data as UserBackendResponse;
  },

  async removeUserLanguage(
    userId: string,
    languageCode: string,
  ): Promise<void> {
    await httpClient.delete(`/users/me/languages/${languageCode}`, {
      headers: {
        'x-user-id': userId,
      },
    });
  },
};

export default profileApi;
