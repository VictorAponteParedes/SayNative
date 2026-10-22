import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Video } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '../../../../theme';
import { AppText } from '../../../../componentes';

export interface PartnerCallPillProps {
  partnerName?: string;
  partnerFlag?: string;
  ratePerMinute?: number;
  onPressCall?: () => void;
}

export const PartnerCallPill: React.FC<PartnerCallPillProps> = ({
  partnerName = 'Sarah Jenkins',
  partnerFlag = '🇺🇸',
  ratePerMinute = 10,
  onPressCall,
}) => {
  const { t } = useTranslation('chats');

  return (
    <View style={styles.container}>
      {/* Información del nativo */}
      <View style={styles.leftInfo}>
        <AppText style={styles.flag}>{partnerFlag}</AppText>
        <AppText variant="bodySmall" style={styles.name} numberOfLines={1}>
          {partnerName}
        </AppText>
        <View style={styles.nativeBadge}>
          <AppText variant="caption" style={styles.nativeBadgeText}>
            {t('privateChat.native')}
          </AppText>
        </View>
      </View>

      {/* Botón de llamada rápida */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPressCall}
        style={styles.callButton}
      >
        <Video size={14} color="#0D695A" fill="#0D695A" />
        <AppText variant="caption" style={styles.callButtonText}>
          Llamar (🪙{ratePerMinute}/m)
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  flag: {
    fontSize: 14,
  },
  name: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 13,
  },
  nativeBadge: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  nativeBadgeText: {
    color: '#0F766E',
    fontWeight: '700',
    fontSize: 10,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  callButtonText: {
    color: '#0D695A',
    fontWeight: '700',
    fontSize: 11,
  },
});
