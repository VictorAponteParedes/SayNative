import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText, AppButton, ControlledInput } from '@/components';
import { colors } from '@/theme';
import { goBack } from '@/navigation/NavigationRef';
import { useEditProfile } from '../../hooks/useEditProfile';
import { styles } from './styles';

export const EditProfileScreen: React.FC = () => {
  const { t } = useTranslation('profile');
  const {
    user,
    control,
    handleSubmit,
    isSaving,
    isRefreshing,
    onRefresh,
    avatarUrl,
    handleChangePhoto,
  } = useEditProfile();

  const renderVerifiedBadge = () => {
    if (!user.isVerified) return null;
    return (
      <View style={styles.verifiedBadge}>
        <AppText variant="caption" style={styles.verifiedText}>
          ✓ {t('user.verified')}
        </AppText>
      </View>
    );
  };

  return (
    <SafeAreaContainer edges={['top', 'bottom']} style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={goBack}
          style={styles.backButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <AppText variant="h3" style={styles.headerTitle}>
          {t('editProfile.title')}
        </AppText>

        <View style={styles.headerPlaceholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {/* Sección de Foto de Perfil */}
          <View style={styles.avatarSection}>
            <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleChangePhoto}
              style={styles.changePhotoButton}
            >
              <Camera size={14} color={colors.primary} style={styles.cameraIcon} />
              <AppText variant="caption" style={styles.changePhotoText}>
                {t('editProfile.changePhoto')}
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Campo: Nombre Completo con React Hook Form */}
          <ControlledInput
            control={control}
            name="fullName"
            label={t('editProfile.fullName')}
            placeholder={t('editProfile.fullNamePlaceholder')}
            autoCapitalize="words"
            rules={{
              required: 'El nombre es obligatorio',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres',
              },
            }}
          />

          {/* Campo: Correo Electrónico con badge de verificado */}
          <ControlledInput
            control={control}
            name="email"
            label={t('editProfile.email')}
            labelRight={renderVerifiedBadge()}
            placeholder={t('editProfile.emailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            rules={{
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingresa un correo válido',
              },
            }}
          />

          {/* Campo: Teléfono Móvil */}
          <ControlledInput
            control={control}
            name="phone"
            label={t('editProfile.phone')}
            placeholder={t('editProfile.phonePlaceholder')}
            keyboardType="phone-pad"
          />

          {/* Campo: Biografía */}
          <ControlledInput
            control={control}
            name="bio"
            label={t('editProfile.bio')}
            placeholder={t('user.bioPlaceholder')}
            multiline
            numberOfLines={3}
            inputContainerStyle={styles.textAreaContainer}
            inputStyle={styles.textAreaInput}
          />

          {/* Ficha de Información de Cuenta (Solo Lectura) */}
          <View style={styles.readOnlyCard}>
            <View style={styles.readOnlyRow}>
              <AppText variant="caption" style={styles.readOnlyLabel}>
                {t('editProfile.userId')}
              </AppText>
              <AppText variant="caption" style={styles.readOnlyValue}>
                {user.id}
              </AppText>
            </View>

            <View style={styles.readOnlyRow}>
              <AppText variant="caption" style={styles.readOnlyLabel}>
                {t('editProfile.nativeLanguage')}
              </AppText>
              <AppText variant="caption" style={styles.readOnlyValue}>
                {user.nativeLanguage?.name} {user.nativeLanguage?.flag}
              </AppText>
            </View>

            <View style={styles.readOnlyRow}>
              <AppText variant="caption" style={styles.readOnlyLabel}>
                {t('editProfile.memberSince')}
              </AppText>
              <AppText variant="caption" style={styles.readOnlyValue}>
                {user.memberSince || 'Octubre 2024'}
              </AppText>
            </View>
          </View>

          {/* Botón Guardar Cambios con estado de carga */}
          <View style={styles.saveButtonContainer}>
            <AppButton
              title={t('editProfile.save')}
              onPress={handleSubmit}
              loading={isSaving}
              disabled={isSaving}
              variant="primary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  );
};

export default EditProfileScreen;
