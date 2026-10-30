import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Video, PhoneOff } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, Avatar } from '@/components';
import { getSocket } from '@/lib/socketClient';
import { useAuthStore } from '@/store/useAuthStore';
import { useCallSessionStore } from '../store/useCallSessionStore';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { IncomingCallPayload } from '../types';

export const IncomingCallModal: React.FC = () => {
  const { t } = useTranslation('calls');
  const user = useAuthStore((s) => s.user);
  const userId = user.id;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const initCallSession = useCallSessionStore((s) => s.initCallSession);

  const [incomingCall, setIncomingCall] = useState<IncomingCallPayload | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !userId) return;

    const socket = getSocket();
    if (!socket.connected) {
      socket.connect();
    }

    const register = () => {
      socket.emit('call:register-user', { userId });
    };

    register();
    socket.on('connect', register);

    // Escuchar llamada entrante
    socket.on('call:incoming', (payload: IncomingCallPayload) => {
      if (__DEV__) {
        console.log('[IncomingCallModal] ¡Llamada entrante recibida!', payload);
      }
      const currentCall = useCallSessionStore.getState().currentCall;
      if (
        currentCall &&
        (currentCall.status === 'connected' ||
          currentCall.status === 'calling' ||
          (currentCall.status === 'incoming' && currentCall.peer?.id === payload.caller?.id))
      ) {
        return;
      }
      setIncomingCall(payload);
    });

    // Escuchar si quien llama cancela antes de responder
    socket.on('call:ended', () => {
      setIncomingCall(null);
    });

    socket.on('call:rejected', () => {
      setIncomingCall(null);
    });

    return () => {
      socket.off('connect', register);
      socket.off('call:incoming');
      socket.off('call:ended');
      socket.off('call:rejected');
    };
  }, [isAuthenticated, userId]);

  if (!incomingCall) return null;

  const callerName = incomingCall.caller?.name || 'Compañero';
  const callerAvatar = incomingCall.caller?.avatarUrl;
  const ratePerMinute = incomingCall.caller?.ratePerMinute || 10;

  const handleAccept = () => {
    // La aceptación ('call:accept') la emite ActiveCallScreen al montar (autoAccept),
    // para que el listener de la oferta SDP ya exista cuando el caller la envíe.
    initCallSession(
      {
        id: incomingCall.caller?.id || 'caller-id',
        name: callerName,
        avatarUrl: callerAvatar,
        role: 'callee',
        ratePerMinute,
      },
      'connected',
      incomingCall.callId
    );

    const callData = incomingCall;
    setIncomingCall(null);

    navigate(Routes.App.ActiveCall, {
      callId: callData.callId,
      peerId: callData.caller?.id,
      peerName: callerName,
      peerAvatar: callerAvatar,
      ratePerMinute,
      autoAccept: true,
    });
  };

  const handleReject = () => {
    const socket = getSocket();
    socket.emit('call:reject', {
      callId: incomingCall.callId,
      userId: user.id,
      reason: 'declined',
    });
    setIncomingCall(null);
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={Boolean(incomingCall)}
      onRequestClose={handleReject}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Avatar del que llama */}
          <View style={styles.avatarContainer}>
            <Avatar uri={callerAvatar} name={callerName} size={84} />
          </View>

          {/* Nombre y Estado */}
          <AppText variant="h2" color={colors.white} style={styles.nameText}>
            {callerName}
          </AppText>
          <AppText variant="bodyMedium" color={colors.textSecondary} style={styles.statusText}>
            {t('lobby.incoming', { name: callerName })}
          </AppText>

          {/* Tarifa */}
          <View style={styles.rateRow}>
            <AppText style={styles.coinIcon}>🪙</AppText>
            <AppText variant="caption" color={colors.coin}>
              +{ratePerMinute} monedas / min
            </AppText>
          </View>

          {/* Botones de acción (Aceptar / Rechazar) */}
          <View style={styles.buttonsRow}>
            {/* Rechazar */}
            <View style={styles.actionColumn}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleReject}
                style={[styles.circularButton, styles.rejectButton]}
              >
                <PhoneOff size={30} color={colors.white} />
              </TouchableOpacity>
              <AppText variant="bodySmall" color={colors.white} style={styles.buttonLabel}>
                {t('lobby.rejectCall')}
              </AppText>
            </View>

            {/* Aceptar */}
            <View style={styles.actionColumn}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleAccept}
                style={[styles.circularButton, styles.acceptButton]}
              >
                <Video size={30} color={colors.white} />
              </TouchableOpacity>
              <AppText variant="bodySmall" color={colors.white} style={styles.buttonLabel}>
                {t('lobby.acceptCall')}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  nameText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  statusText: {
    marginTop: 4,
    textAlign: 'center',
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  coinIcon: {
    fontSize: 14,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
    marginTop: spacing.xl,
    paddingHorizontal: spacing.sm,
  },
  actionColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
  },
  circularButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  rejectButton: {
    backgroundColor: colors.danger,
    shadowColor: colors.danger,
  },
  acceptButton: {
    backgroundColor: '#16A34A',
    shadowColor: '#16A34A',
  },
  buttonLabel: {
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default IncomingCallModal;
