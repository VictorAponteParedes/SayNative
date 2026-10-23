import { useEffect, useRef, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from '@/lib/socketClient';
import { useAuthStore } from '@/store/useAuthStore';
import { useCallSessionStore } from '../store/useCallSessionStore';
import {
  CallEndedPayload,
  IceCandidateData,
  IncomingCallPayload,
  SignalData,
} from '../types';

export interface UseCallSignalingHandlers {
  onIncomingOffer?: (sdp: string) => Promise<void> | void;
  onIncomingAnswer?: (sdp: string) => Promise<void> | void;
  onRemoteIceCandidate?: (candidate: IceCandidateData) => Promise<void> | void;
  onCallAccepted?: () => void;
  onCallRejected?: (reason?: string) => void;
  onCallEnded?: (payload: CallEndedPayload) => void;
  onPeerBusy?: () => void;
}

export const useCallSignaling = (handlers?: UseCallSignalingHandlers) => {
  const socketRef = useRef<Socket | null>(null);
  const user = useAuthStore((s) => s.user);
  const currentUserId = user.id;
  const {
    currentCall,
    setCallStatus,
    setCallId,
    resetCallSession,
  } = useCallSessionStore();

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    if (!socket.connected) {
      socket.connect();
    }

    // Registro del usuario en el gateway
    if (currentUserId) {
      socket.emit('call:register-user', { userId: currentUserId });
    }

    // Escuchar timbrado
    socket.on('call:ringing', (data: { callId: string }) => {
      setCallId(data.callId);
      setCallStatus('ringing');
    });

    // Escuchar aceptación
    socket.on('call:accepted', (_data: { callId: string }) => {
      setCallStatus('connected');
      handlers?.onCallAccepted?.();
    });

    // Escuchar llamada entrante
    socket.on('call:incoming', (payload: IncomingCallPayload) => {
      setCallId(payload.callId);
      setCallStatus('incoming');
    });

    // Escuchar señalización SDP (oferta o respuesta)
    socket.on('call:signal', async (payload: { callId: string; signal: SignalData }) => {
      if (payload.signal.type === 'offer') {
        await handlers?.onIncomingOffer?.(payload.signal.sdp);
      } else if (payload.signal.type === 'answer') {
        await handlers?.onIncomingAnswer?.(payload.signal.sdp);
      }
    });

    // Escuchar candidato ICE remoto
    socket.on('call:ice-candidate', async (payload: { callId: string; candidate: IceCandidateData }) => {
      await handlers?.onRemoteIceCandidate?.(payload.candidate);
    });

    // Escuchar usuario ocupado
    socket.on('call:busy', () => {
      setCallStatus('busy');
      handlers?.onPeerBusy?.();
    });

    // Escuchar rechazo
    socket.on('call:rejected', (data: { reason?: string }) => {
      setCallStatus('rejected');
      handlers?.onCallRejected?.(data?.reason);
    });

    // Escuchar finalización de llamada
    socket.on('call:ended', (payload: CallEndedPayload) => {
      setCallStatus('ended');
      handlers?.onCallEnded?.(payload);
    });

    return () => {
      socket.off('call:ringing');
      socket.off('call:accepted');
      socket.off('call:incoming');
      socket.off('call:signal');
      socket.off('call:ice-candidate');
      socket.off('call:busy');
      socket.off('call:rejected');
      socket.off('call:ended');
    };
  }, [currentUserId, handlers, setCallId, setCallStatus]);

  // Emisores de señalización
  const initiateCall = useCallback(
    (receiverId: string, ratePerMinute: number) => {
      setCallStatus('calling');
      socketRef.current?.emit('call:initiate', {
        callerId: currentUserId,
        callerName: user.name,
        callerAvatar: user.avatarUrl,
        receiverId,
        ratePerMinute,
        callType: 'video',
      });
    },
    [currentUserId, setCallStatus, user.avatarUrl, user.name]
  );

  const acceptCall = useCallback(
    (callId: string) => {
      setCallStatus('connected');
      socketRef.current?.emit('call:accept', { callId, userId: currentUserId });
    },
    [currentUserId, setCallStatus]
  );

  const rejectCall = useCallback(
    (callId: string, reason?: string) => {
      setCallStatus('rejected');
      socketRef.current?.emit('call:reject', { callId, userId: currentUserId, reason });
      resetCallSession();
    },
    [currentUserId, resetCallSession, setCallStatus]
  );

  const sendSignal = useCallback(
    (signal: SignalData) => {
      const activeCallId = useCallSessionStore.getState().currentCall?.callId || currentCall?.callId || 'default-call';
      socketRef.current?.emit('call:signal', { callId: activeCallId, signal });
    },
    [currentCall?.callId]
  );

  const sendIceCandidate = useCallback(
    (candidate: IceCandidateData) => {
      const activeCallId = useCallSessionStore.getState().currentCall?.callId || currentCall?.callId || 'default-call';
      socketRef.current?.emit('call:ice-candidate', { callId: activeCallId, candidate });
    },
    [currentCall?.callId]
  );

  const endCall = useCallback(
    (durationSeconds: number) => {
      const callId = currentCall?.callId;
      if (callId) {
        socketRef.current?.emit('call:hangup', { callId, durationSeconds });
      }
      setCallStatus('ended');
    },
    [currentCall?.callId, setCallStatus]
  );

  return {
    initiateCall,
    acceptCall,
    rejectCall,
    sendSignal,
    sendIceCandidate,
    endCall,
  };
};

export default useCallSignaling;
