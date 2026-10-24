import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';
import { Skeleton } from '@/components';

export const SpeakerCardSkeleton: React.FC = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Fila superior: Avatar, Info principal, Tarifa */}
      <View style={styles.topRow}>
        <Skeleton width={56} height={56} variant="circle" />

        <View style={styles.mainInfo}>
          <Skeleton width={120} height={18} borderRadius={borderRadius.xs} />
          <View style={styles.ratingRow}>
            <Skeleton width={80} height={13} borderRadius={borderRadius.xs} />
          </View>
        </View>

        <Skeleton
          width={68}
          height={26}
          borderRadius={borderRadius.full}
          style={styles.rateBadge}
        />
      </View>

      {/* Recuadro de idiomas */}
      <View style={styles.languagesBox}>
        <Skeleton width="85%" height={14} borderRadius={borderRadius.xs} />
      </View>

      {/* Tags / Intereses */}
      <View style={styles.tagsRow}>
        <Skeleton width={65} height={22} borderRadius={borderRadius.full} />
        <Skeleton width={80} height={22} borderRadius={borderRadius.full} />
        <Skeleton width={70} height={22} borderRadius={borderRadius.full} />
      </View>

      {/* Botones de acción inferiores */}
      <View style={styles.actionsRow}>
        <Skeleton width={44} height={44} borderRadius={14} />
        <Skeleton
          width="78%"
          height={44}
          borderRadius={14}
          style={styles.callButton}
        />
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
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  mainInfo: {
    flex: 1,
    marginLeft: spacing.md,
    gap: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateBadge: {
    alignSelf: 'flex-start',
  },
  languagesBox: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    justifyContent: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  callButton: {
    flex: 1,
  },
});

export default SpeakerCardSkeleton;
