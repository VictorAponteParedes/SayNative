import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../../store/useAuthStore';
import { goBack } from '../../../navigation/NavigationRef';
import { Toast } from '../../../components';

export const useEditProfile = () => {
  const { t } = useTranslation('profile');
  const user = useAuthStore((state) => state.user);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [bio, setBio] = useState(user.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  const handleChangePhoto = () => {
    Alert.alert(
      t('editProfile.changePhoto'),
      'Selecciona una nueva foto de perfil de tu galería.',
      [
        { text: t('account.cancel'), style: 'cancel' },
        {
          text: 'Elegir Foto',
          onPress: () => {
            // Simular actualización con foto en alta calidad
            const newAvatar =
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
            setAvatarUrl(newAvatar);
          },
        },
      ]
    );
  };

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      Toast.error(
        t('toasts.incompleteDataTitle'),
        t('toasts.incompleteDataMessage')
      );
      return;
    }

    updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      bio: bio.trim(),
      avatarUrl,
    });

    Toast.success(
      t('toasts.profileUpdatedTitle'),
      t('toasts.profileUpdatedMessage')
    );
    setTimeout(() => {
      goBack();
    }, 800);
  };

  return {
    user,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    bio,
    setBio,
    avatarUrl,
    handleChangePhoto,
    handleSave,
  };
};
