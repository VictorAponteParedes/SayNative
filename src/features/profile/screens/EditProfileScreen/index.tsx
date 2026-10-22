import React from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText, AppButton } from '../../../../components';
import { colors, fonts } from '../../../../theme';
import { goBack } from '../../../../navigation/NavigationRef';
import { useEditProfile } from '../../hooks/useEditProfile';
import { styles } from './styles';

export const EditProfileScreen: React.FC = () => {
  const { t } = useTranslation('profile');
  const {
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
  } = useEditProfile();

  return (
    <SafeAreaContainer edges={['top', 'bottom']} style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={goBack}
          style={styles.backButton}
        >
          <ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <AppText variant="h3" style={styles.headerTitle}>
          {t('editProfile.title')}
        </AppText>

        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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

        {/* Campo: Nombre Completo */}
        <View style={styles.formGroup}>
          <AppText variant="bodySmall" style={styles.fieldLabel}>
            {t('editProfile.fullName')}
          </AppText>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder={t('editProfile.fullNamePlaceholder')}
            placeholderTextColor={colors.textMuted}
            style={[styles.input, { fontFamily: fonts.regular }]}
          />
        </View>

        {/* Campo: Correo Electrónico con badge verificado */}
        <View style={styles.formGroup}>
          <View style={styles.labelRow}>
            <AppText variant="bodySmall" style={styles.fieldLabel}>
              {t('editProfile.email')}
            </AppText>
            <View style={styles.verifiedBadge}>
              <AppText variant="caption" style={styles.verifiedText}>
                ✓ {t('user.verified')}
              </AppText>
            </View>
          </View>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder={t('editProfile.emailPlaceholder')}
            placeholderTextColor={colors.textMuted}
            style={[styles.input, { fontFamily: fonts.regular }]}
          />
        </View>

        {/* Campo: Teléfono Móvil */}
        <View style={styles.formGroup}>
          <AppText variant="bodySmall" style={styles.fieldLabel}>
            {t('editProfile.phone')}
          </AppText>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder={t('editProfile.phonePlaceholder')}
            placeholderTextColor={colors.textMuted}
            style={[styles.input, { fontFamily: fonts.regular }]}
          />
        </View>

        {/* Campo: Biografía */}
        <View style={styles.formGroup}>
          <AppText variant="bodySmall" style={styles.fieldLabel}>
            {t('editProfile.bio')}
          </AppText>
          <TextInput
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={3}
            placeholder={t('user.bioPlaceholder')}
            placeholderTextColor={colors.textMuted}
            style={[styles.input, styles.textArea, { fontFamily: fonts.regular }]}
          />
        </View>

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
              {user.nativeLanguage.name} {user.nativeLanguage.flag}
            </AppText>
          </View>

          <View style={styles.readOnlyRow}>
            <AppText variant="caption" style={styles.readOnlyLabel}>
              {t('editProfile.memberSince')}
            </AppText>
            <AppText variant="caption" style={styles.readOnlyValue}>
              {user.memberSince || '2024'}
            </AppText>
          </View>
        </View>

        {/* Botón Guardar Cambios */}
        <View style={styles.saveButtonContainer}>
          <AppButton
            title={t('editProfile.save')}
            onPress={handleSave}
            variant="primary"
          />
        </View>
      </ScrollView>
    </SafeAreaContainer>
  );
};

export default EditProfileScreen;
