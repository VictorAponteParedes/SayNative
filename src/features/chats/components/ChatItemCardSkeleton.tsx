import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '@/theme';
import { Skeleton } from '@/components';

export const ChatItemCardSkeleton: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Avatar circular */}
      <View style={styles.avatarWrapper}>
        <Skeleton width={54} height={54} variant="circle" />
      </View>

      {/* Información del chat */}
      <View style={styles.infoWrapper}>
        {/* Fila superior: Nombre y Hora */}
        <View style={styles.topNameRow}>
          <Skeleton width={130} height={16} borderRadius={borderRadius.xs} />
          <Skeleton width={42} height={12} borderRadius={borderRadius.xs} />
        </View>

        {/* Fila inferior: Mensaje y Badge */}
        <View style={styles.bottomMessageRow}>
          <Skeleton width="75%" height={14} borderRadius={borderRadius.xs} />
          <Skeleton width={20} height={20} variant="circle" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm + 2,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  avatarWrapper: {
    marginRight: spacing.md,
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  topNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomMessageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ChatItemCardSkeleton;
