import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, MessageSquare, Video, Check } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, Avatar, Tag } from '@/components';
import { SpeakerUser } from '../types';

export interface SpeakerCardProps {
  speaker: SpeakerUser;
  onPressCall: (speaker: SpeakerUser) => void;
  onPressChat: (speaker: SpeakerUser) => void;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({
  speaker,
  onPressCall,
  onPressChat,
}) => {
  const { t } = useTranslation('explore');

  return (
    <View style={styles.cardContainer}>
      {/* Fila superior: Avatar, Info principal, Tarifa */}
      <View style={styles.topRow}>
        <View style={styles.avatarWrapper}>
          <Avatar
            uri={speaker.avatarUrl}
            name={speaker.name}
            size={56}
            isOnline={speaker.isOnline}
            flag={speaker.countryFlag}
          />
        </View>

        <View style={styles.mainInfo}>
          <View style={styles.nameRow}>
            <AppText variant="h3" style={styles.nameText}>
              {speaker.name}
              {speaker.age !== undefined && speaker.age !== null ? `, ${speaker.age}` : ''}
            </AppText>
            {speaker.isVerified && (
              <View style={styles.verifiedBadge}>
                <Check size={11} color={colors.surface} strokeWidth={3} />
              </View>
            )}
            {speaker.badge && (
              <View style={styles.superTutorBadge}>
                <AppText style={styles.superTutorText}>
                  {speaker.badge}
                </AppText>
              </View>
            )}
          </View>

          <View style={styles.ratingRow}>
            <Star size={14} color={colors.star} fill={colors.star} />
            <AppText variant="bodySmall" style={styles.ratingScore}>
              {speaker.rating.toFixed(1)}
            </AppText>
            <AppText variant="bodySmall" color={colors.textSecondary}>
              {t('card.reviews', { count: speaker.reviewsCount })}
            </AppText>
          </View>
        </View>

        {/* Tarifa de monedas */}
        <View style={styles.rateBadge}>
          <AppText style={styles.coinIcon}>🪙</AppText>
          <AppText variant="caption" style={styles.rateText}>
            {t('card.ratePerMin', { rate: speaker.ratePerMinute })}
          </AppText>
        </View>
      </View>

      {/* Recuadro de idiomas nativo y en aprendizaje */}
      <View style={styles.languagesBox}>
        <AppText variant="caption" style={styles.languagesText}>
          <AppText variant="caption" style={styles.languageLabel}>
            {t('card.native')}
          </AppText>
          {speaker.nativeLanguages}
          <AppText variant="caption" color={colors.textMuted}>  ·  </AppText>
          <AppText variant="caption" style={styles.languageLabel}>
            {t('card.learns')}
          </AppText>
          {speaker.learningLanguages}
        </AppText>
      </View>

      {/* Etiquetas / Intereses */}
      <View style={styles.tagsRow}>
        {speaker.tags.map((tag, index) => (
          <Tag key={`${speaker.id}_tag_${index}`} label={tag} />
        ))}
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPressChat(speaker)}
          style={styles.chatButton}
        >
          <MessageSquare size={18} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPressCall(speaker)}
          style={styles.callButton}
        >
          <Video size={18} color={colors.surface} fill={colors.surface} />
          <AppText variant="button" style={styles.callButtonText}>
            {t('card.callNow')}
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  avatarWrapper: {
    marginRight: spacing.md,
  },
  mainInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  verifiedBadge: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  superTutorBadge: {
    backgroundColor: colors.dangerLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  superTutorText: {
    color: colors.dangerDark,
    fontWeight: '800',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingScore: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  rateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.coinLight,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: 14,
    gap: 3,
  },
  coinIcon: {
    fontSize: 12,
  },
  rateText: {
    fontWeight: '700',
    color: colors.coinDark,
    fontSize: 12,
  },
  languagesBox: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: borderRadius.sm + 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  languagesText: {
    color: colors.textPrimary,
    fontSize: 12,
  },
  languageLabel: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  chatButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.primaryBgSubtle,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    backgroundColor: colors.action,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  callButtonText: {
    color: colors.surface,
    fontWeight: '700',
    fontSize: 14,
  },
});
