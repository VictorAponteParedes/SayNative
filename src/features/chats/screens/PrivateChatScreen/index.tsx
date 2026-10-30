import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ban } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText, AppAlert, Toast } from '@/components';
import { colors } from '@/theme';
import { PrivateChatHeader } from '../../components/private/PrivateChatHeader';
import { LearningContextBanner } from '../../components/private/LearningContextBanner';
import { PartnerCallPill } from '../../components/private/PartnerCallPill';
import { ChatMessageItem } from '../../components/private/ChatMessageItem';
import { RecommendedTopicsRow } from '../../components/private/RecommendedTopicsRow';
import { TypingIndicator } from '../../components/private/TypingIndicator';
import { ChatInputBar } from '../../components/private/ChatInputBar';
import { ChatPartnerOptionsBottomSheet } from '../../components/private/ChatPartnerOptionsBottomSheet';
import { PartnerProfileBottomSheet } from '../../components/private/PartnerProfileBottomSheet';
import { moderationApi } from '@/features/security/api/moderationApi';
import { navigate, goBack } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { useCallSessionStore } from '@/features/videocalls';
import { styles } from './styles';
import usePrivateChat from '../../hooks/usePrivateChat';

export interface PrivateChatScreenProps {
  route?: {
    params?: {
      chatId?: string;
      roomId?: string;
      partnerId?: string;
      partnerName?: string;
      partnerAvatar?: string;
      partnerFlag?: string;
      ratePerMinute?: number;
    };
  };
}

