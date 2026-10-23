import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { colors, borderRadius } from '@/theme';
import { Avatar, AppText } from '@/components';

export interface VideoStreamViewProps {
  remoteStream: unknown | null;
  localStream: unknown | null;
  remoteUserName: string;
  remoteUserAvatar?: string;
  isLocalVideoMuted: boolean;
  onPressLocalVideo?: () => void;
}

export const VideoStreamView: React.FC<VideoStreamViewProps> = ({
  remoteStream,
  localStream,
  remoteUserName,
  remoteUserAvatar,
  isLocalVideoMuted,
  onPressLocalVideo,
}) => {
  const remoteMediaStream = remoteStream as MediaStream | null;
  const localMediaStream = localStream as MediaStream | null;

  return (
    <View style={styles.container}>
      {/* Stream Remoto (Fondo Completo) */}
      {remoteMediaStream ? (
        <RTCView
          streamURL={remoteMediaStream.toURL()}
          style={styles.fullScreenVideo}
          objectFit="cover"
          zOrder={0}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Avatar
            uri={remoteUserAvatar}
            name={remoteUserName}
            size={110}
            style={styles.avatarBorder}
          />
          <AppText variant="h3" color={colors.white} style={styles.placeholderName}>
            {remoteUserName}
          </AppText>
        </View>
      )}

      {/* Stream Local (Miniatura Flotante / PIP) */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressLocalVideo}
        style={styles.localVideoContainer}
      >
        {localMediaStream && !isLocalVideoMuted ? (
          <RTCView
            streamURL={localMediaStream.toURL()}
            style={styles.localVideo}
            objectFit="cover"
            mirror
            zOrder={1}
          />
        ) : (
          <View style={styles.localPlaceholder}>
            <AppText variant="caption" color={colors.white}>
              Tú
            </AppText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0F172A',
  },
  fullScreenVideo: {
    ...StyleSheet.absoluteFill,
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
  },
  avatarBorder: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 55,
  },
  placeholderName: {
    marginTop: 18,
  },
  localVideoContainer: {
    position: 'absolute',
    top: 54,
    right: 18,
    width: 105,
    height: 155,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: '#1E293B',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  localVideo: {
    width: '100%',
    height: '100%',
  },
  localPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#334155',
  },
});

export default VideoStreamView;
