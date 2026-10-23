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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const initCallSession = useCallSessionStore((s) => s.initCallSession);

  const [incomingCall, setIncomingCall] = useState<IncomingCallPayload | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user.id) return;

    const socket = getSocket();
    if (!socket.connected) {
      socket.connect();
    }

    // Registrar al usuario con el servidor
    socket.emit('call:register-user', { userId: user.id });

    // Escuchar llamada entrante
    socket.on('call:incoming', (payload: IncomingCallPayload) => {
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
      socket.off('call:incoming');
      socket.off('call:ended');
      socket.off('call:rejected');
    };
  }, [isAuthenticated, user.id]);

  if (!incomingCall) return null;

  const callerName = incomingCall.caller?.name || 'Compañero';
  const callerAvatar = incomingCall.caller?.avatarUrl;
  const ratePerMinute = incomingCall.caller?.ratePerMinute || 10;

  const handleAccept = () => {
    const socket = getSocket();
    socket.emit('call:accept', {
      callId: incomingCall.callId,
      userId: user.id,
    });

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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleReject}
              style={[styles.actionButton, styles.rejectButton]}
            >
              <PhoneOff size={28} color={colors.white} />
              <AppText variant="caption" color={colors.white} style={styles.buttonLabel}>
                {t('lobby.rejectCall')}
              </AppText>
            </TouchableOpacity>

            {/* Aceptar */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleAccept}
              style={[styles.actionButton, styles.acceptButton]}
            >
              <Video size={28} color={colors.white} />
              <AppText variant="caption" color={colors.white} style={styles.buttonLabel}>
                {t('lobby.acceptCall')}
              </AppText>
            </TouchableOpacity>
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  rejectButton: {
    backgroundColor: colors.danger,
  },
  acceptButton: {
    backgroundColor: '#16A34A', // Verde llamativo
  },
  buttonLabel: {
    marginTop: 6,
    fontWeight: '600',
  },
});

export default IncomingCallModal;
