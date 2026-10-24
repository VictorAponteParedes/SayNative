import { create } from 'zustand';
import {
  CallParticipant,
  CallSession,
  CallStatus,
  NetworkQuality,
} from '../types';

interface CallSessionState {
  currentCall: CallSession | null;
  localStream: unknown | null;
  remoteStream: unknown | null;
  remoteStreamVersion: number;
  hasCameraPermission: boolean;
  hasMicrophonePermission: boolean;

  // Acciones
  initCallSession: (peer: CallParticipant, initialStatus?: CallStatus, callId?: string) => void;
  setCallId: (callId: string) => void;
  setCallStatus: (status: CallStatus) => void;
  setLocalStream: (stream: unknown | null) => void;
  setRemoteStream: (stream: unknown | null) => void;
  toggleAudioMute: () => void;
  toggleVideoMute: () => void;
  toggleCameraFacing: () => void;
  setNetworkQuality: (quality: NetworkQuality) => void;
  updateDurationAndCoins: (durationSeconds: number, coinsSpent: number, coinsEarned: number) => void;
  setPermissions: (camera: boolean, microphone: boolean) => void;
  resetCallSession: () => void;
}

const DEFAULT_PARTICIPANT: CallParticipant = {
  id: '',
  name: '',
  role: 'caller',
  ratePerMinute: 10,
};

export const useCallSessionStore = create<CallSessionState>((set) => ({
  currentCall: null,
  localStream: null,
  remoteStream: null,
  remoteStreamVersion: 0,
  hasCameraPermission: false,
  hasMicrophonePermission: false,

  initCallSession: (peer, initialStatus = 'idle', callId = '') =>
    set((state) => ({
      currentCall: {
        callId,
        peer,
        startedAt: initialStatus === 'connected' ? Date.now() : undefined,
        durationSeconds: 0,
        coinsSpent: 0,
        coinsEarned: 0,
        status: initialStatus,
        isAudioMuted: false,
        isVideoMuted: false,
        isFrontCamera: true,
        networkQuality: 'unknown',
      },
      localStream: state.localStream,
      remoteStream: null,
    })),

  setCallId: (callId) =>
    set((state) => ({
      currentCall: state.currentCall
        ? { ...state.currentCall, callId }
        : {
            callId,
            peer: DEFAULT_PARTICIPANT,
            durationSeconds: 0,
            coinsSpent: 0,
            coinsEarned: 0,
            status: 'idle',
            isAudioMuted: false,
            isVideoMuted: false,
            isFrontCamera: true,
            networkQuality: 'unknown',
          },
    })),

  setCallStatus: (status) =>
    set((state) => {
      if (!state.currentCall) return state;
      const startedAt =
        status === 'connected' && !state.currentCall.startedAt
          ? Date.now()
          : state.currentCall.startedAt;
      return {
        currentCall: {
          ...state.currentCall,
          status,
          startedAt,
        },
      };
    }),

  setLocalStream: (stream) => set({ localStream: stream }),

  // Se incrementa la versión para forzar re-render aunque el objeto stream sea el mismo
  // (ej. cuando llega la pista de video después de la de audio en iOS)
  setRemoteStream: (stream) =>
    set((state) => ({
      remoteStream: stream,
      remoteStreamVersion: state.remoteStreamVersion + 1,
    })),

  toggleAudioMute: () =>
    set((state) => {
      if (!state.currentCall) return state;
      return {
        currentCall: {
          ...state.currentCall,
          isAudioMuted: !state.currentCall.isAudioMuted,
        },
      };
    }),

  toggleVideoMute: () =>
    set((state) => {
      if (!state.currentCall) return state;
      return {
        currentCall: {
          ...state.currentCall,
          isVideoMuted: !state.currentCall.isVideoMuted,
        },
      };
    }),

  toggleCameraFacing: () =>
    set((state) => {
      if (!state.currentCall) return state;
      return {
        currentCall: {
          ...state.currentCall,
          isFrontCamera: !state.currentCall.isFrontCamera,
        },
      };
    }),

  setNetworkQuality: (quality) =>
    set((state) => {
      if (!state.currentCall) return state;
      return {
        currentCall: {
          ...state.currentCall,
          networkQuality: quality,
        },
      };
    }),

  updateDurationAndCoins: (durationSeconds, coinsSpent, coinsEarned) =>
    set((state) => {
      if (!state.currentCall) return state;
      return {
        currentCall: {
          ...state.currentCall,
          durationSeconds,
          coinsSpent,
          coinsEarned,
        },
      };
    }),

  setPermissions: (camera, microphone) =>
    set({
      hasCameraPermission: camera,
      hasMicrophonePermission: microphone,
    }),

  resetCallSession: () =>
    set({
      currentCall: null,
      localStream: null,
      remoteStream: null,
    }),
}));

export default useCallSessionStore;
