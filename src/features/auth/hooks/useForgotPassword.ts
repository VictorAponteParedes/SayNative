import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Toast } from '@/components';
import { goBack, navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { ForgotPasswordFormData } from '../types';

export const useForgotPassword = () => {
  const { t } = useTranslation('auth');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      // Breve retardo para feedback de envío y llamada a servicio
      await new Promise((resolve) => setTimeout(() => resolve(undefined), 800));

      Toast.success(
        t('forgotPassword.successTitle', 'Enlace enviado'),
        t(
          'forgotPassword.successMessage',
          'Hemos enviado las instrucciones para restablecer tu contraseña a tu correo electrónico.'
        )
      );

      navigate(Routes.Auth.Login);
    } catch {
      Toast.error(
        'Error',
        'No pudimos enviar el enlace. Intenta nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    goBack();
  };

  const handleGoToLogin = () => {
    navigate(Routes.Auth.Login);
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    handleBack,
    handleGoToLogin,
  };
};

export default useForgotPassword;