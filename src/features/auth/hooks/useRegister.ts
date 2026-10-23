import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';
import { Toast } from '../../../components';
import { RegisterFormData } from '../types';
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
    if (!data.acceptTerms) {
      Toast.warning(
        t('register.toasts.missingFieldsTitle'),
        t('register.toasts.termsRequired')
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simular registro o llamada al backend
      await new Promise((resolve) => setTimeout(() => resolve(null), 800));

      // Actualizar el perfil local con el nombre, correo y acreditar el bono de 50 monedas
      updateUserProfile({
        name: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
      });
      addCoins(50);

      // Iniciar sesión
      setAuthenticated(true);

      setTimeout(() => {
        Toast.success(
          t('register.toasts.successTitle'),
          t('register.toasts.successMessage')
        );
      }, 300);
    } catch {
      Toast.error('Error de registro', 'No pudimos crear tu cuenta. Intenta nuevamente.');
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
