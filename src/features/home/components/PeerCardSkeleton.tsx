import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';
import { Skeleton } from '@/components';

export const PeerCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Cabecera con avatar y bandera */}
      <View style={styles.topRow}>
        <Skeleton width={50} height={50} variant="circle" />
        <Skeleton width={26} height={18} borderRadius={borderRadius.xs} />
      </View>

      {/* Nombre y edad */}
      <Skeleton width={115} height={16} style={styles.nameSkeleton} />

      {/* Rating */}
      <Skeleton width={80} height={12} style={styles.ratingSkeleton} />

      {/* Tags de intereses */}
      <View style={styles.tagsRow}>
        <Skeleton width={52} height={20} borderRadius={borderRadius.full} />
        <Skeleton width={48} height={20} borderRadius={borderRadius.full} />
      </View>

      {/* Tarifa */}
      <View style={styles.rateRow}>
        <Skeleton width={36} height={12} />
        <Skeleton width={60} height={14} />
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsRow}>
        <Skeleton width={38} height={36} borderRadius={borderRadius.md} />
        <Skeleton width={92} height={36} borderRadius={borderRadius.md} />
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
    borderColor: colors.borderLight,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  nameSkeleton: {
    marginBottom: spacing.xs,
  },
  ratingSkeleton: {
    marginBottom: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
});

export default PeerCardSkeleton;
