import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check, AlertCircle, X } from 'lucide-react-native';
import { colors, spacing } from '../../../theme';
import { AppText } from '../AppText';
import { useToastStore, ToastType } from '../../../store/useToastStore';

const { width } = Dimensions.get('window');

export const ToastContainer: React.FC = () => {
  const insets = useSafeAreaInsets();
  const currentToast = useToastStore((state) => state.currentToast);
  const hideToast = useToastStore((state) => state.hideToast);

  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (currentToast) {
      // Entrada con resorte suave
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 9,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      // Temporizador para auto-descartar
      const timer = setTimeout(() => {
        dismissToast();
      }, currentToast.duration || 3500);

      return () => clearTimeout(timer);
    }
  }, [currentToast]);

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      hideToast();
    });
  };

  if (!currentToast) return null;

  const getToastConfig = (type: ToastType) => {
    switch (type) {
      case 'warning':
        return {
          backgroundColor: colors.toastWarningBg,
          borderColor: colors.toastWarningBorder,
          iconBg: colors.toastWarningIconBg,
          icon: <AlertCircle size={20} color={colors.toastWarningIcon} strokeWidth={2.5} />,
        };
      case 'error':
        return {
          backgroundColor: colors.toastErrorBg,
          borderColor: colors.toastErrorBorder,
          iconBg: colors.toastErrorIconBg,
          icon: <X size={18} color={colors.toastErrorIcon} strokeWidth={3} />,
        };
      case 'success':
      default:
        return {
          backgroundColor: colors.toastSuccessBg,
          borderColor: colors.toastSuccessBorder,
          iconBg: colors.toastSuccessIconBg,
          icon: <Check size={18} color={colors.toastSuccessIcon} strokeWidth={3} />,
        };
    }
  };

  const config = getToastConfig(currentToast.type);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.overlay,
        { paddingTop: Math.max(insets.top + 8, 44) },
      ]}
    >
      <Animated.View
        style={[
          styles.animatedWrapper,
          {
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={dismissToast}
          style={[
            styles.toastCard,
            {
              backgroundColor: config.backgroundColor,
              borderColor: config.borderColor,
            },
          ]}
        >
          {/* Círculo del icono */}
          <View style={[styles.iconContainer, { backgroundColor: config.iconBg }]}>
            {config.icon}
          </View>

          {/* Textos: Título y Mensaje */}
          <View style={styles.textContainer}>
            <AppText variant="body" style={styles.title}>
              {currentToast.title}
            </AppText>
            {!!currentToast.message && (
              <AppText variant="bodySmall" style={styles.message}>
                {currentToast.message}
              </AppText>
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99999,
    alignItems: 'center',
  },
  animatedWrapper: {
    width: width - spacing.lg * 2,
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md - 2,
    borderWidth: 1,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: colors.toastTextTitle,
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
  },
  message: {
    color: colors.toastTextMessage,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
});
