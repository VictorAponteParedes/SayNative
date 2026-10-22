import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Plus, Sparkles, Mic, Send } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '../../../../theme';

export interface ChatInputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onPressAttachment?: () => void;
  onPressAiAssist?: () => void;
  onPressMic?: () => void;
  placeholder?: string;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  value,
  onChangeText,
  onSend,
  onPressAttachment,
  onPressAiAssist,
  onPressMic,
  placeholder,
}) => {
  const { t } = useTranslation('chats');
  const inputPlaceholder = placeholder || t('privateChat.inputPlaceholder');

  return (
    <View style={styles.container}>
      {/* Botón Adjuntar (+) */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressAttachment}
        style={styles.circleButton}
      >
        <Plus size={20} color={colors.primary} strokeWidth={2.5} />
      </TouchableOpacity>

      {/* Caja de entrada con icono de IA / Sparkles */}
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={inputPlaceholder}
          placeholderTextColor={colors.textMuted}
          style={styles.textInput}
          multiline
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressAiAssist}
          style={styles.aiButton}
        >
          <Sparkles size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Botón Micrófono */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressMic}
        style={styles.circleButton}
      >
        <Mic size={20} color={colors.primary} />
      </TouchableOpacity>

      {/* Botón Enviar */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSend}
        style={styles.sendButton}
      >
        <Send size={18} color={colors.surface} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: spacing.xs + 2,
  },
  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 22,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 42,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 8,
    maxHeight: 100,
  },
  aiButton: {
    padding: 4,
    marginLeft: 4,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
