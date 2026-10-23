/**
 * Tipos y Contratos para el módulo de Videollamadas P2P WebRTC
 */

export type CallStatus =
  | 'idle'
  | 'calling'
  | 'ringing'
  | 'incoming'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'ended'
  | 'busy'
  | 'rejected'
  | 'failed';

export type NetworkQuality = 'excellent' | 'good' | 'poor' | 'unknown';

export interface CallParticipant {
  id: string;
  name: string;
  avatarUrl?: string;
  countryFlag?: string;
  role: 'caller' | 'callee';
  ratePerMinute: number;
}

export interface CallSession {
  callId: string;
  peer: CallParticipant;
  startedAt?: number;
  durationSeconds: number;
  coinsSpent: number;
  coinsEarned: number;
  status: CallStatus;
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  isFrontCamera: boolean;
  networkQuality: NetworkQuality;
}

export interface IceServerConfig {
  urls: string | string[];
  username?: string;
  credential?: string;
}

export interface WebRTCConfiguration {
  iceServers: IceServerConfig[];
}

export interface SignalData {
  type: 'offer' | 'answer';
  sdp: string;
}

export interface IceCandidateData {
  candidate: string;
  sdpMid?: string | null;
  sdpMLineIndex?: number | null;
}

export interface InitiateCallPayload {
  receiverId: string;
  callType: 'video' | 'audio';
  ratePerMinute: number;
}

export interface IncomingCallPayload {
  callId: string;
  caller: CallParticipant;
  callType: 'video' | 'audio';
  timestamp: string;
}

export interface CallEndedPayload {
  callId: string;
  durationSeconds: number;
  coinsCharged: number;
  reason?: 'hangup' | 'declined' | 'timeout' | 'busy' | 'disconnected';
}
