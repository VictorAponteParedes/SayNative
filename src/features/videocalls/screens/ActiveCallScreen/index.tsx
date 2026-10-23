import React, { useEffect, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { goBack } from '@/navigation/NavigationRef';
import { useAuthStore } from '@/store/useAuthStore';
import { useCallSessionStore } from '../../store/useCallSessionStore';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useCallSignaling } from '../../hooks/useCallSignaling';
import { useCallTimer } from '../../hooks/useCallTimer';
import {
  VideoStreamView,
  CallControls,
  CallDurationTimer,
  CoinUsageBadge,
  CallStatusOverlay,
} from '../../components';
import { styles } from './styles';

export interface ActiveCallScreenProps {
  route?: {
    params?: {
      callId?: string;
      peerId?: string;
      peerName?: string;
      peerAvatar?: string;
      ratePerMinute?: number;
    };
  };
}

export const ActiveCallScreen: React.FC<ActiveCallScreenProps> = ({ route }) => {
  const { t } = useTranslation('calls');
  const deductCoins = useAuthStore((s) => s.deductCoins);
  const addCoins = useAuthStore((s) => s.addCoins);

  const {
    currentCall,
    localStream,
    remoteStream,
    toggleAudioMute,
    toggleVideoMute,
    toggleCameraFacing,
    resetCallSession,
    setCallStatus,
  } = useCallSessionStore();

  const peerName = currentCall?.peer?.name || route?.params?.peerName || 'Compañero';
  const peerAvatar = currentCall?.peer?.avatarUrl || route?.params?.peerAvatar;
  const ratePerMinute = currentCall?.peer?.ratePerMinute || route?.params?.ratePerMinute || 10;
  const isTeacher = currentCall?.peer?.role === 'callee';

  // Hook del Timer en vivo
  const {
    seconds,
    formattedTime,
    coinsCount,
    startTimer,
    stopTimer,
  } = useCallTimer({
    ratePerMinute,
    isTeacher,
  });

  // Hook de WebRTC
  const {
    startLocalMedia,
    createOffer,
    handleIncomingOffer,
    handleIncomingAnswer,
    addRemoteIceCandidate,
    toggleAudio,
    toggleVideo,
    switchCamera,
    cleanup,
  } = useWebRTC({
    onLocalCandidate: (candidate) => {
      sendIceCandidate(candidate);
    },
    onNegotiationNeeded: (signal) => {
      sendSignal(signal);
    },
  });

  // Hook de Señalización Socket.IO
  const {
    initiateCall,
    sendSignal,
    sendIceCandidate,
    endCall: signalEndCall,
  } = useCallSignaling({
    onCallAccepted: async () => {
      setCallStatus('connected');
      startTimer();
      // Si somos quien llama, generamos la oferta SDP
      await createOffer();
    },
    onIncomingOffer: async (sdp) => {
      setCallStatus('connected');
      startTimer();
      await handleIncomingOffer(sdp);
    },
    onIncomingAnswer: async (sdp) => {
      await handleIncomingAnswer(sdp);
      setCallStatus('connected');
      startTimer();
    },
    onRemoteIceCandidate: async (candidate) => {
      await addRemoteIceCandidate(candidate);
    },
    onCallEnded: (payload) => {
      stopTimer();
      cleanup();
      if (!isTeacher) {
        deductCoins(payload.coinsCharged);
      } else {
        addCoins(payload.coinsCharged);
      }
      resetCallSession();
      Alert.alert(
        t('summary.title'),
        t('summary.totalMinutes', {
          minutes: Math.floor(payload.durationSeconds / 60),
          seconds: payload.durationSeconds % 60,
        }),
        [{ text: t('summary.backHome'), onPress: () => goBack() }]
      );
    },
    onPeerBusy: () => {
      stopTimer();
      cleanup();
      Alert.alert(t('errors.userBusy'), undefined, [
        { text: 'OK', onPress: () => goBack() },
      ]);
    },
    onCallRejected: () => {
      stopTimer();
      cleanup();
      Alert.alert(t('errors.callRejected', { name: peerName }), undefined, [
        { text: 'OK', onPress: () => goBack() },
      ]);
    },
  });

  // Inicio de llamada al montar
  useEffect(() => {
    if (route?.params?.callId) {
      useCallSessionStore.getState().setCallId(route.params.callId);
    }

    const setupCall = async () => {
      await startLocalMedia();
      if (currentCall?.peer?.id && currentCall.status === 'calling') {
        initiateCall(currentCall.peer.id, ratePerMinute);
      }
    };

    setupCall();
  }, [currentCall?.peer?.id, currentCall?.status, initiateCall, ratePerMinute, startLocalMedia]);

  const handleToggleAudio = () => {
    toggleAudio();
    toggleAudioMute();
  };

  const handleToggleVideo = () => {
    toggleVideo();
    toggleVideoMute();
  };

  const handleSwitchCamera = () => {
    switchCamera();
    toggleCameraFacing();
  };

  const handleEndCall = useCallback(() => {
    stopTimer();
    signalEndCall(seconds);
    cleanup();

    if (!isTeacher) {
      deductCoins(coinsCount);
    } else {
      addCoins(coinsCount);
    }

    setCallStatus('ended');
    resetCallSession();
    goBack();
  }, [
    addCoins,
    cleanup,
    coinsCount,
    deductCoins,
    isTeacher,
    resetCallSession,
    seconds,
    setCallStatus,
    signalEndCall,
    stopTimer,
  ]);

  return (
    <View style={styles.container}>
      {/* Visualización de Streams de Video (Fondo remoto + PIP local) */}
      <VideoStreamView
        remoteStream={remoteStream}
        localStream={localStream}
        remoteUserName={peerName}
        remoteUserAvatar={peerAvatar}
        isLocalVideoMuted={currentCall?.isVideoMuted || false}
      />

      {/* Indicador de estado de la llamada (Llamando, Conectando, Reconectando) */}
      <CallStatusOverlay
        status={currentCall?.status || 'connecting'}
        peerName={peerName}
      />

      {/* Barra superior con Duración y Monedas en vivo */}
      <View style={styles.topBar}>
        <CallDurationTimer formattedTime={formattedTime} />
        <CoinUsageBadge
          coins={coinsCount}
          ratePerMinute={ratePerMinute}
          isTeacher={isTeacher}
        />
      </View>

      {/* Controles de llamada inferiores */}
      <View style={styles.bottomBar}>
        <CallControls
          isAudioMuted={currentCall?.isAudioMuted || false}
          isVideoMuted={currentCall?.isVideoMuted || false}
          onToggleAudio={handleToggleAudio}
          onToggleVideo={handleToggleVideo}
          onSwitchCamera={handleSwitchCamera}
          onEndCall={handleEndCall}
        />
      </View>
    </View>
  );
};

export default ActiveCallScreen;
