import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { colors, spacing } from '@/theme';
import { AppText } from './AppText';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface AppBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onDismiss?: () => void;
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  children: React.ReactNode;
  maxHeight?: number | `${number}%`;
}

export const AppBottomSheet: React.FC<AppBottomSheetProps> = ({
  visible,
  onClose,
  onDismiss,
  title,
  subtitle,
  showCloseButton = true,
  children,
  maxHeight = '85%',
}) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(visible);

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Manejar apertura y cierre con animaciones fluidas
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          damping: 24,
          mass: 0.8,
          stiffness: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (modalVisible) {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
        if (Platform.OS !== 'ios') {
          onDismiss?.();
        }
      });
    }
  }, [visible, modalVisible, backdropOpacity, translateY, onDismiss]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      onClose();
      if (Platform.OS !== 'ios') {
        onDismiss?.();
      }
    });
  };

  // PanResponder para deslizar hacia abajo y cerrar
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            translateY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > 120 || gestureState.vy > 0.6) {
            handleClose();
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              damping: 20,
              stiffness: 200,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [translateY]
  );

  if (!modalVisible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={handleClose}
      onDismiss={onDismiss}
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <View style={styles.overlay}>
          {/* Fondo semitransparente oscuro con fade */}
          <TouchableWithoutFeedback onPress={handleClose}>
            <Animated.View
              style={[
                styles.backdrop,
                {
                  opacity: backdropOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.6],
                  }),
                },
              ]}
            />
          </TouchableWithoutFeedback>

          {/* Tarjeta BottomSheet */}
          <Animated.View
            style={[
              styles.sheetContainer,
              {
                maxHeight,
                paddingBottom: Math.max(insets.bottom, spacing.md),
                transform: [{ translateY }],
              },
            ]}
          >
            {/* Cabecera táctil para deslizar hacia abajo */}
            <View {...panResponder.panHandlers} style={styles.handleWrapper}>
              <View style={styles.dragHandle} />
            </View>

            {/* Título y botón cerrar */}
            {(title || showCloseButton) && (
              <View style={styles.header}>
                <View style={styles.titleContainer}>
                  {title && (
                    <AppText variant="h3" style={styles.title}>
                      {title}
                    </AppText>
                  )}
                  {subtitle && (
                    <AppText variant="caption" style={styles.subtitle}>
                      {subtitle}
                    </AppText>
                  )}
                </View>

                {showCloseButton && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleClose}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    style={styles.closeButton}
                  >
                    <X size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Contenido inyectado */}
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  sheetContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
    overflow: 'hidden',
  },
  handleWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  dragHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.borderDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
  },
});
