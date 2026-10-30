import { useEffect, useRef, useState, useCallback } from 'react';
import { getSocket } from '@/lib/socketClient';
import { BackendChatMessage } from '../types';
import { ChatMessage } from '../components/private/ChatMessageItem';
import { formatMessageTime, isUUID } from '../utils/chatUtils';

interface UseChatSocketParams {
  roomId: string | null;
  currentUserId?: string;
  onIncomingMessage: (message: ChatMessage) => void;
}

export const useChatSocket = ({
  roomId,
  currentUserId,
  onIncomingMessage,
}: UseChatSocketParams) => {
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTypingEmittedRef = useRef(0);

  useEffect(() => {
    const socket = getSocket({ namespace: '/chats' });
    if (!socket.connected) {
      socket.connect();
    }

    if (currentUserId) {
      socket.emit('chat:register-user', { userId: currentUserId });
    }

    if (roomId && isUUID(roomId) && currentUserId) {
      socket.emit('join_room', { roomId, userId: currentUserId });
    }

    const handleIncomingMessage = (payload: BackendChatMessage) => {
      if (payload.senderId === currentUserId) return;

      setIsPartnerTyping(false);

      if (payload.roomId && isUUID(payload.roomId) && currentUserId) {
        socket.emit('join_room', { roomId: payload.roomId, userId: currentUserId });
      }

      const newMsg: ChatMessage = {
        id: payload.id || `msg_${Date.now()}`,
        sender: 'partner',
        text: payload.text || payload.content || '',
        translatedText: payload.translatedText,
        time: formatMessageTime(payload.createdAt),
        isAudio: payload.isAudio,
        audioDuration: payload.audioDuration,
        audioSpeed: payload.audioSpeed || '1x',
        transcription: payload.transcription,
      };

      onIncomingMessage(newMsg);
    };

    const handlePartnerTyping = (data: {
      userId?: string;
      isTyping?: boolean;
    }) => {
      if (data.userId && data.userId === currentUserId) return;

      setIsPartnerTyping(Boolean(data.isTyping));

      if (data.isTyping) {
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
          setIsPartnerTyping(false);
        }, 3500);
      }
    };

    // Eventos oficiales del backend NestJS ChatsGateway
    socket.on('new_message', handleIncomingMessage);
    socket.on('partner_typing', handlePartnerTyping);

    return () => {
      if (roomId && currentUserId) {
        socket.emit('leave_room', { roomId, userId: currentUserId });
      }
      socket.off('new_message', handleIncomingMessage);
      socket.off('partner_typing', handlePartnerTyping);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [currentUserId, roomId, onIncomingMessage]);

  const emitTyping = useCallback(
    (isTyping: boolean) => {
      const now = Date.now();
      if (now - lastTypingEmittedRef.current <= 1500) return;

      lastTypingEmittedRef.current = now;
      const socket = getSocket({ namespace: '/chats' });

      if (socket.connected && roomId && isUUID(roomId) && currentUserId) {
        socket.emit('typing', {
          roomId,
          userId: currentUserId,
          isTyping,
        });
      }
    },
    [currentUserId, roomId],
  );

  return {
    isPartnerTyping,
    emitTyping,
  };
};
