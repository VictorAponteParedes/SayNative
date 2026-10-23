import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  SwitchCamera,
  PhoneOff,
} from 'lucide-react-native';
import { colors } from '@/theme';

export interface CallControlsProps {
  isAudioMuted: boolean;
  isVideoMuted: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onSwitchCamera: () => void;
  onEndCall: () => void;
}

export const CallControls: React.FC<CallControlsProps> = ({
  isAudioMuted,
  isVideoMuted,
  onToggleAudio,
  onToggleVideo,
  onSwitchCamera,
  onEndCall,
}) => {
  return (
    <View style={styles.container}>
      {/* Botón Silenciar Micrófono */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggleAudio}
        style={[styles.button, isAudioMuted && styles.buttonActive]}
      >
        {isAudioMuted ? (
          <MicOff size={24} color={colors.white} />
        ) : (
          <Mic size={24} color={colors.white} />
        )}
      </TouchableOpacity>

      {/* Botón Apagar/Encender Video */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggleVideo}
        style={[styles.button, isVideoMuted && styles.buttonActive]}
      >
        {isVideoMuted ? (
          <VideoOff size={24} color={colors.white} />
        ) : (
          <Video size={24} color={colors.white} />
        )}
      </TouchableOpacity>

      {/* Botón Voltear Cámara */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSwitchCamera}
        style={styles.button}
      >
        <SwitchCamera size={24} color={colors.white} />
      </TouchableOpacity>

      {/* Botón Colgar / Finalizar */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onEndCall}
        style={styles.endCallButton}
      >
        <PhoneOff size={28} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 36,
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: colors.danger,
  },
  endCallButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default CallControls;
