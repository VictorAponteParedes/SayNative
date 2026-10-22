import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../../theme';
import { AppText } from '../../../componentes';
import { PeerCard } from './PeerCard';
import { PeerUser } from '../types';

export interface FeaturedPeersSectionProps {
  peers: PeerUser[];
  onlineCount?: number;
  onPressViewAll: () => void;
  onPressCall: (peer: PeerUser) => void;
  onPressChat: (peer: PeerUser) => void;
}

export const FeaturedPeersSection: React.FC<FeaturedPeersSectionProps> = ({
  peers,
  onlineCount = 3,
  onPressViewAll,
  onPressCall,
  onPressChat,
}) => {
  return (
    <View style={styles.container}>
      {/* Encabezado de la sección */}
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <AppText variant="h3" style={styles.title}>
            Compañeros Destacados
          </AppText>
          <View style={styles.onlineBadge}>
            <AppText variant="caption" style={styles.onlineBadgeText}>
              {onlineCount} en línea
            </AppText>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.7} onPress={onPressViewAll}>
          <AppText variant="bodySmall" style={styles.viewAllText}>
            Ver todos
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Lista horizontal de tarjetas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {peers.map((peer) => (
          <PeerCard
            key={peer.id}
            peer={peer}
            onPressCall={onPressCall}
            onPressChat={onPressChat}
          />
        ))}
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
    backgroundColor: '#EEF2FF',
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
});
