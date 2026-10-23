import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuthStore } from '../../../store/useAuthStore';
import { Toast } from '../../../components';
import { RegisterFormData } from '../types';
import { authApi } from '../api/authApi';
import { goBack } from '../../../navigation/NavigationRef';

export const useRegister = () => {
  const { t } = useTranslation('auth');
  const [isLoading, setIsLoading] = useState(false);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);
  const addCoins = useAuthStore((state) => state.addCoins);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      acceptPromotions: true,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterFormData) => {
    // Validación estricta en cliente: NO permitir registrar si no se aceptan los términos
    if (!data.acceptTerms) {
      Toast.warning(
        t('register.toasts.missingFieldsTitle'),
        t('register.toasts.termsRequired')
      );
      return;
    }

    setIsLoading(true);

    try {
      // Llamada real al servicio de backend con Axios
      const createdUser = await authApi.register({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        fullName: data.fullName.trim(),
        acceptedTerms: data.acceptTerms,
        acceptedPromotions: data.acceptPromotions,
        countryCode: 'ES',
        countryFlag: '🇪🇸',
        nativeLanguageCode: 'es',
        learningLanguageCode: 'en',
      });

      // Actualizar el perfil local con el usuario real registrado
      updateUserProfile({
        id: createdUser.id,
        name: createdUser.fullName,
        email: createdUser.email,
        countryCode: createdUser.countryCode || 'ES',
        countryFlag: createdUser.countryFlag || '🇪🇸',
        isVerified: createdUser.isVerified,
      });

      // Acreditar el bono de +50 monedas de bienvenida
      addCoins(50);

      // Iniciar sesión en la app
      setAuthenticated(true);

      setTimeout(() => {
        Toast.success(
          t('register.toasts.successTitle'),
          t('register.toasts.successMessage')
        );
      }, 300);
    } catch (error: unknown) {
      let errorMessage = 'No pudimos crear tu cuenta. Intenta nuevamente.';

      if (axios.isAxiosError(error)) {
        const backendMsg = error.response?.data?.message;
        if (Array.isArray(backendMsg)) {
          errorMessage = backendMsg.join(', ');
        } else if (typeof backendMsg === 'string') {
          errorMessage = backendMsg;
        } else if (error.message === 'Network Error') {
          errorMessage =
            'No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.';
        }
      }

      Toast.error('Error de registro', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    goBack();
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    errors,
    handleBack,
    isLoading,
  };
};

export default useRegister;
