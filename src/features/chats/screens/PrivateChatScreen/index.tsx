import React, { useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText, AppAlert } from '@/components';
import { PrivateChatHeader } from '../../components/private/PrivateChatHeader';
import { LearningContextBanner } from '../../components/private/LearningContextBanner';
import { PartnerCallPill } from '../../components/private/PartnerCallPill';
import { ChatMessageItem } from '../../components/private/ChatMessageItem';
import { RecommendedTopicsRow } from '../../components/private/RecommendedTopicsRow';
import { TypingIndicator } from '../../components/private/TypingIndicator';
import { ChatInputBar } from '../../components/private/ChatInputBar';
import { navigate } from '@/navigation/NavigationRef';
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
  const partnerName = route?.params?.partnerName || 'Sarah Jenkins';
  const partnerFlag = route?.params?.partnerFlag || '🇺🇸';
  const ratePerMinute = route?.params?.ratePerMinute || 10;

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

  const handleOptions = () => {
    AppAlert.info(
      t('privateChat.alerts.optionsTitle'),
      t('privateChat.alerts.optionsMessage')
    );
  };

  const handleProfile = () => {
    AppAlert.info(
      t('privateChat.alerts.profileTitle'),
      t('privateChat.alerts.profileMessage', { name: partnerName })
    );
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
        partnerName={t('privateChat.activeChat')}
        isOnline
        onPressCall={handleCall}
        onPressOptions={handleOptions}
        onPressProfile={handleProfile}
      />

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
    </SafeAreaContainer>
  );
};
