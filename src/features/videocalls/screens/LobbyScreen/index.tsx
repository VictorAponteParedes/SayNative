import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Mic,
  MicOff,
  Video,
  VideoOff,
  SwitchCamera,
  Radio,
  Sparkles,
  AlertCircle,
} from 'lucide-react-native';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { SafeAreaContainer, AppText, AppButton } from '@/components';
import { colors } from '@/theme';
import { navigate, goBack } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { useAuthStore } from '@/store/useAuthStore';
import { useCoinsStore } from '@/features/coins';
import { getSocket } from '@/lib/socketClient';
import { IncomingCallPayload } from '../../types';
import { useCallSessionStore } from '../../store/useCallSessionStore';
import { useWebRTC } from '../../hooks/useWebRTC';
import { styles } from './styles';

export interface LobbyScreenProps {
  route?: {
    params?: {
      peerId?: string;
      peerName?: string;
      peerAvatar?: string;
      peerFlag?: string;
      ratePerMinute?: number;
      isIncoming?: boolean;
      isInstantMatch?: boolean;
    };
  };
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({ route }) => {
  const { t } = useTranslation('calls');
  const user = useAuthStore((s) => s.user);
  const coins = useCoinsStore((s) => s.coins);

  const initialPeerId = route?.params?.peerId;
  const initialPeerName = route?.params?.peerName;
  const initialPeerAvatar = route?.params?.peerAvatar;
  const initialPeerFlag = route?.params?.peerFlag;
  const ratePerMinute = route?.params?.ratePerMinute || 10;
  const isInstantMatch = route?.params?.isInstantMatch ?? !initialPeerId;

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>(
    t('lobby.waitingTitle', { defaultValue: 'Esperando a alguien...' })
  );
  const [isMatchingFound, setIsMatchingFound] = useState(false);

  const radarPulseAnim = useRef(new Animated.Value(0)).current;
  const matchingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { initCallSession, localStream } = useCallSessionStore();
  const { startLocalMedia, switchCamera, toggleAudio, toggleVideo, cleanup } = useWebRTC();

  // Animación continua del radar
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(radarPulseAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(radarPulseAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, [radarPulseAnim]);

  // Inicializar preview de medios locales
  useEffect(() => {
    startLocalMedia();
  }, [startLocalMedia]);

  const handleConnectWithPeer = useCallback(
    (matchedPeer: {
      id: string;
      name: string;
      avatarUrl?: string;
      countryFlag?: string;
      ratePerMinute: number;
    }) => {
      setIsMatchingFound(true);
      setStatusMessage(
        t('lobby.partnerFound', { defaultValue: '¡Compañero encontrado! Conectando...' })
      );

      matchingTimeoutRef.current = setTimeout(() => {
        initCallSession(
          {
            id: matchedPeer.id,
            name: matchedPeer.name,
            avatarUrl: matchedPeer.avatarUrl,
            countryFlag: matchedPeer.countryFlag,
            role: 'caller',
            ratePerMinute: matchedPeer.ratePerMinute,
          },
          'calling'
        );

        navigate(Routes.App.ActiveCall, {
          peerId: matchedPeer.id,
          peerName: matchedPeer.name,
          peerAvatar: matchedPeer.avatarUrl,
          peerFlag: matchedPeer.countryFlag,
          ratePerMinute: matchedPeer.ratePerMinute,
        });
      }, 1400);
    },
    [initCallSession, t]
  );

  // Proceso de emparejamiento en tiempo real vía WebSockets
  useEffect(() => {
    const socket = getSocket();

    // Si vino con un compañero específico (ej. llamada directa)
    if (initialPeerId && !isInstantMatch) {
      if (!socket.connected) {
        socket.connect();
      }
      if (user.id) {
        socket.emit('call:register-user', { userId: user.id });
      }
      handleConnectWithPeer({
        id: initialPeerId,
        name: initialPeerName || 'Compañero',
        avatarUrl: initialPeerAvatar,
        countryFlag: initialPeerFlag,
        ratePerMinute,
      });
      return;
    }

    // Unirse a la sala de espera real
    setStatusMessage(
      t('lobby.waitingTitle', { defaultValue: 'Esperando a alguien...' })
    );

    const emitJoin = () => {
      if (user.id) {
        if (__DEV__) {
          console.log('[Lobby] Registrando usuario y uniéndose a lobby:', user.id);
        }
        socket.emit('call:register-user', { userId: user.id });
        socket.emit('call:lobby:join', {
          userId: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl,
          countryFlag: user.countryFlag,
          ratePerMinute,
        });
      }
    };

    if (socket.connected) {
      emitJoin();
    } else {
      socket.on('connect', emitJoin);
      socket.connect();
    }

    socket.on('call:lobby:waiting', () => {
      if (__DEV__) {
        console.log('[Lobby] En cola de espera del servidor...');
      }
      setStatusMessage(
        t('lobby.waitingTitle', { defaultValue: 'Esperando a alguien...' })
      );
    });

    // Evento emitido por el servidor cuando usuario A y B coinciden en la sala
    socket.on(
      'call:lobby:matched',
      (payload: {
        peer: {
          id: string;
          name: string;
          avatarUrl?: string;
          countryFlag?: string;
          ratePerMinute: number;
        };
        role: 'caller' | 'callee';
      }) => {
        setIsMatchingFound(true);
        setStatusMessage(
          t('lobby.partnerFound', { defaultValue: '¡Compañero encontrado! Conectando...' })
        );

        if (payload.role === 'caller') {
          matchingTimeoutRef.current = setTimeout(() => {
            initCallSession(
              {
                id: payload.peer.id,
                name: payload.peer.name,
                avatarUrl: payload.peer.avatarUrl,
                countryFlag: payload.peer.countryFlag,
                role: 'caller',
                ratePerMinute: payload.peer.ratePerMinute || 10,
              },
              'calling'
            );

            navigate(Routes.App.ActiveCall, {
              peerId: payload.peer.id,
              peerName: payload.peer.name,
              peerAvatar: payload.peer.avatarUrl,
              peerFlag: payload.peer.countryFlag,
              ratePerMinute: payload.peer.ratePerMinute || 10,
            });
          }, 1200);
        } else {
          // Callee: registrar al compañero entrante y esperar su señal para auto-conectar
          initCallSession(
            {
              id: payload.peer.id,
              name: payload.peer.name,
              avatarUrl: payload.peer.avatarUrl,
              countryFlag: payload.peer.countryFlag,
              role: 'callee',
              ratePerMinute: payload.peer.ratePerMinute || 10,
            },
            'incoming'
          );
        }
      }
    );

    // Si llega la llamada iniciada por el compañero emparejado en la sala
    socket.on('call:incoming', (payload: IncomingCallPayload) => {
      setIsMatchingFound(true);
      setStatusMessage(
        t('lobby.partnerFound', { defaultValue: '¡Compañero encontrado! Conectando...' })
      );

      initCallSession(
        {
          id: payload.caller?.id || 'caller',
          name: payload.caller?.name || 'Compañero',
          avatarUrl: payload.caller?.avatarUrl,
          role: 'callee',
          ratePerMinute: payload.caller?.ratePerMinute || 10,
        },
        'connected',
        payload.callId
      );

      matchingTimeoutRef.current = setTimeout(() => {
        navigate(Routes.App.ActiveCall, {
          callId: payload.callId,
          peerId: payload.caller?.id,
          peerName: payload.caller?.name || 'Compañero',
          peerAvatar: payload.caller?.avatarUrl,
          ratePerMinute: payload.caller?.ratePerMinute || 10,
          autoAccept: true,
        });
      }, 600);
    });

    return () => {
      socket.off('connect', emitJoin);
      socket.emit('call:lobby:leave', { userId: user.id });
      socket.off('call:lobby:waiting');
      socket.off('call:lobby:matched');
      socket.off('call:incoming');
      if (matchingTimeoutRef.current) {
        clearTimeout(matchingTimeoutRef.current);
      }
    };
  }, [
    handleConnectWithPeer,
    initialPeerAvatar,
    initialPeerFlag,
    initialPeerId,
    initialPeerName,
    initCallSession,
    isInstantMatch,
    ratePerMinute,
    t,
    user.avatarUrl,
    user.countryFlag,
    user.id,
    user.name,
  ]);

  const handleToggleMic = () => {
    toggleAudio();
    setIsMicMuted((prev) => !prev);
  };

  const handleToggleVideo = () => {
    toggleVideo();
    setIsVideoDisabled((prev) => !prev);
  };

  const handleBack = () => {
    const socket = getSocket();
    if (user.id) {
      socket.emit('call:lobby:leave', { userId: user.id });
    }
    if (matchingTimeoutRef.current) {
      clearTimeout(matchingTimeoutRef.current);
    }
    cleanup();
    goBack();
  };

  const availableMinutes = ratePerMinute > 0 ? Math.floor(coins / ratePerMinute) : 99;
  const localMedia = localStream as MediaStream | null;

  const radarScale = radarPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.2],
  });

  const radarOpacity = radarPulseAnim.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.7, 0.35, 0],
  });

  return (
    <SafeAreaContainer style={styles.container}>
      {/* Cabecera */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBack}
          style={styles.backButton}
        >
          <ArrowLeft size={22} color={colors.white} />
        </TouchableOpacity>
        <AppText variant="h3" color={colors.white}>
          {t('lobby.title', { defaultValue: 'Sala de espera' })}
        </AppText>
        <View style={{ width: 42 }} />
      </View>

      {/* Tarjeta de Vista Previa de Cámara */}
      <View style={styles.cameraPreviewCard}>
        {localMedia && !isVideoDisabled ? (
          <RTCView
            streamURL={localMedia.toURL()}
            style={styles.cameraStream}
            objectFit="cover"
            mirror
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <VideoOff size={38} color={colors.textSecondary} />
            <AppText
              variant="caption"
              color={colors.textSecondary}
              style={{ marginTop: 8 }}
            >
              {t('lobby.cameraOff')}
            </AppText>
          </View>
        )}

        {/* Badge indicador */}
        <View style={styles.previewBadge}>
          <View style={styles.previewDot} />
          <AppText variant="caption" color={colors.white}>
            {t('lobby.cameraPreview')}
          </AppText>
        </View>

        {/* Controles de pre-llamada */}
        <View style={styles.previewControlsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggleMic}
            style={[
              styles.previewControlButton,
              isMicMuted && styles.previewControlButtonActive,
            ]}
          >
            {isMicMuted ? (
              <MicOff size={20} color={colors.white} />
            ) : (
              <Mic size={20} color={colors.white} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggleVideo}
            style={[
              styles.previewControlButton,
              isVideoDisabled && styles.previewControlButtonActive,
            ]}
          >
            {isVideoDisabled ? (
              <VideoOff size={20} color={colors.white} />
            ) : (
              <Video size={20} color={colors.white} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={switchCamera}
            style={styles.previewControlButton}
          >
            <SwitchCamera size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sección Informativa y Radar de Espera */}
      <View style={styles.infoSection}>
        {/* Radar animado */}
        <View style={styles.radarContainer}>
          <Animated.View
            style={[
              styles.radarCircle,
              {
                transform: [{ scale: radarScale }],
                opacity: radarOpacity,
              },
            ]}
          />
          <View style={styles.radarCenterIcon}>
            {isMatchingFound ? (
              <Sparkles size={26} color={colors.white} />
            ) : (
              <Radio size={26} color={colors.white} />
            )}
          </View>
        </View>

        <AppText variant="h2" style={styles.waitingTitle}>
          {t('lobby.waitingTitle', { defaultValue: 'Esperando a alguien...' })}
        </AppText>

        <AppText variant="bodySmall" style={styles.waitingSubtitle}>
          {t('lobby.firstConnectsMessage', {
            defaultValue: 'El primero que se conecte hablará contigo.',
          })}
        </AppText>

        {/* Estado actual */}
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <AppText style={styles.statusText}>{statusMessage}</AppText>
        </View>

        {/* Advertencia de saldo/tiempo disponible */}
        <View style={styles.warningCard}>
          <AlertCircle size={18} color={colors.coin} />
          <AppText variant="caption" color={colors.coin}>
            {t('lobby.balanceWarning', { minutes: availableMinutes })}
          </AppText>
        </View>
      </View>

      {/* Botón de Acción Único: Cancelar y Salir */}
      <View style={styles.actionSection}>
        <AppButton
          title={t('lobby.leaveLobby', {
            defaultValue: 'Salir de la sala de espera',
          })}
          variant="secondary"
          onPress={handleBack}
          style={styles.cancelButton}
        />
      </View>
    </SafeAreaContainer>
  );
};

export default LobbyScreen;
