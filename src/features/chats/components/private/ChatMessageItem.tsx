import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Languages, CheckCheck, Play, Pause, FileText } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../../theme';
import { AppText } from '../../../../componentes';

export interface ChatMessage {
  id: string;
  sender: 'partner' | 'user';
  text?: string;
  translatedText?: string;
  time: string;
  isAudio?: boolean;
  audioDuration?: string;
  audioSpeed?: string;
  transcription?: string;
}

export interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const { t } = useTranslation('chats');
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showTranscription, setShowTranscription] = useState<boolean>(false);

  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <View style={styles.userMessageContainer}>
        <View style={styles.userBubble}>
          <AppText style={styles.userText}>{message.text}</AppText>
          <View style={styles.userFooter}>
            <AppText variant="caption" style={styles.userTime}>
              {message.time}
            </AppText>
            <CheckCheck size={16} color="#A5B4FC" />
          </View>
        </View>
      </View>
    );
  }

  // Mensaje de nota de voz
  if (message.isAudio) {
    return (
      <View style={styles.partnerMessageContainer}>
        <View style={styles.partnerBubble}>
          {/* Reproductor de audio */}
          <View style={styles.audioPlayerRow}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsPlayingAudio(!isPlayingAudio)}
              style={styles.playButton}
            >
              {isPlayingAudio ? (
                <Pause size={16} color={colors.surface} fill={colors.surface} />
              ) : (
                <Play size={16} color={colors.surface} fill={colors.surface} />
              )}
            </TouchableOpacity>

            {/* Barras de onda simuladas multicolor */}
            <View style={styles.waveformContainer}>
              <View style={[styles.bar, { height: 14, backgroundColor: '#6366F1' }]} />
              <View style={[styles.bar, { height: 24, backgroundColor: '#4338CA' }]} />
              <View style={[styles.bar, { height: 18, backgroundColor: '#EC4899' }]} />
              <View style={[styles.bar, { height: 28, backgroundColor: '#E11D48' }]} />
              <View style={[styles.bar, { height: 20, backgroundColor: '#F43F5E' }]} />
              <View style={[styles.bar, { height: 12, backgroundColor: '#A5B4FC' }]} />
              <View style={[styles.bar, { height: 22, backgroundColor: '#4338CA' }]} />
              <View style={[styles.bar, { height: 16, backgroundColor: '#94A3B8' }]} />
              <View style={[styles.bar, { height: 10, backgroundColor: '#CBD5E1' }]} />
            </View>

            <View style={styles.durationWrapper}>
              <AppText variant="caption" style={styles.audioDurationText}>
                {message.audioDuration || '0:28'}
              </AppText>
              <AppText variant="caption" style={styles.audioSpeedText}>
                {message.audioSpeed || '1x'}
              </AppText>
            </View>
          </View>

          {/* Transcripción condicional */}
          {showTranscription && (
            <View style={styles.transcriptionBox}>
              <AppText variant="bodySmall" style={styles.transcriptionText}>
                {message.transcription || t('privateChat.transcribedText')}
              </AppText>
            </View>
          )}

          {/* Botón Transcribir / Traducir y hora */}
          <View style={styles.partnerFooter}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowTranscription(!showTranscription)}
              style={styles.actionLink}
            >
              <FileText size={14} color={colors.primary} />
              <AppText variant="caption" style={styles.actionLinkText}>
                {t('privateChat.transcribeTranslate')}
              </AppText>
            </TouchableOpacity>

            <AppText variant="caption" style={styles.partnerTime}>
              {message.time}
            </AppText>
          </View>
        </View>
      </View>
    );
  }

  // Mensaje de texto recibido
  return (
    <View style={styles.partnerMessageContainer}>
      <View style={styles.partnerBubble}>
        <AppText style={styles.partnerText}>{message.text}</AppText>

        {showTranslation && (
          <View style={styles.translationBox}>
            <AppText variant="bodySmall" style={styles.translatedText}>
              {message.translatedText || t('privateChat.translated')}
            </AppText>
          </View>
        )}

        {/* Fila inferior con botón Traducir y hora */}
        <View style={styles.partnerFooter}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowTranslation(!showTranslation)}
            style={styles.actionLink}
          >
            <Languages size={15} color={colors.primary} />
            <AppText variant="caption" style={styles.actionLinkText}>
              {t('privateChat.translate')}
            </AppText>
          </TouchableOpacity>

          <AppText variant="caption" style={styles.partnerTime}>
            {message.time}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userMessageContainer: {
    alignItems: 'flex-end',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
  },
  userBubble: {
    maxWidth: '82%',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 20,
    borderBottomRightRadius: 4,
  },
  userText: {
    color: colors.textWhite,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  userFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  userTime: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
  },
  partnerMessageContainer: {
    alignItems: 'flex-start',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
  },
  partnerBubble: {
    maxWidth: '85%',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  partnerText: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  partnerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionLinkText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  partnerTime: {
    color: colors.textSecondary,
    fontSize: 11,
  },
  translationBox: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  translatedText: {
    color: colors.textSecondary,
    fontStyle: 'italic',
    fontSize: 13,
  },
  audioPlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  playButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 32,
    flex: 1,
  },
  bar: {
    width: 3.5,
    borderRadius: 2,
  },
  durationWrapper: {
    alignItems: 'flex-end',
  },
  audioDurationText: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 12,
  },
  audioSpeedText: {
    fontWeight: '800',
    color: '#0D695A',
    fontSize: 11,
  },
  transcriptionBox: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  transcriptionText: {
    color: colors.textPrimary,
    fontSize: 12,
  },
});
