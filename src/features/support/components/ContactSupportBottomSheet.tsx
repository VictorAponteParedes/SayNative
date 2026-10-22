import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Send } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../theme';
import { AppText, AppBottomSheet, Toast } from '../../../components';

export interface ContactSupportBottomSheetProps {
  visible: boolean;
  onClose: () => void;
}

export const ContactSupportBottomSheet: React.FC<
  ContactSupportBottomSheetProps
> = ({ visible, onClose }) => {
  const { t } = useTranslation('support');
  const [selectedTopic, setSelectedTopic] = useState('coins');
  const [message, setMessage] = useState('');

  const categories = [
    { id: 'coins', label: t('hero.categories.coins'), emoji: '🪙' },
    { id: 'calls', label: t('hero.categories.calls'), emoji: '📹' },
    { id: 'languages', label: t('hero.categories.languages'), emoji: '🗣️' },
    { id: 'payments', label: t('hero.categories.payments'), emoji: '💳' },
  ];

  const handleSend = () => {
    if (!message.trim()) {
      Toast.warning('Campo requerido', 'Por favor escribe tu consulta antes de enviar.');
      return;
    }

    onClose();
    setMessage('');

    setTimeout(() => {
      Toast.success(
        t('contact.sentSuccessTitle'),
        t('contact.sentSuccessMessage')
      );
    }, 250);
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={t('contact.sheetTitle')}
      subtitle={t('contact.sheetSubtitle')}
    >
      <View style={styles.container}>
        {/* Selector de categoría */}
        <AppText variant="caption" style={styles.inputLabel}>
          {t('contact.categoryLabel')}
        </AppText>
        <View style={styles.categoriesRow}>
          {categories.map((cat) => {
            const isSelected = selectedTopic === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.7}
                onPress={() => setSelectedTopic(cat.id)}
                style={[
                  styles.categoryChip,
                  isSelected && styles.categoryChipSelected,
                ]}
              >
                <AppText style={styles.chipEmoji}>{cat.emoji}</AppText>
                <AppText
                  variant="caption"
                  style={[
                    styles.chipLabel,
                    isSelected && styles.chipLabelSelected,
                  ]}
                >
                  {cat.label}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Input de Mensaje */}
        <AppText variant="caption" style={styles.inputLabel}>
          {t('contact.messageLabel')}
        </AppText>
        <TextInput
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          placeholder={t('contact.messagePlaceholder')}
          placeholderTextColor={colors.textMuted}
          style={styles.textArea}
          textAlignVertical="top"
        />

        {/* Botón Enviar */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSend}
          style={styles.sendButton}
        >
          <Send size={16} color={colors.white} style={styles.sendIcon} />
          <AppText variant="button" style={styles.sendButtonText}>
            {t('contact.sendButton')}
          </AppText>
        </TouchableOpacity>
      </View>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs + 2,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 14,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  categoryChipSelected: {
    backgroundColor: colors.primaryBgSubtle,
    borderColor: colors.primary,
  },
  chipEmoji: {
    fontSize: 13,
    marginRight: 4,
  },
  chipLabel: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  chipLabelSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
  textArea: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: 16,
    padding: spacing.md,
    fontSize: 14,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
    minHeight: 100,
    lineHeight: 20,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: spacing.md + 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  sendIcon: {
    marginRight: spacing.xs,
  },
  sendButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
