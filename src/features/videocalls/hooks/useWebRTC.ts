import { useEffect, useRef, useCallback } from 'react';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
} from 'react-native-webrtc';
import { useCallSessionStore } from '../store/useCallSessionStore';
import { callsApi } from '../api/callsApi';
import { IceCandidateData, SignalData } from '../types';

export interface UseWebRTCProps {
  onLocalCandidate?: (candidate: IceCandidateData) => void;
  onNegotiationNeeded?: (signal: SignalData) => void;
}

interface RTCPeerIceEvent {
  candidate: RTCIceCandidate | null;
}

interface RTCPeerTrackEvent {
  streams: MediaStream[];
}

export const useWebRTC = ({
  onLocalCandidate,
  onNegotiationNeeded,
}: UseWebRTCProps = {}) => {
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const {
    currentCall,
    setLocalStream,
    setRemoteStream,
    setPermissions,
    setNetworkQuality,
  } = useCallSessionStore();

  /**
   * Inicializa la captura de cámara y micrófono local
   */
  const startLocalMedia = useCallback(async (): Promise<MediaStream | null> => {
    try {
      const stream = (await mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: 'user',
          frameRate: 30,
        },
      })) as MediaStream;

      localStreamRef.current = stream;
      setLocalStream(stream);
      setPermissions(true, true);
      return stream;
    } catch {
      setPermissions(false, false);
      return null;
    }
  }, [setLocalStream, setPermissions]);

  /**
   * Crea e inicializa la instancia de RTCPeerConnection con servidores STUN
   */
  const initPeerConnection = useCallback(async (): Promise<RTCPeerConnection> => {
    if (peerConnectionRef.current) {
      return peerConnectionRef.current;
    }

    const iceServers = await callsApi.getIceServers();
    const pc = new RTCPeerConnection({
      iceServers,
    });

    // Envío de candidatos ICE locales
    pc.onicecandidate = (event) => {
      const iceEvent = event as unknown as RTCPeerIceEvent;
      if (iceEvent.candidate && onLocalCandidate) {
        onLocalCandidate({
          candidate: iceEvent.candidate.candidate,
          sdpMid: iceEvent.candidate.sdpMid ?? null,
          sdpMLineIndex: iceEvent.candidate.sdpMLineIndex ?? null,
        });
      }
    };

    // Recepción del stream remoto
    pc.ontrack = (event) => {
      const trackEvent = event as unknown as RTCPeerTrackEvent;
      if (trackEvent.streams && trackEvent.streams[0]) {
        setRemoteStream(trackEvent.streams[0]);
      }
    };

    // Monitoreo del estado de conexión ICE
    pc.oniceconnectionstatechange = () => {
      switch (pc.iceConnectionState) {
        case 'connected':
        case 'completed':
          setNetworkQuality('excellent');
          break;
        case 'disconnected':
          setNetworkQuality('poor');
          break;
        case 'failed':
          setNetworkQuality('poor');
          break;
        default:
          setNetworkQuality('unknown');
          break;
      }
    };

    // Agregar tracks locales a la conexión peer
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current as MediaStream);
      });
    }

    peerConnectionRef.current = pc;
    return pc;
  }, [onLocalCandidate, setNetworkQuality, setRemoteStream]);

  /**
   * Crea una oferta SDP y la emite
   */
  const createOffer = useCallback(async (): Promise<SignalData | null> => {
    try {
      const pc = await initPeerConnection();
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pc.setLocalDescription(offer);

      const signal: SignalData = {
        type: 'offer',
        sdp: offer.sdp,
      };

      if (onNegotiationNeeded) {
        onNegotiationNeeded(signal);
      }

      return signal;
    } catch {
      return null;
    }
  }, [initPeerConnection, onNegotiationNeeded]);

  /**
   * Maneja la oferta entrante y genera una respuesta SDP
   */
  const handleIncomingOffer = useCallback(
    async (sdp: string): Promise<SignalData | null> => {
      try {
        const pc = await initPeerConnection();
        const description = new RTCSessionDescription({
          type: 'offer',
          sdp,
        });
        await pc.setRemoteDescription(description);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        const signal: SignalData = {
          type: 'answer',
          sdp: answer.sdp,
        };

        if (onNegotiationNeeded) {
          onNegotiationNeeded(signal);
        }

        return signal;
      } catch {
        return null;
      }
    },
    [initPeerConnection, onNegotiationNeeded]
  );

  /**
   * Maneja la respuesta SDP del par remoto
   */
  const handleIncomingAnswer = useCallback(async (sdp: string): Promise<void> => {
    try {
      if (!peerConnectionRef.current) return;
      const description = new RTCSessionDescription({
        type: 'answer',
        sdp,
      });
      await peerConnectionRef.current.setRemoteDescription(description);
    } catch {
      // Error al aplicar SDP remoto
    }
  }, []);

  /**
   * Agrega un candidato ICE recibido del par remoto
   */
  const addRemoteIceCandidate = useCallback(
    async (candidateData: IceCandidateData): Promise<void> => {
      try {
        if (!peerConnectionRef.current) return;
        const candidate = new RTCIceCandidate(candidateData);
        await peerConnectionRef.current.addIceCandidate(candidate);
      } catch {
        // Error al agregar candidato
      }
    },
    []
  );

  /**
   * Alterna el estado del micrófono
   */
  const toggleAudio = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  }, []);

  /**
   * Alterna el estado de la cámara
   */
  const toggleVideo = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
  }, []);

  /**
   * Alterna entre cámara frontal y trasera
   */
  const switchCamera = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        // En react-native-webrtc los MediaStreamTrack tienen _switchCamera()
        const customTrack = track as unknown as { _switchCamera?: () => void };
        if (typeof customTrack._switchCamera === 'function') {
          customTrack._switchCamera();
        }
      });
    }
  }, []);

  /**
   * Libera todos los recursos multimedia y la conexión peer
   */
  const cleanup = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    setLocalStream(null);
    setRemoteStream(null);
  }, [setLocalStream, setRemoteStream]);

  // Sincronizar mute si cambia en el store
  useEffect(() => {
    if (localStreamRef.current && currentCall) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !currentCall.isAudioMuted;
      });
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !currentCall.isVideoMuted;
      });
    }
  }, [currentCall?.isAudioMuted, currentCall?.isVideoMuted]);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    startLocalMedia,
    initPeerConnection,
    createOffer,
    handleIncomingOffer,
    handleIncomingAnswer,
    addRemoteIceCandidate,
    toggleAudio,
    toggleVideo,
    switchCamera,
    cleanup,
  };
};

export default useWebRTC;
