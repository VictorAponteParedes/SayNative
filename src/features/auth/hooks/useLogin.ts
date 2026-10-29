import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { Toast } from '@/components';
import { goBack, navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { LoginFormData, RegisteredUser } from '../types';
import { authApi } from '../api/authApi';
import { profileApi } from '@/features/profile/api/profileApi';

export const useLogin = () => {
  const { t } = useTranslation('auth');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUserFromBackend = useAuthStore(state => state.setUserFromBackend);
  const setUser = useAuthStore(state => state.setUser);
  const setAuthenticated = useAuthStore(state => state.setAuthenticated);
  const setTokens = useAuthStore(state => state.setTokens);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await authApi.login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      const authToken = response.accessToken || response.token;
      if (authToken || response.refreshToken) {
        setTokens({
          token: authToken || null,
          refreshToken: response.refreshToken || null,
        });
      }

      if (response.user) {
        setUserFromBackend(response.user);
      } else if (response.id && response.email) {
        setUserFromBackend(response as unknown as RegisteredUser);
      } else {
        setUser({
          email: data.email.trim().toLowerCase(),
          name: response.name || response.fullName || data.email.split('@')[0],
        });
        setAuthenticated(true);
      }

      Toast.success(
        t('login.toasts.successTitle'),
        t('login.toasts.successMessage'),
      );
    } catch (error: unknown) {
      let errorMessage = t('login.toasts.errorMessage');

      if (axios.isAxiosError(error)) {
        const backendMsg = error.response?.data?.message;
        if (Array.isArray(backendMsg)) {
          errorMessage = backendMsg.join(', ');
        } else if (typeof backendMsg === 'string') {
          errorMessage = backendMsg;
        } else if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          errorMessage =
            'Tiempo de espera agotado. El servidor tardó demasiado en responder.';
        } else if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
          errorMessage =
            'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.';
        }
      }

      // Si el backend aún no implementa el endpoint POST /auth/login (retorna 404),
      // cargamos los datos reales del usuario desde GET /users/me para permitir probar la app
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        try {
          const defaultUserId = 'f28083a9-9f35-488b-857a-0d127eb5ef7d';
          const backendProfile = await profileApi.getProfile(defaultUserId);
          if (backendProfile) {
            setUserFromBackend({
              ...backendProfile,
              email: data.email.trim().toLowerCase() || backendProfile.email,
            });
            Toast.success(
              t('login.toasts.successTitle'),
              'Iniciando con tu usuario del backend.',
            );
            return;
          }
        } catch (fetchErr) {
          if (__DEV__) {
            console.log('[useLogin] Fallback fetch error:', fetchErr);
          }
        }
      }

      // En modo desarrollo, si no hay backend activo o expira el tiempo de conexión, permitir probar la app
      if (
        __DEV__ &&
        axios.isAxiosError(error) &&
        (error.message === 'Network Error' ||
          error.code === 'ERR_NETWORK' ||
          error.code === 'ECONNABORTED')
      ) {
        console.log('[useLogin] Entorno DEV: iniciando sesión offline para pruebas');
        setUser({
          email: data.email.trim().toLowerCase(),
          name: data.email.split('@')[0],
        });
        setAuthenticated(true);
        Toast.success(
          t('login.toasts.successTitle'),
          t('login.toasts.successMessage'),
        );
        return;
      }

      Toast.error(t('login.toasts.errorTitle'), errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    goBack();
  };

  const handleGoToRegister = () => {
    navigate(Routes.Auth.Register);
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isLoading,
    handleBack,
    handleGoToRegister,
  };
};

export default useLogin;
