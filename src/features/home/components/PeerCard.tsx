import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, MessageSquare, Video } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '../../../theme';
import { AppText, Avatar, Tag } from '../../../componentes';
import { PeerUser } from '../types';

export interface PeerCardProps {
  peer: PeerUser;
  onPressCall: (peer: PeerUser) => void;
  onPressChat: (peer: PeerUser) => void;
}

export const PeerCard: React.FC<PeerCardProps> = ({
  peer,
  onPressCall,
  onPressChat,
}) => {
  const { t } = useTranslation('home');

  return (
    <View style={styles.card}>
      {/* Cabecera con avatar y bandera del país nativo */}
      <View style={styles.topRow}>
        <Avatar uri={peer.avatarUrl} size={50} isOnline={peer.isOnline} />
        {peer.countryFlag ? (
          <AppText style={styles.flagText}>{peer.countryFlag}</AppText>
        ) : null}
      </View>

      {/* Nombre y edad */}
      <AppText variant="bodyLarge" style={styles.nameText} numberOfLines={1}>
        {peer.name} <AppText variant="bodyMedium" color={colors.textSecondary}>{peer.age}</AppText>
      </AppText>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Star size={13} color="#F87171" fill="#F87171" />
        <AppText variant="caption" style={styles.ratingScore}>
          {peer.rating.toFixed(1)}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {t('featuredPeers.reviews', { count: peer.reviewsCount })}
        </AppText>
      </View>

      {/* Tags de intereses */}
      <View style={styles.tagsRow}>
        {peer.tags.map((tag, index) => (
          <Tag key={`${peer.id}_tag_${index}`} label={tag} />
        ))}
      </View>

      {/* Tarifa */}
      <View style={styles.rateRow}>
        <AppText variant="caption" color={colors.textSecondary}>
          {t('featuredPeers.rateLabel')}
        </AppText>
        <View style={styles.rateValue}>
          <AppText style={styles.coinIcon}>🪙</AppText>
          <AppText variant="caption" style={styles.rateText}>
            {t('featuredPeers.ratePerMin', { rate: peer.ratePerMinute })}
          </AppText>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPressChat(peer)}
          style={styles.chatButton}
        >
          <MessageSquare size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressCall(peer)}
          style={styles.callButton}
        >
          <Video size={16} color={colors.surface} fill={colors.surface} />
          <AppText variant="caption" style={styles.callButtonText}>
            {t('featuredPeers.callButton')}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 175,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  flagText: {
    fontSize: 22,
  },
  nameText: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 16,
    marginTop: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  ratingScore: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginVertical: spacing.sm,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  rateValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  coinIcon: {
    fontSize: 11,
  },
  rateText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  chatButton: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.action,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  callButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 12,
  },
});
