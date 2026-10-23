import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Mic, MicOff, Video, VideoOff, SwitchCamera, AlertCircle } from 'lucide-react-native';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { SafeAreaContainer, AppText, AppButton, Avatar } from '@/components';
import { colors } from '@/theme';
import { navigate, goBack } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { useAuthStore } from '@/store/useAuthStore';
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
    };
  };
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({ route }) => {
  const { t } = useTranslation('calls');
  const user = useAuthStore((s) => s.user);

  const peerId = route?.params?.peerId || 'peer-demo-1';
  const peerName = route?.params?.peerName || 'Sarah Jenkins';
  const peerAvatar = route?.params?.peerAvatar || '';
  const peerFlag = route?.params?.peerFlag || '🇺🇸';
  const ratePerMinute = route?.params?.ratePerMinute || 10;
  const isIncoming = route?.params?.isIncoming || false;

  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);

  const { initCallSession, localStream } = useCallSessionStore();
  const { startLocalMedia, switchCamera, toggleAudio, toggleVideo } = useWebRTC();

  useEffect(() => {
    // Inicializar medios locales para preview
    startLocalMedia();
  }, [startLocalMedia]);

  const availableMinutes = ratePerMinute > 0 ? Math.floor(user.coins / ratePerMinute) : 99;

  const handleToggleMic = () => {
    toggleAudio();
    setIsMicMuted((prev) => !prev);
  };

  const handleToggleVideo = () => {
    toggleVideo();
    setIsVideoDisabled((prev) => !prev);
  };

  const handleStartCall = () => {
    // En desarrollo permitimos probar llamadas aunque el saldo sea 0
    if (!__DEV__ && user.coins < ratePerMinute && !isIncoming) {
      Alert.alert(
        t('errors.insufficientCoins'),
        t('lobby.balanceWarning', { minutes: 0 })
      );
      return;
    }

    initCallSession(
      {
        id: peerId,
        name: peerName,
        avatarUrl: peerAvatar,
        countryFlag: peerFlag,
        role: isIncoming ? 'callee' : 'caller',
        ratePerMinute,
      },
      isIncoming ? 'connected' : 'calling'
    );

    navigate(Routes.App.ActiveCall, {
      peerId,
      peerName,
      peerAvatar,
      ratePerMinute,
    });
  };

  const handleBack = () => {
    goBack();
  };

  const localMedia = localStream as MediaStream | null;

  return (
    <SafeAreaContainer style={styles.container}>
      {/* Cabecera */}
      <View style={styles.headerRow}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={22} color={colors.white} />
        </TouchableOpacity>
        <AppText variant="h3" color={colors.white}>
          {t('lobby.title')}
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
            <VideoOff size={42} color={colors.textSecondary} />
            <AppText variant="caption" color={colors.textSecondary} style={{ marginTop: 8 }}>
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
            style={[styles.previewControlButton, isMicMuted && styles.previewControlButtonActive]}
          >
            {isMicMuted ? <MicOff size={20} color={colors.white} /> : <Mic size={20} color={colors.white} />}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleToggleVideo}
            style={[styles.previewControlButton, isVideoDisabled && styles.previewControlButtonActive]}
          >
            {isVideoDisabled ? <VideoOff size={20} color={colors.white} /> : <Video size={20} color={colors.white} />}
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

      {/* Información del Compañero */}
      <View style={styles.infoSection}>
        <View style={styles.peerAvatarContainer}>
          <Avatar uri={peerAvatar} name={peerName} size={84} />
        </View>
        <AppText variant="h2" style={styles.peerName}>
          {peerName} {peerFlag}
        </AppText>

        <View style={styles.peerRateRow}>
          <AppText style={styles.rateText}>
            {t('lobby.rate', { rate: ratePerMinute })}
          </AppText>
        </View>

        {/* Advertencia de saldo/tiempo disponible */}
        <View style={styles.warningCard}>
          <AlertCircle size={18} color={colors.coin} />
          <AppText variant="caption" color={colors.coin}>
            {t('lobby.balanceWarning', { minutes: availableMinutes })}
          </AppText>
        </View>
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionSection}>
        <AppButton
          title={isIncoming ? t('lobby.acceptCall') : t('lobby.startCall')}
          onPress={handleStartCall}
          style={styles.startButton}
        />
        <AppButton
          title={t('lobby.cancelCall')}
          variant="secondary"
          onPress={handleBack}
          style={styles.startButton}
        />
      </View>
    </SafeAreaContainer>
  );
};

export default LobbyScreen;
