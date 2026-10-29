import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius, fonts } from '@/theme';
import { AppText } from './AppText';

export interface ConfirmModalProps {
  visible: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  message?: string;
  children?: React.ReactNode;
  isInfo?: boolean;
  propInfo?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  loading?: boolean;
  dismissable?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  children,
  isInfo = false,
  propInfo = false,
  confirmText,
  cancelText,
  confirmColor = colors.action,
  cancelColor = colors.action,
  loading = false,
  dismissable = true,
}) => {
  const { t } = useTranslation('common');
  const [modalVisible, setModalVisible] = useState(visible);

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  const showOnlyOk = isInfo || propInfo;

  // Animación de salida controlada
  const animateOut = useCallback(
    (callback?: () => void) => {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 170,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.92,
          duration: 170,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
        callback?.();
        onClose?.();
      });
    },
    [opacityAnim, scaleAnim, onClose]
  );

  // Animación de entrada o salida según prop visible
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 18,
          mass: 0.8,
          stiffness: 240,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (modalVisible) {
      animateOut();
    }
  }, [visible, modalVisible, opacityAnim, scaleAnim, animateOut]);

  const handleBackdropPress = () => {
    if (dismissable && !loading) {
      animateOut(onCancel);
    }
  };

  const handleCancel = () => {
    if (loading) return;
    animateOut(onCancel);
  };

  const handleConfirm = () => {
    if (loading) return;
    animateOut(onConfirm);
  };

  if (!modalVisible) {
    return null;
  }

  // Textos por defecto usando los diccionarios de idiomas
  const resolvedConfirmText =
    confirmText ||
    (showOnlyOk
      ? t('actions.ok', { defaultValue: 'OK' })
      : t('actions.accept', { defaultValue: 'Aceptar' }));

  const resolvedCancelText =
    cancelText || t('actions.cancel', { defaultValue: 'Cancelar' });

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={handleBackdropPress}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              {
                opacity: opacityAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.6],
                }),
              },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.dialogCard,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {title ? (
            <AppText variant="h3" style={styles.title}>
              {title}
            </AppText>
          ) : null}

          {message ? (
            <AppText variant="bodyMedium" style={styles.message}>
              {message}
            </AppText>
          ) : null}

          {children}

          <View style={styles.actionsRow}>
            {!showOnlyOk && (
              <TouchableOpacity
                activeOpacity={0.65}
                onPress={handleCancel}
                disabled={loading}
                style={styles.button}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <AppText
                  style={[
                    styles.buttonText,
                    styles.cancelText,
                    { color: cancelColor },
                  ]}
                >
                  {resolvedCancelText}
                </AppText>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.65}
              onPress={handleConfirm}
              disabled={loading}
              style={styles.button}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {loading ? (
                <ActivityIndicator size="small" color={confirmColor} />
              ) : (
                <AppText
                  style={[
                    styles.buttonText,
                    styles.confirmText,
                    { color: confirmColor },
                  ]}
                >
                  {resolvedConfirmText}
                </AppText>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export const ConfirModal = ConfirmModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  dialogCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xxl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 12,
  },
  title: {
    fontSize: 19,
    fontFamily: fonts.bold,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: 15,
    fontFamily: fonts.regular,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cancelText: {
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  confirmText: {
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
});
