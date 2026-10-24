import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, Skeleton } from '@/components';
import { PeerCard } from './PeerCard';
import { PeerCardSkeleton } from './PeerCardSkeleton';
import { PeerUser } from '../types';

export interface FeaturedPeersSectionProps {
  peers: PeerUser[];
  isLoading?: boolean;
  onlineCount?: number;
  onPressViewAll: () => void;
  onPressCall: (peer: PeerUser) => void;
  onPressChat: (peer: PeerUser) => void;
}

export const FeaturedPeersSection: React.FC<FeaturedPeersSectionProps> = ({
  peers,
  isLoading = false,
  onlineCount = 0,
  onPressViewAll,
  onPressCall,
  onPressChat,
}) => {
  const { t } = useTranslation('home');

  return (
    <View style={styles.container}>
      {/* Encabezado de la sección */}
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <AppText variant="h3" style={styles.title}>
            {t('featuredPeers.title')}
          </AppText>
          {isLoading ? (
            <Skeleton width={52} height={20} borderRadius={borderRadius.full} />
          ) : (
            <View style={styles.onlineBadge}>
              <AppText variant="caption" style={styles.onlineBadgeText}>
                {t('featuredPeers.onlineCount', { count: onlineCount })}
              </AppText>
            </View>
          )}
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={onPressViewAll}>
          <AppText variant="bodySmall" style={styles.viewAllText}>
            {t('featuredPeers.viewAll')}
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Lista horizontal de tarjetas o skeletons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading ? (
          <>
            <PeerCardSkeleton />
            <PeerCardSkeleton />
            <PeerCardSkeleton />
          </>
        ) : peers.length > 0 ? (
          peers.map((peer) => (
            <PeerCard
              key={peer.id}
              peer={peer}
              onPressCall={onPressCall}
              onPressChat={onPressChat}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <AppText variant="bodySmall" color={colors.textSecondary}>
              {t('featuredPeers.noPeersOnline', {
                defaultValue: 'No hay compañeros conectados en este momento.',
              })}
            </AppText>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  onlineBadge: {
    backgroundColor: colors.primaryBgSubtle,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: 12,
  },
  onlineBadgeText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 11,
  },
  viewAllText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
  scrollContent: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingBottom: spacing.sm,
  },
  emptyContainer: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
