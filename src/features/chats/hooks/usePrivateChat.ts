import { useState, useCallback } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatRoom } from './useChatRoom';
import { useChatSocket } from './useChatSocket';
import { useChatMessages } from './useChatMessages';

export interface UsePrivateChatProps {
  partnerId?: string;
  partnerName?: string;
  partnerFlag?: string;
  ratePerMinute?: number;
  initialRoomId?: string;
}

export const usePrivateChat = (props: UsePrivateChatProps = {}) => {
  const { partnerId, initialRoomId } = props;
  const user = useAuthStore(s => s.user);
  const currentUserId = user?.id;

  const [inputText, setInputText] = useState('');

  // 1. Sala + historial
  const { roomId, isLoadingMessages, initialMessages } = useChatRoom({
    currentUserId,
    partnerId,
    initialRoomId,
  });

  // 3. Mensajes + envío
  const { messages, addMessage, sendMessage, sendAudioMessage } =
    useChatMessages({
      roomId,
      currentUserId,
      partnerId,
      initialMessages,
    });

  // 2. Socket (recibe mensajes y typing)
  const { isPartnerTyping, emitTyping } = useChatSocket({
    roomId,
    currentUserId,
    onIncomingMessage: addMessage,
  });

  // Input + notificación de escritura
  const handleInputChange = useCallback(
    (text: string) => {
      setInputText(text);
      emitTyping(text.trim().length > 0);
    },
    [emitTyping],
  );

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    await sendMessage(text);
  }, [inputText, sendMessage]);

  const selectTopic = useCallback((topic: string) => {
    setInputText(`Let's talk about: ${topic}. What do you think?`);
  }, []);

  return {
    messages,
    inputText,
    setInputText: handleInputChange,
    sendMessage: handleSendMessage,
    sendAudioMessage,
    selectTopic,
    isPartnerTyping,
    isLoadingMessages,
  };
};

export default usePrivateChat;
