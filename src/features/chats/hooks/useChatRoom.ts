import { useState, useEffect } from 'react';
import { chatsApi } from '../api/chatsApi';
import { ChatMessage } from '../components/private/ChatMessageItem';
import { BackendChatMessage } from '../types';
import { formatMessageTime } from '../utils/chatUtils';

interface UseChatRoomParams {
  currentUserId?: string;
  partnerId?: string;
  initialRoomId?: string;
}

export const useChatRoom = ({
  currentUserId,
  partnerId,
  initialRoomId,
}: UseChatRoomParams) => {
  const [roomId, setRoomId] = useState<string | null>(initialRoomId || null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [initialMessages, setInitialMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    let isMounted = true;

    const setupChatRoom = async () => {
      if (!currentUserId || !partnerId) return;

      setIsLoadingMessages(true);
      try {
        const room = await chatsApi.createOrGetRoom(currentUserId, partnerId);
        if (!isMounted) return;

        const activeRoomId = room?.id || `room_${currentUserId}_${partnerId}`;
        setRoomId(activeRoomId);

        const backendMessages = await chatsApi.getRoomMessages(
          activeRoomId,
          currentUserId,
        );
        if (!isMounted) return;

        if (Array.isArray(backendMessages) && backendMessages.length > 0) {
          const mapped: ChatMessage[] = backendMessages.map(
            (bm: BackendChatMessage) => ({
              id: bm.id,
              sender: bm.senderId === currentUserId ? 'user' : 'partner',
              text: bm.text || bm.content || '',
              translatedText: bm.translatedText,
              time: formatMessageTime(bm.createdAt),
              isAudio: bm.isAudio,
              audioDuration: bm.audioDuration,
              audioSpeed: bm.audioSpeed || '1x',
              transcription: bm.transcription,
            }),
          );
          setInitialMessages(mapped);
        } else {
          setInitialMessages([]);
        }

        chatsApi.markAsRead(activeRoomId, currentUserId).catch(() => {});
      } catch (err) {
        if (__DEV__) {
          console.warn('[useChatRoom] Error al inicializar chat:', err);
        }
        setInitialMessages([]);
      } finally {
        if (isMounted) setIsLoadingMessages(false);
      }
    };

    setupChatRoom();

    return () => {
      isMounted = false;
    };
  }, [currentUserId, partnerId]);

  return {
    roomId,
    isLoadingMessages,
    initialMessages,
  };
};