export const PrivateChatScreen: React.FC<PrivateChatScreenProps> = ({ route }) => {
  const { t } = useTranslation('chats');
  const partnerId = route?.params?.partnerId || route?.params?.chatId;
  const initialRoomId = route?.params?.roomId;
  const partnerName = route?.params?.partnerName || t('privateChat.activeChat');
  const partnerAvatar = route?.params?.partnerAvatar;
  const partnerFlag = route?.params?.partnerFlag || '🇺🇸';
  const ratePerMinute = route?.params?.ratePerMinute || 10;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBlockedByMe, setIsBlockedByMe] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (partnerId) {
      moderationApi.checkBlockStatus(partnerId).then((res) => {
        if (isMounted) {
          setIsBlockedByMe(Boolean(res.isBlockedByMe));
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [partnerId]);

  const scrollViewRef = useRef<React.ElementRef<typeof ScrollView>>(null);

  const {
    messages,
    inputText,
    setInputText,
    sendMessage,
    sendAudioMessage,
    selectTopic,
    isPartnerTyping,
  } = usePrivateChat({
    partnerId,
    initialRoomId,
    partnerName,
    partnerFlag,
    ratePerMinute,
  });

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages.length, isPartnerTyping]);

  const handleCall = () => {
    const peerId = route?.params?.chatId || 'partner-chat-1';

    useCallSessionStore.getState().initCallSession(
      {
        id: peerId,
        name: partnerName,
        avatarUrl: route?.params?.partnerAvatar,
        countryFlag: partnerFlag,
        role: 'caller',
        ratePerMinute,
      },
      'calling'
    );

    navigate(Routes.App.ActiveCall, {
      peerId,
      peerName: partnerName,
      peerAvatar: route?.params?.partnerAvatar,
      peerFlag: partnerFlag,
      ratePerMinute,
    });
  };

  const handleOptions = async () => {
    if (partnerId) {
      try {
        const res = await moderationApi.checkBlockStatus(partnerId);
        setIsBlockedByMe(Boolean(res?.isBlockedByMe));
      } catch (e) {
        console.log('[PrivateChat] error checking block status on open:', e);
      }
    }
    setIsOptionsOpen(true);
  };

  const handleProfile = () => {
    setIsProfileOpen(true);
  };

  const handleViewProfile = () => {
    setIsProfileOpen(true);
  };

  const handleBlockUser = () => {
    AppAlert.confirm({
      title: t('partnerOptions.blockConfirmTitle', {
        name: partnerName,
        defaultValue: `¿Bloquear a ${partnerName}?`,
      }),
      message: t('partnerOptions.blockConfirmMessage', {
        name: partnerName,
        defaultValue:
          '¿Estás seguro de que deseas bloquear a este usuario? Dejarás de recibir sus mensajes y llamadas.',
      }),
      cancelText: t('partnerOptions.cancel', { defaultValue: 'Cancelar' }),
      confirmText: t('partnerOptions.blockConfirmAction', {
        defaultValue: 'Bloquear',
      }),
      confirmColor: colors.danger,
      onConfirm: async () => {
        try {
          if (partnerId) {
            await moderationApi.blockUser({ blockedId: partnerId });
          }
          setIsBlockedByMe(true);
          Toast.success(
            t('partnerOptions.blockSuccessTitle', {
              defaultValue: 'Usuario bloqueado',
            }),
            t('partnerOptions.blockSuccessMessage', {
              name: partnerName,
              defaultValue: `Has bloqueado a ${partnerName} correctamente.`,
            })
          );
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          const errMsg =
            err?.response?.data?.message ||
            t('partnerOptions.blockError', {
              defaultValue: 'No se pudo completar el bloqueo en este momento.',
            });
          Toast.error(
            t('partnerOptions.errorTitle', { defaultValue: 'Error' }),
            errMsg
          );
        }
      },
    });
  };

  const handleUnblockUser = () => {
    AppAlert.confirm({
      title: t('partnerOptions.unblockConfirmTitle', {
        name: partnerName,
        defaultValue: `¿Desbloquear a ${partnerName}?`,
      }),
      message: t('partnerOptions.unblockConfirmMessage', {
        name: partnerName,
        defaultValue:
          '¿Deseas desbloquear a este usuario? Podrán volver a enviarse mensajes y realizar llamadas.',
      }),
      cancelText: t('partnerOptions.cancel', { defaultValue: 'Cancelar' }),
      confirmText: t('partnerOptions.unblockConfirmAction', {
        defaultValue: 'Desbloquear',
      }),
      confirmColor: colors.action,
      onConfirm: async () => {
        try {
          if (partnerId) {
            await moderationApi.unblockUser(partnerId);
          }
          setIsBlockedByMe(false);
          Toast.success(
            t('partnerOptions.unblockSuccessTitle', {
              defaultValue: 'Usuario desbloqueado',
            }),
            t('partnerOptions.unblockSuccessMessage', {
              name: partnerName,
              defaultValue: `Has desbloqueado a ${partnerName} correctamente.`,
            })
          );
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          const errMsg =
            err?.response?.data?.message ||
            t('partnerOptions.unblockError', {
              defaultValue: 'No se pudo desbloquear al usuario.',
            });
          Toast.error(
            t('partnerOptions.errorTitle', { defaultValue: 'Error' }),
            errMsg
          );
        }
      },
    });
  };

  const handleReportUser = () => {
    AppAlert.confirm({
      title: t('partnerOptions.reportConfirmTitle', {
        name: partnerName,
        defaultValue: `¿Reportar a ${partnerName}?`,
      }),
      message: t('partnerOptions.reportConfirmMessage', {
        name: partnerName,
        defaultValue:
          '¿Deseas enviar un reporte sobre este usuario a nuestro equipo de moderación?',
      }),
      cancelText: t('partnerOptions.cancel', { defaultValue: 'Cancelar' }),
      confirmText: t('partnerOptions.reportConfirmAction', {
        defaultValue: 'Reportar',
      }),
      confirmColor: colors.primary,
      onConfirm: async () => {
        try {
          if (partnerId) {
            await moderationApi.reportUser({
              reportedId: partnerId,
              reason: 'inappropriate_content',
              details: 'Reportado desde la vista de chat privado',
            });
          }
          Toast.success(
            t('partnerOptions.reportSuccessTitle', {
              defaultValue: 'Reporte recibido',
            }),
            t('partnerOptions.reportSuccessMessage', {
              defaultValue:
                'Gracias por ayudarnos a mantener una comunidad segura.',
            })
          );
        } catch (error: unknown) {
          const err = error as { response?: { data?: { message?: string } } };
          const errMsg =
            err?.response?.data?.message ||
            t('partnerOptions.reportError', {
              defaultValue: 'No se pudo enviar el reporte en este momento.',
            });
          Toast.error(
            t('partnerOptions.errorTitle', { defaultValue: 'Error' }),
            errMsg
          );
        }
      },
    });
  };

  const handleTopicBanner = () => {
    AppAlert.info(
      t('privateChat.alerts.topicsTitle'),
      t('privateChat.alerts.topicsMessage')
    );
  };

  const handleAttachment = () => {
    AppAlert.info(
      t('privateChat.alerts.attachmentTitle'),
      t('privateChat.alerts.attachmentMessage')
    );
  };

  const handleAiAssist = () => {
    setInputText("That's very interesting! Could you explain that with an example?");
  };

  const handleMic = () => {
    sendAudioMessage('0:14');
  };

  return (
    <SafeAreaContainer edges={['top', 'left', 'right']}>
      {/* Cabecera superior con botón volver, info y llamadas */}
      <PrivateChatHeader
        partnerName={partnerName}
        partnerAvatar={partnerAvatar}
        isOnline
        onPressCall={handleCall}
        onPressOptions={handleOptions}
        onPressProfile={handleProfile}
      />

      {/* Banner de usuario bloqueado con acción directa de desbloqueo */}
      {isBlockedByMe && (
        <View style={styles.blockedBanner}>
          <View style={styles.blockedBannerLeft}>
            <Ban size={16} color={colors.danger} />
            <AppText variant="caption" style={styles.blockedBannerText}>
              {t('partnerOptions.blockedBannerText', {
                defaultValue: 'Has bloqueado a este usuario.',
              })}
            </AppText>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleUnblockUser}
            style={styles.unblockBannerButton}
          >
            <AppText variant="caption" style={styles.unblockBannerButtonText}>
              {t('partnerOptions.blockedBannerAction', {
                defaultValue: 'Desbloquear',
              })}
            </AppText>
          </TouchableOpacity>
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Banner de contexto de aprendizaje */}
          <LearningContextBanner
            languageName="Inglés"
            onPressTopic={handleTopicBanner}
          />

          {/* Divisor de fecha "Hoy" */}
          <View style={styles.dateDividerContainer}>
            <View style={styles.datePill}>
              <AppText variant="caption" style={styles.dateText}>
                {t('privateChat.today')}
              </AppText>
            </View>
          </View>

          {/* Píldora de llamada rápida con el nativo */}
          <PartnerCallPill
            partnerName={partnerName}
            partnerFlag={partnerFlag}
            ratePerMinute={ratePerMinute}
            onPressCall={handleCall}
          />

          {/* Lista de mensajes de la conversación */}
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} message={msg} />
          ))}

          {/* Fila de temas recomendados para hoy */}
          <RecommendedTopicsRow onSelectTopic={selectTopic} />

          {/* Indicador de compañero escribiendo */}
          <TypingIndicator
            partnerName={partnerName.split(' ')[0]}
            isTyping={isPartnerTyping}
          />
        </ScrollView>

        {/* Barra de entrada inferior */}
        <ChatInputBar
          value={inputText}
          onChangeText={setInputText}
          onSend={sendMessage}
          onPressAttachment={handleAttachment}
          onPressAiAssist={handleAiAssist}
          onPressMic={handleMic}
        />
      </KeyboardAvoidingView>

      {/* BottomSheet de opciones del compañero (Ver perfil, Bloquear, Reportar) */}
      <ChatPartnerOptionsBottomSheet
        visible={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        partnerName={partnerName}
        partnerAvatar={partnerAvatar}
        partnerFlag={partnerFlag}
        ratePerMinute={ratePerMinute}
        isBlocked={isBlockedByMe}
        onViewProfile={handleViewProfile}
        onBlockUser={handleBlockUser}
        onUnblockUser={handleUnblockUser}
        onReportUser={handleReportUser}
      />

      {/* BottomSheet de vista rápida de perfil público */}
      <PartnerProfileBottomSheet
        visible={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        partnerName={partnerName}
        partnerAvatar={partnerAvatar}
        partnerFlag={partnerFlag}
        ratePerMinute={ratePerMinute}
        onStartCall={handleCall}
      />
    </SafeAreaContainer>
  );
};
