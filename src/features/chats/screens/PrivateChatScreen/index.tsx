import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaContainer, AppText } from '@/components';
import { PrivateChatHeader } from '../../components/private/PrivateChatHeader';
import { LearningContextBanner } from '../../components/private/LearningContextBanner';
import { PartnerCallPill } from '../../components/private/PartnerCallPill';
import { ChatMessageItem } from '../../components/private/ChatMessageItem';
import { RecommendedTopicsRow } from '../../components/private/RecommendedTopicsRow';
import { TypingIndicator } from '../../components/private/TypingIndicator';
import { ChatInputBar } from '../../components/private/ChatInputBar';
import { usePrivateChat } from '../../hooks/usePrivateChat';
import { navigate } from '@/navigation/NavigationRef';
import { Routes } from '@/navigation/routes';
import { useCallSessionStore } from '@/features/videocalls';
import { styles } from './styles';

export interface PrivateChatScreenProps {
  route?: {
    params?: {
      chatId?: string;
      partnerName?: string;
      partnerAvatar?: string;
      partnerFlag?: string;
      ratePerMinute?: number;
    };
  };
}

export const PrivateChatScreen: React.FC<PrivateChatScreenProps> = ({ route }) => {
  const { t } = useTranslation('chats');
  const partnerName = route?.params?.partnerName || 'Sarah Jenkins';
  const partnerFlag = route?.params?.partnerFlag || '🇺🇸';
  const ratePerMinute = route?.params?.ratePerMinute || 10;

  const {
    messages,
    inputText,
    setInputText,
    sendMessage,
    selectTopic,
    isPartnerTyping,
  } = usePrivateChat();

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
    Alert.alert(
      t('privateChat.alerts.optionsTitle'),
      t('privateChat.alerts.optionsMessage')
    );
  };

  const handleProfile = () => {
    Alert.alert(
      t('privateChat.alerts.profileTitle'),
      t('privateChat.alerts.profileMessage', { name: partnerName })
    );
  };

  const handleTopicBanner = () => {
    Alert.alert(
      t('privateChat.alerts.topicsTitle'),
      t('privateChat.alerts.topicsMessage')
    );
  };

  const handleAttachment = () => {
    Alert.alert(
      t('privateChat.alerts.attachmentTitle'),
      t('privateChat.alerts.attachmentMessage')
    );
  };

  const handleAiAssist = () => {
    Alert.alert(
      t('privateChat.alerts.aiAssistTitle'),
      t('privateChat.alerts.aiAssistMessage')
    );
  };

  const handleMic = () => {
    Alert.alert(
      t('privateChat.alerts.micTitle'),
      t('privateChat.alerts.micMessage')
    );
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
