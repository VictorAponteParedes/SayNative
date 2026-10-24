import React, { useEffect, useCallback, useRef } from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { goBack } from '@/navigation/NavigationRef';
import { useCoinsStore } from '@/features/coins';
import { useCallSessionStore } from '../../store/useCallSessionStore';
import { useWebRTC } from '../../hooks/useWebRTC';
import { useCallSignaling } from '../../hooks/useCallSignaling';
import { useCallTimer } from '../../hooks/useCallTimer';
import { SignalData, IceCandidateData } from '../../types';
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
  const spendCoins = useCoinsStore((s) => s.spendCoins);
  const rewardCoins = useCoinsStore((s) => s.rewardCoins);

  const {
    currentCall,
    localStream,
    remoteStream,
    remoteStreamVersion,
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

  const sendSignalRef = useRef<(signal: SignalData) => void>(() => {});
  // Se marca true únicamente si este dispositivo emitió 'call:initiate'
  const isCallerRef = useRef(false);
  const sendIceCandidateRef = useRef<(candidate: IceCandidateData) => void>(() => {});
  const webRtcRef = useRef<{
    createOffer: () => Promise<SignalData | null>;
    handleIncomingOffer: (sdp: string) => Promise<SignalData | null>;
    handleIncomingAnswer: (sdp: string) => Promise<void>;
    addRemoteIceCandidate: (candidate: IceCandidateData) => Promise<void>;
  }>({
    createOffer: async () => null,
    handleIncomingOffer: async () => null,
    handleIncomingAnswer: async () => {},
    addRemoteIceCandidate: async () => {},
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
      // Solo quien inició la llamada genera la oferta SDP (evita glare si el
      // backend emite 'call:accepted' a ambos participantes)
      if (isCallerRef.current) {
        await webRtcRef.current.createOffer();
      }
    },
    onIncomingOffer: async (sdp) => {
      setCallStatus('connected');
      startTimer();
      await webRtcRef.current.handleIncomingOffer(sdp);
    },
    onIncomingAnswer: async (sdp) => {
      await webRtcRef.current.handleIncomingAnswer(sdp);
      setCallStatus('connected');
      startTimer();
    },
    onRemoteIceCandidate: async (candidate) => {
      await webRtcRef.current.addRemoteIceCandidate(candidate);
    },
    onCallEnded: (payload) => {
      stopTimer();
      cleanup();
      if (!isTeacher) {
        spendCoins(payload.coinsCharged, {
          titleKey: 'items.callEmma',
          subtitleKey: 'items.callEmmaSub',
        });
      } else {
        rewardCoins(payload.coinsCharged, {
          titleKey: 'items.taughtDavid',
          subtitleKey: 'items.taughtDavidSub',
          iconType: 'tutor',
        });
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

  sendSignalRef.current = sendSignal;
  sendIceCandidateRef.current = sendIceCandidate;

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
      sendIceCandidateRef.current(candidate);
    },
    onNegotiationNeeded: (signal) => {
      sendSignalRef.current(signal);
    },
  });

  webRtcRef.current = {
    createOffer,
    handleIncomingOffer,
    handleIncomingAnswer,
    addRemoteIceCandidate,
  };

  // Inicio de llamada al montar
  useEffect(() => {
    if (route?.params?.callId) {
      useCallSessionStore.getState().setCallId(route.params.callId);
    }

    const setupCall = async () => {
      await startLocalMedia();
      if (currentCall?.peer?.id && currentCall.status === 'calling') {
        isCallerRef.current = true;
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
      spendCoins(coinsCount, {
        titleKey: 'items.callCompleted',
        subtitleKey: 'items.callSarahSub',
      });
    } else {
      rewardCoins(coinsCount, {
        titleKey: 'items.taughtDavid',
        subtitleKey: 'items.taughtDavidSub',
        iconType: 'tutor',
      });
    }

    setCallStatus('ended');
    resetCallSession();
    goBack();
  }, [
    cleanup,
    coinsCount,
    isTeacher,
    resetCallSession,
    rewardCoins,
    seconds,
    setCallStatus,
    signalEndCall,
    spendCoins,
    stopTimer,
  ]);

  return (
    <View style={styles.container}>
      {/* Visualización de Streams de Video (Fondo remoto + PIP local) */}
      <VideoStreamView
        remoteStream={remoteStream}
        remoteStreamVersion={remoteStreamVersion}
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
