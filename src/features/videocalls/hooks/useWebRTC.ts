import { useEffect, useRef, useCallback } from 'react';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
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
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const iceCandidatesQueueRef = useRef<IceCandidateData[]>([]);
  const pcInitPromiseRef = useRef<Promise<RTCPeerConnection> | null>(null);

  const onLocalCandidateRef = useRef(onLocalCandidate);
  const onNegotiationNeededRef = useRef(onNegotiationNeeded);

  useEffect(() => {
    onLocalCandidateRef.current = onLocalCandidate;
    onNegotiationNeededRef.current = onNegotiationNeeded;
  });

  const {
    currentCall,
    setLocalStream,
    setRemoteStream,
    setPermissions,
    setNetworkQuality,
  } = useCallSessionStore();

  const drainCandidateQueue = async (pc: RTCPeerConnection) => {
    while (iceCandidatesQueueRef.current.length > 0) {
      const candidateData = iceCandidatesQueueRef.current.shift();
      if (candidateData) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidateData));
          if (__DEV__) {
            console.log('[WebRTC] Drained queued ICE candidate');
          }
        } catch (err) {
          if (__DEV__) {
            console.warn('[WebRTC] Error draining ICE candidate:', err);
          }
        }
      }
    }
  };

  /**
   * Inicializa la captura de cámara y micrófono local
   */
  const startLocalMedia = useCallback(async (): Promise<MediaStream | null> => {
    if (localStreamRef.current) {
      return localStreamRef.current;
    }

    // Si ya existe un stream local capturado previamente en el store (ej. LobbyScreen)
    const existingStoreStream = useCallSessionStore.getState().localStream as MediaStream | null;
    if (existingStoreStream && typeof existingStoreStream.getTracks === 'function' && existingStoreStream.getTracks().length > 0) {
      localStreamRef.current = existingStoreStream;
      setPermissions(true, true);
      if (peerConnectionRef.current) {
        const pc = peerConnectionRef.current;
        const currentSenders = pc.getSenders();
        existingStoreStream.getTracks().forEach((track) => {
          const alreadyAdded = currentSenders.some((s) => s.track?.id === track.id);
          if (!alreadyAdded) {
            pc.addTrack(track, existingStoreStream);
          }
        });
      }
      return existingStoreStream;
    }

    try {
      if (__DEV__) {
        console.log('[WebRTC] Starting local camera and microphone...');
      }
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

      // Si la conexión peer ya existe, adjuntar tracks locales sin duplicar
      if (peerConnectionRef.current) {
        const pc = peerConnectionRef.current;
        const currentSenders = pc.getSenders();
        stream.getTracks().forEach((track) => {
          const alreadyAdded = currentSenders.some((s) => s.track?.id === track.id);
          if (!alreadyAdded) {
            pc.addTrack(track, stream);
          }
        });
      }

      if (__DEV__) {
        console.log('[WebRTC] Local media started successfully. Tracks:', stream.getTracks().length);
      }
      return stream;
    } catch (err) {
      if (__DEV__) {
        console.warn('[WebRTC] Error starting local media:', err);
      }
      setPermissions(false, false);
      return null;
    }
  }, [setLocalStream, setPermissions]);

  /**
   * Crea e inicializa la instancia de RTCPeerConnection con servidores STUN y TURN
   */
  const initPeerConnection = useCallback(async (): Promise<RTCPeerConnection> => {
    if (peerConnectionRef.current) {
      return peerConnectionRef.current;
    }

    // Evita crear dos RTCPeerConnection si se llama en paralelo (createOffer + handleIncomingOffer)
    if (pcInitPromiseRef.current) {
      return pcInitPromiseRef.current;
    }

    pcInitPromiseRef.current = (async () => {
    const iceServers = await callsApi.getIceServers();
    if (__DEV__) {
      console.log('[WebRTC] Initializing RTCPeerConnection with ICE servers:', iceServers.length);
    }

    const pc = new RTCPeerConnection({
      iceServers,
    });

    // Envío de candidatos ICE locales
    pc.onicecandidate = (event) => {
      const iceEvent = event as unknown as RTCPeerIceEvent;
      if (iceEvent.candidate && onLocalCandidateRef.current) {
        if (__DEV__) {
          console.log('[WebRTC] Local ICE candidate gathered:', iceEvent.candidate.candidate);
        }
        onLocalCandidateRef.current({
          candidate: iceEvent.candidate.candidate,
          sdpMid: iceEvent.candidate.sdpMid ?? null,
          sdpMLineIndex: iceEvent.candidate.sdpMLineIndex ?? null,
        });
      }
    };

    // Recepción del stream remoto
    pc.ontrack = (event) => {
      const trackEvent = event as unknown as {
        streams?: MediaStream[];
        track?: MediaStreamTrack;
      };
      const track = trackEvent.track;

      if (__DEV__) {
        console.log('[WebRTC] ontrack fired:', track?.kind, track?.id);
      }
      if (trackEvent.streams && trackEvent.streams[0]) {
        const remoteStream = trackEvent.streams[0];
        remoteStreamRef.current = remoteStream;
        setRemoteStream(remoteStream);

        // Escuchar si llega la pista de video después del audio
        remoteStream.onaddtrack = () => {
          if (__DEV__) {
            console.log('[WebRTC] onaddtrack dynamically fired on remote stream');
          }
          setRemoteStream(remoteStream);
        };
      } else if (track) {
        if (!remoteStreamRef.current) {
          remoteStreamRef.current = new MediaStream();
        }
        remoteStreamRef.current.addTrack(track);
        setRemoteStream(remoteStreamRef.current);
      }
    };

    // Soporte para onaddstream de react-native-webrtc (fallback)
    const pcWithLegacy = pc as unknown as {
      onaddstream?: (ev: { stream: MediaStream }) => void;
    };
    pcWithLegacy.onaddstream = (event) => {
      if (event && event.stream) {
        if (__DEV__) {
          console.log('[WebRTC] onaddstream legacy fired with stream');
        }
        remoteStreamRef.current = event.stream;
        setRemoteStream(event.stream);
      }
    };

    // Monitoreo del estado de conexión ICE
    pc.oniceconnectionstatechange = () => {
      if (__DEV__) {
        console.log('[WebRTC] ICE Connection State:', pc.iceConnectionState);
      }
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

    // Agregar tracks locales si ya están capturados
    if (localStreamRef.current) {
      const stream = localStreamRef.current;
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });
    }

    peerConnectionRef.current = pc;
    return pc;
    })();

    try {
      return await pcInitPromiseRef.current;
    } finally {
      pcInitPromiseRef.current = null;
    }
  }, [setNetworkQuality, setRemoteStream]);

  /**
   * Crea una oferta SDP y la emite
   */
  const createOffer = useCallback(async (): Promise<SignalData | null> => {
    try {
      // Asegurarse de que el stream local esté listo antes de generar la oferta
      if (!localStreamRef.current) {
        await startLocalMedia();
      }

      const pc = await initPeerConnection();

      // Si ya hay una negociación en curso (ej. ya recibimos la oferta del otro par),
      // no generamos otra oferta para evitar "glare" (have-remote-offer)
      if (pc.signalingState !== 'stable' || pc.remoteDescription) {
        if (__DEV__) {
          console.log('[WebRTC] createOffer skipped. signalingState:', pc.signalingState);
        }
        return null;
      }

      // Asegurar que las pistas locales estén agregadas
      if (localStreamRef.current) {
        const senders = pc.getSenders();
        localStreamRef.current.getTracks().forEach((track) => {
          const alreadyAdded = senders.some((s) => s.track?.id === track.id);
          if (!alreadyAdded) {
            pc.addTrack(track, localStreamRef.current as MediaStream);
          }
        });
      }

      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      // Revalidar: mientras se creaba la oferta pudo llegar la oferta remota
      if (pc.signalingState !== 'stable') {
        if (__DEV__) {
          console.log('[WebRTC] Offer discarded, state changed to:', pc.signalingState);
        }
        return null;
      }
      await pc.setLocalDescription(offer);

      if (__DEV__) {
        console.log('[WebRTC] Offer created and set as local description');
      }

      const signal: SignalData = {
        type: 'offer',
        sdp: offer.sdp,
      };

      if (onNegotiationNeededRef.current) {
        onNegotiationNeededRef.current(signal);
      }

      return signal;
    } catch (err) {
      if (__DEV__) {
        console.error('[WebRTC] Error in createOffer:', err);
      }
      return null;
    }
  }, [initPeerConnection, startLocalMedia]);

  /**
   * Maneja la oferta entrante y genera una respuesta SDP
   */
  const handleIncomingOffer = useCallback(
    async (sdp: string): Promise<SignalData | null> => {
      try {
        if (__DEV__) {
          console.log('[WebRTC] Handling incoming offer...');
        }
        // Esperar captura de medios locales si aún no está lista
        if (!localStreamRef.current) {
          await startLocalMedia();
        }

        const pc = await initPeerConnection();

        // Si ya tenemos una oferta remota procesada o el estado no es stable
        if (pc.signalingState !== 'stable') {
          if (pc.signalingState === 'have-remote-offer') {
            if (__DEV__) {
              console.log('[WebRTC] Offer already set as remote description');
            }
          } else {
            if (__DEV__) {
              console.warn('[WebRTC] Handling offer collision in state:', pc.signalingState);
            }
            try {
              await pc.setLocalDescription(new RTCSessionDescription({ type: 'rollback', sdp: '' }));
            } catch {
              // Rollback no crítico
            }
          }
        }

        // Agregar pistas locales a la conexión antes de responder
        if (localStreamRef.current) {
          const senders = pc.getSenders();
          localStreamRef.current.getTracks().forEach((track) => {
            const alreadyAdded = senders.some((s) => s.track?.id === track.id);
            if (!alreadyAdded) {
              pc.addTrack(track, localStreamRef.current as MediaStream);
            }
          });
        }

        if (pc.signalingState !== 'have-remote-offer') {
          const description = new RTCSessionDescription({
            type: 'offer',
            sdp,
          });
          await pc.setRemoteDescription(description);
        }

        // Desencolar candidatos ICE recibidos antes de la oferta
        await drainCandidateQueue(pc);

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        if (__DEV__) {
          console.log('[WebRTC] Answer created and set as local description');
        }

        const signal: SignalData = {
          type: 'answer',
          sdp: answer.sdp,
        };

        if (onNegotiationNeededRef.current) {
          onNegotiationNeededRef.current(signal);
        }

        return signal;
      } catch (err) {
        if (__DEV__) {
          console.error('[WebRTC] Error in handleIncomingOffer:', err);
        }
        return null;
      }
    },
    [initPeerConnection, startLocalMedia]
  );

  /**
   * Maneja la respuesta SDP del par remoto
   */
  const handleIncomingAnswer = useCallback(async (sdp: string): Promise<void> => {
    try {
      const pc = peerConnectionRef.current;
      if (!pc) return;
      if (__DEV__) {
        console.log('[WebRTC] Handling incoming answer. signalingState:', pc.signalingState);
      }

      // Si el peer ya está en estado 'stable', la respuesta ya fue procesada o somos el callee
      if (pc.signalingState === 'stable') {
        if (__DEV__) {
          console.log('[WebRTC] Incoming answer ignored: signalingState is already stable');
        }
        await drainCandidateQueue(pc);
        return;
      }

      if (pc.signalingState !== 'have-local-offer') {
        if (__DEV__) {
          console.warn('[WebRTC] Cannot set remote answer in signalingState:', pc.signalingState);
        }
        return;
      }

      const description = new RTCSessionDescription({
        type: 'answer',
        sdp,
      });
      await pc.setRemoteDescription(description);

      // Desencolar candidatos ICE recibidos antes de la respuesta
      await drainCandidateQueue(pc);
      if (__DEV__) {
        console.log('[WebRTC] Remote answer applied and candidate queue drained');
      }
    } catch (err) {
      if (__DEV__) {
        console.error('[WebRTC] Error in handleIncomingAnswer:', err);
      }
    }
  }, []);

  /**
   * Agrega un candidato ICE recibido del par remoto
   */
  const addRemoteIceCandidate = useCallback(
    async (candidateData: IceCandidateData): Promise<void> => {
      try {
        const pc = peerConnectionRef.current;
        if (!pc || !pc.remoteDescription) {
          if (__DEV__) {
            console.log('[WebRTC] Enqueuing remote ICE candidate (remoteDescription not set yet)');
          }
          iceCandidatesQueueRef.current.push(candidateData);
          return;
        }
        const candidate = new RTCIceCandidate(candidateData);
        await pc.addIceCandidate(candidate);
        if (__DEV__) {
          console.log('[WebRTC] Successfully added remote ICE candidate');
        }
      } catch (err) {
        if (__DEV__) {
          console.warn('[WebRTC] Error adding remote ICE candidate:', err);
        }
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

    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach((track) => track.stop());
      remoteStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    iceCandidatesQueueRef.current = [];
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
