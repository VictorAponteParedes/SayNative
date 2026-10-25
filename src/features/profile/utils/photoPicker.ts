import { PermissionsAndroid, Platform } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import i18n from '@/lang/i18n';
import { Toast } from '@/components';

/**
 * Solicita permisos de cámara en Android de forma interactiva
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  try {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (hasPermission) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: i18n.t('profile:changePhotoSheet.title', {
          defaultValue: 'Permiso de Cámara',
        }),
        message: i18n.t('profile:changePhotoSheet.permissionDeniedMessage', {
          defaultValue:
            'SayNative necesita acceso a tu cámara para que puedas tomarte una foto de perfil.',
        }),
        buttonNeutral: i18n.t('profile:account.cancel', {
          defaultValue: 'Preguntar luego',
        }),
        buttonNegative: i18n.t('profile:changePhotoSheet.cancel', {
          defaultValue: 'Cancelar',
        }),
        buttonPositive: i18n.t('profile:editProfile.save', {
          defaultValue: 'Aceptar',
        }),
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error: unknown) {
    if (__DEV__) {
      console.warn('[CameraPermission] Error requesting permission:', error);
    }
    return false;
  }
};

/**
 * Procesa la respuesta de react-native-image-picker
 */
const handlePickerResponse = (response: ImagePickerResponse): string | null => {
  if (response.didCancel) {
    return null;
  }

  if (response.errorCode) {
    if (response.errorCode === 'camera_unavailable') {
      Toast.error(
        i18n.t('profile:changePhotoSheet.cameraUnavailableTitle', {
          defaultValue: 'Cámara no disponible',
        }),
        i18n.t('profile:changePhotoSheet.cameraUnavailableMessage', {
          defaultValue: 'No se detectó una cámara disponible en este dispositivo.',
        }),
      );
      return null;
    }

    if (response.errorCode === 'permission') {
      Toast.warning(
        i18n.t('profile:changePhotoSheet.permissionDeniedTitle', {
          defaultValue: 'Permiso requerido',
        }),
        i18n.t('profile:changePhotoSheet.permissionDeniedMessage', {
          defaultValue:
            'SayNative necesita permisos para acceder a tus fotos o cámara.',
        }),
      );
      return null;
    }

    Toast.error(
      'Error',
      response.errorMessage ||
        i18n.t('profile:changePhotoSheet.errorSelectingImage', {
          defaultValue: 'No se pudo seleccionar la imagen.',
        }),
    );
    return null;
  }

  const asset = response.assets?.[0];
  if (asset && asset.uri) {
    return asset.uri;
  }

  return null;
};

/**
 * Abre la galería del dispositivo para seleccionar una foto de perfil
 */
export const pickImageFromGallery = async (): Promise<string | null> => {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 0.8,
    maxWidth: 1200,
    maxHeight: 1200,
    includeBase64: false,
    presentationStyle: 'fullScreen',
  };

  try {
    const response = await launchImageLibrary(options);
    return handlePickerResponse(response);
  } catch (error: unknown) {
    if (__DEV__) {
      console.warn('[pickImageFromGallery] Error:', error);
    }
    Toast.error(
      'Error',
      i18n.t('profile:changePhotoSheet.errorSelectingImage', {
        defaultValue: 'Ocurrió un error al abrir la galería.',
      }),
    );
    return null;
  }
};

/**
 * Abre la cámara frontal para tomar una selfie como foto de perfil
 */
export const takeSelfieWithCamera = async (): Promise<string | null> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    Toast.warning(
      i18n.t('profile:changePhotoSheet.permissionDeniedTitle', {
        defaultValue: 'Permiso requerido',
      }),
      i18n.t('profile:changePhotoSheet.permissionDeniedMessage', {
        defaultValue:
          'SayNative necesita acceso a la cámara para tomar tu foto de perfil.',
      }),
    );
    return null;
  }

  const options: CameraOptions = {
    mediaType: 'photo',
    cameraType: 'front', // Selfie
    quality: 0.8,
    maxWidth: 1200,
    maxHeight: 1200,
    saveToPhotos: false,
    includeBase64: false,
    presentationStyle: 'fullScreen',
  };

  try {
    const response = await launchCamera(options);
    return handlePickerResponse(response);
  } catch (error: unknown) {
    if (__DEV__) {
      console.warn('[takeSelfieWithCamera] Error:', error);
    }
    Toast.error(
      'Error',
      i18n.t('profile:changePhotoSheet.errorSelectingImage', {
        defaultValue: 'Ocurrió un error al abrir la cámara.',
      }),
    );
    return null;
  }
};
