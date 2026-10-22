import { useState, useCallback } from 'react';
import { ChatMessage } from '../components/private/ChatMessageItem';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'partner',
    text: 'Hi Victor! How are you doing with your English practice?',
    translatedText: '¡Hola Víctor! ¿Cómo te va con tu práctica de inglés?',
    time: '10:15 AM',
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'Hello Sarah! Pretty good, I want to practice vocabulary today.',
    time: '10:16 AM',
  },
  {
    id: 'm3',
    sender: 'partner',
    isAudio: true,
    audioDuration: '0:28',
    audioSpeed: '1x',
    transcription:
      "Sounds great! Let's focus on daily conversational vocabulary and idioms.",
    time: '10:18 AM',
  },
];

export const usePrivateChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isPartnerTyping] = useState<boolean>(true);

  const sendMessage = useCallback(() => {
    if (inputText.trim() === '') return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  }, [inputText]);

  const selectTopic = useCallback((topic: string) => {
    setInputText(`Let's talk about: ${topic}.`);
  }, []);

  return {
    messages,
    inputText,
    setInputText,
    sendMessage,
    selectTopic,
    isPartnerTyping,
  };
};
