import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { goBack } from '@/navigation/NavigationRef';
import { Toast } from '@/components';
import { profileApi } from '../api/profileApi';
import { EditProfileFormData } from '../types';

const isValidUuid = (id: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

export const useEditProfile = () => {
  const { t } = useTranslation('profile');
  const user = useAuthStore(state => state.user);
  const updateUserProfile = useAuthStore(state => state.updateUserProfile);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditProfileFormData>({
    defaultValues: {
      fullName: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
    },
    mode: 'onTouched',
  });

  const fetchProfile = useCallback(
    async (showLoadingIndicator = true) => {
      if (!user.id || !isValidUuid(user.id)) {
        setIsFetching(false);
        setIsRefreshing(false);
        return;
      }

      if (showLoadingIndicator) {
        setIsFetching(true);
      }

      try {
        const backendUser = await profileApi.getProfile(user.id);

        if (backendUser) {
          reset({
            fullName: backendUser.fullName || user.name,
            email: backendUser.email || user.email,
            phone: backendUser.phone || '',
            bio: backendUser.bio || '',
          });

          updateUserProfile({
            name: backendUser.fullName,
            email: backendUser.email,
            phone: backendUser.phone || undefined,
            bio: backendUser.bio || undefined,
            countryCode: backendUser.countryCode || user.countryCode,
            countryFlag: backendUser.countryFlag || user.countryFlag,
            isVerified: backendUser.isVerified,
          });
        }
      } catch (err: unknown) {
        // Si el usuario tiene un ID mock o el backend está en desarrollo, mantenemos los datos de Zustand
        if (__DEV__) {
          console.log('[useEditProfile] Backend fetch note:', err);
        }
      } finally {
        setIsFetching(false);
        setIsRefreshing(false);
      }
    },
    [
      user.id,
      user.name,
      user.email,
      user.countryCode,
      user.countryFlag,
      reset,
      updateUserProfile,
    ],
  );

  useEffect(() => {
    fetchProfile(true);
  }, [fetchProfile]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchProfile(false);
  }, [fetchProfile]);

  const handleChangePhoto = () => {
    Alert.alert(
      t('editProfile.changePhoto'),
      'Selecciona una nueva foto de perfil de tu galería.',
      [
        { text: t('account.cancel'), style: 'cancel' },
        {
          text: 'Elegir Foto',
          onPress: () => {
            const newAvatar =
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
            setAvatarUrl(newAvatar);
            updateUserProfile({ avatarUrl: newAvatar });
          },
        },
      ],
    );
  };

  /**
   * Guardar cambios en el backend y en Zustand
   */
  const onSubmit = async (data: EditProfileFormData) => {
    setIsSaving(true);

    try {
      // 1. Guardar en Backend NestJS
      const updatedBackendUser = await profileApi.updateProfile(user.id, {
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        bio: data.bio.trim(),
      });

      // 2. Persistir en el estado global de Zustand
      updateUserProfile({
        name: updatedBackendUser.fullName || data.fullName.trim(),
        email: updatedBackendUser.email || data.email.trim().toLowerCase(),
        phone: updatedBackendUser.phone ?? data.phone.trim(),
        bio: updatedBackendUser.bio ?? data.bio.trim(),
        avatarUrl,
      });

      // 3. Resetear el estado del formulario con los nuevos valores guardados
      reset(data);

      Toast.success(
        t('toasts.profileUpdatedTitle'),
        t('toasts.profileUpdatedMessage'),
      );

      setTimeout(() => {
        goBack();
      }, 700);
    } catch (error: unknown) {
      let errorMessage = 'No pudimos actualizar tu perfil. Intenta nuevamente.';
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message;
        if (Array.isArray(msg)) {
          errorMessage = msg.join(', ');
        } else if (typeof msg === 'string') {
          errorMessage = msg;
        }
      }
      Toast.error('Error al guardar', errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    user,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isDirty,
    isFetching,
    isRefreshing,
    onRefresh,
    isSaving,
    avatarUrl,
    handleChangePhoto,
  };
};

export default useEditProfile;
