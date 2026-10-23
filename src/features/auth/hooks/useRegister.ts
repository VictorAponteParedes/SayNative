import { useState } from 'react';
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

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPromotions: true,
  });

  const handleChangeField = <K extends keyof RegisterFormData>(
    field: K,
    value: RegisterFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password) {
      Toast.warning(
        t('register.toasts.missingFieldsTitle'),
        t('register.toasts.missingFieldsMessage')
      );
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      Toast.warning(
        t('register.toasts.missingFieldsTitle'),
        t('register.toasts.invalidEmail')
      );
      return false;
    }

    if (formData.password.length < 8) {
      Toast.warning(
        t('register.toasts.missingFieldsTitle'),
        t('register.toasts.shortPassword')
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.warning(
        t('register.toasts.missingFieldsTitle'),
        t('register.toasts.passwordsDoNotMatch')
      );
      return false;
    }

    if (!formData.acceptTerms) {
      Toast.warning(
        t('register.toasts.missingFieldsTitle'),
        t('register.toasts.termsRequired')
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular registro o llamada al backend
      await new Promise((resolve) => setTimeout(() => resolve(null), 800));

      // Actualizar el perfil local con el nombre, correo y acreditar el bono de 50 monedas
      updateUserProfile({
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
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
    formData,
    handleChangeField,
    handleSubmit,
    handleBack,
    isLoading,
  };
};
