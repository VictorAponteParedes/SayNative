import { useState, useCallback, useEffect } from 'react';
import { getSocket } from '@/lib/socketClient';
import { chatsApi } from '../api/chatsApi';
import { ChatMessage } from '../components/private/ChatMessageItem';
import { isUUID } from '../utils/chatUtils';

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

      const validRoomId = roomId && isUUID(roomId) ? roomId : undefined;
      const socket = getSocket({ namespace: '/chats' });

      if (socket.connected && currentUserId && (validRoomId || partnerId)) {
        socket.emit('send_message', {
          senderId: currentUserId,
          dto: {
            ...(validRoomId ? { roomId: validRoomId } : {}),
            recipientId: partnerId,
            text: textToSend,
          },
          lang: 'es',
        });
      } else if (currentUserId) {
        // Enviar vía HTTP solo si el WebSocket no está conectado
        try {
          await chatsApi.sendMessage(currentUserId, {
            roomId: validRoomId,
            recipientId: partnerId,
            text: textToSend,
          });
        } catch (err) {
          if (__DEV__) {
            console.warn('[useChatMessages] Error enviando mensaje por HTTP:', err);
          }
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

      const validRoomId = roomId && isUUID(roomId) ? roomId : undefined;
      const socket = getSocket({ namespace: '/chats' });

      if (socket.connected && currentUserId && (validRoomId || partnerId)) {
        socket.emit('send_message', {
          senderId: currentUserId,
          dto: {
            ...(validRoomId ? { roomId: validRoomId } : {}),
            recipientId: partnerId,
            text: '🎤 Mensaje de voz',
            isAudio: true,
            audioDuration: duration,
          },
          lang: 'es',
        });
      } else if (currentUserId) {
        // Enviar vía HTTP solo si el WebSocket no está conectado
        try {
          await chatsApi.sendMessage(currentUserId, {
            roomId: validRoomId,
            recipientId: partnerId,
            text: '🎤 Mensaje de voz',
            isAudio: true,
            audioDuration: duration,
          });
        } catch (err) {
          if (__DEV__) {
            console.warn('[useChatMessages] Error enviando nota de voz por HTTP:', err);
          }
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
