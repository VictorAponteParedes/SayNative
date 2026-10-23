import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText, Avatar } from '@/components';
import { OnlinePeer } from '../types';

export interface OnlinePeersRowProps {
  peers: OnlinePeer[];
  onlineCount?: number;
  onPressNewPeer?: () => void;
  onPressPeer?: (peer: OnlinePeer) => void;
}

export const OnlinePeersRow: React.FC<OnlinePeersRowProps> = ({
  peers,
  onlineCount = 12,
  onPressNewPeer,
  onPressPeer,
}) => {
  const { t } = useTranslation('chats');

  return (
    <View style={styles.container}>
      {/* Encabezado de la fila */}
      <View style={styles.headerRow}>
        <View style={styles.titleWithDot}>
          <View style={styles.onlineDot} />
          <AppText variant="bodyMedium" style={styles.sectionTitle}>
            {t('onlineSection.title')}
          </AppText>
        </View>

        <AppText variant="caption" style={styles.onlineCountText}>
          {t('onlineSection.onlineCount', { count: onlineCount })}
        </AppText>
      </View>

      {/* Lista horizontal con botón + Nuevo y avatares */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {/* Botón Nuevo */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressNewPeer}
          style={styles.peerItem}
        >
          <View style={styles.newButtonCircle}>
            <Plus size={20} color={colors.primary} strokeWidth={2.5} />
          </View>
          <AppText variant="caption" style={styles.peerName}>
            {t('onlineSection.new')}
          </AppText>
        </TouchableOpacity>

        {/* Avatares de compañeros conectados */}
        {peers.map((peer) => (
          <TouchableOpacity
            key={peer.id}
            activeOpacity={0.8}
            onPress={() => onPressPeer?.(peer)}
            style={styles.peerItem}
          >
            <View style={styles.avatarContainer}>
              <Avatar
                uri={peer.avatarUrl}
                name={peer.name}
                size={52}
                isOnline
                flag={peer.countryFlag}
              />
            </View>
            <AppText variant="caption" style={styles.peerName} numberOfLines={1}>
              {peer.name}
            </AppText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  titleWithDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.action,
  },
  sectionTitle: {
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 14,
  },
  onlineCountText: {
    color: colors.action,
    fontWeight: '700',
    fontSize: 12,
  },
  scrollList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  peerItem: {
    alignItems: 'center',
    width: 58,
  },
  newButtonCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderDark,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  avatarContainer: {
    width: 52,
    height: 52,
    marginBottom: 6,
    position: 'relative',
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.borderLight,
  },
  statusDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  flagBadge: {
    position: 'absolute',
    bottom: -2,
    left: -2,
  },
  flagText: {
    fontSize: 14,
  },
  peerName: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 11,
    textAlign: 'center',
  },
});
