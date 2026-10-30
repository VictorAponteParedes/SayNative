import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  MessageCircle,
  Mail,
  Video,
  Award,
  Activity,
  Check,
} from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { AppBottomSheet, AppText } from '@/components';
import { colors, spacing, borderRadius } from '@/theme';
import { BackendChatFilterOption, ChatFilterType } from '../types';

export interface ChatFiltersBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  activeFilter: ChatFilterType;
  filterOptions: BackendChatFilterOption[];
  onSelectFilter: (filterKey: ChatFilterType) => void;
}

const renderFilterIcon = (iconName: string, isSelected: boolean) => {
  const iconColor = isSelected ? colors.primary : colors.textSecondary;
  const size = 20;

  switch (iconName) {
    case 'mail':
      return <Mail size={size} color={iconColor} />;
    case 'video':
      return <Video size={size} color={iconColor} />;
    case 'award':
      return <Award size={size} color={iconColor} />;
    case 'activity':
      return <Activity size={size} color={iconColor} />;
    case 'message-circle':
    default:
      return <MessageCircle size={size} color={iconColor} />;
  }
};

export const ChatFiltersBottomSheet: React.FC<ChatFiltersBottomSheetProps> = ({
  visible,
  onClose,
  activeFilter,
  filterOptions,
  onSelectFilter,
}) => {
  const { t } = useTranslation('chats');

  const handleSelect = (key: string) => {
    onSelectFilter(key);
    onClose();
  };

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title={t('filtersModal.title', { defaultValue: 'Filtrar conversaciones' })}
      subtitle={t('filtersModal.subtitle', {
        defaultValue: 'Selecciona cómo deseas organizar tus mensajes',
      })}
    >
      <View style={styles.container}>
        {filterOptions.map((option) => {
          const isSelected = activeFilter === option.key;

          return (
            <TouchableOpacity
              key={option.key}
              activeOpacity={0.7}
              onPress={() => handleSelect(option.key)}
              style={[
                styles.optionRow,
                isSelected && styles.optionRowSelected,
              ]}
            >
              <View
                style={[
                  styles.iconCircle,
                  isSelected && styles.iconCircleSelected,
                ]}
              >
                {renderFilterIcon(option.icon, isSelected)}
              </View>

              <View style={styles.textContainer}>
                <View style={styles.titleRow}>
                  <AppText
                    variant="bodyMedium"
                    style={[
                      styles.optionLabel,
                      isSelected && styles.optionLabelSelected,
                    ]}
                  >
                    {option.label}
                  </AppText>
                  {typeof option.count === 'number' && (
                    <View
                      style={[
                        styles.badge,
                        isSelected && styles.badgeSelected,
                      ]}
                    >
                      <AppText
                        variant="caption"
                        style={[
                          styles.badgeText,
                          isSelected && styles.badgeTextSelected,
                        ]}
                      >
                        {option.count}
                      </AppText>
                    </View>
                  )}
                </View>
                {Boolean(option.description) && (
                  <AppText variant="caption" style={styles.optionDescription}>
                    {option.description}
                  </AppText>
                )}
              </View>

              <View style={styles.actionColumn}>
                {isSelected ? (
                  <View style={styles.checkCircle}>
                    <Check size={14} color={colors.white} strokeWidth={3} />
                  </View>
                ) : (
                  <View style={styles.radioOuter} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </AppBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  optionRowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBgSubtle,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconCircleSelected: {
    backgroundColor: colors.surface,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  optionLabel: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  optionLabelSelected: {
    color: colors.primary,
  },
  optionDescription: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  badgeSelected: {
    backgroundColor: colors.primary,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  badgeTextSelected: {
    color: colors.white,
  },
  actionColumn: {
    marginLeft: spacing.sm,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
});
