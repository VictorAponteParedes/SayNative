import { useState, useCallback, useEffect } from 'react';
import { getSocket } from '@/lib/socketClient';
import { chatsApi } from '../api/chatsApi';
import { ChatMessage } from '../components/private/ChatMessageItem';

interface UseChatMessagesParams {
  roomId: string | null;
  currentUserId?: string;
  partnerId?: string;
  initialMessages: ChatMessage[];
}

export const useChatMessages = ({
  roomId,
  currentUserId,
  partnerId,
  initialMessages,
}: UseChatMessagesParams) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Sincronizar mensajes iniciales cuando llegan del room
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => {
      if (prev.some(m => m.id === message.id)) return prev;
      return [...prev, message];
    });
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const textToSend = text.trim();
      const tempId = `msg_${Date.now()}`;
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const optimisticMessage: ChatMessage = {
        id: tempId,
        sender: 'user',
        text: textToSend,
        time: currentTime,
      };

      setMessages(prev => [...prev, optimisticMessage]);

      const socket = getSocket({ namespace: '/chats' });
      if (socket.connected && roomId && currentUserId) {
        socket.emit('send_message', {
          senderId: currentUserId,
          dto: {
            roomId,
            recipientId: partnerId,
            text: textToSend,
          },
          lang: 'es',
        });
      }

      try {
        if (currentUserId) {
          await chatsApi.sendMessage(currentUserId, {
            roomId: roomId || undefined,
            recipientId: partnerId,
            text: textToSend,
          });
        }
      } catch (err) {
        if (__DEV__) {
          console.warn('[useChatMessages] Error enviando mensaje:', err);
        }
      }
    },
    [currentUserId, partnerId, roomId],
  );

  const sendAudioMessage = useCallback(
    async (duration = '0:15') => {
      const tempId = `msg_audio_${Date.now()}`;
      const currentTime = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const optimisticAudioMessage: ChatMessage = {
        id: tempId,
        sender: 'user',
        isAudio: true,
        audioDuration: duration,
        audioSpeed: '1x',
        time: currentTime,
      };

      setMessages(prev => [...prev, optimisticAudioMessage]);

      const socket = getSocket({ namespace: '/chats' });
      if (socket.connected && roomId && currentUserId) {
        socket.emit('send_message', {
          senderId: currentUserId,
          dto: {
            roomId,
            recipientId: partnerId,
            text: '🎤 Mensaje de voz',
            isAudio: true,
            audioDuration: duration,
          },
          lang: 'es',
        });
      }

      try {
        if (currentUserId) {
          await chatsApi.sendMessage(currentUserId, {
            roomId: roomId || undefined,
            recipientId: partnerId,
            text: '🎤 Mensaje de voz',
            isAudio: true,
            audioDuration: duration,
          });
        }
      } catch (err) {
        if (__DEV__) {
          console.warn('[useChatMessages] Error enviando nota de voz:', err);
        }
      }
    },
    [currentUserId, partnerId, roomId],
  );

  return {
    messages,
    addMessage,
    sendMessage,
    sendAudioMessage,
  };
};
