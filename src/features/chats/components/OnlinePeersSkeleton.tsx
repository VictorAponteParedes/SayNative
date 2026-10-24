import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '@/theme';
import { AppText, Skeleton } from '@/components';

export const OnlinePeersSkeleton: React.FC = () => {
  const { t } = useTranslation('chats');

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerRow}>
        <View style={styles.titleWithDot}>
          <View style={styles.onlineDot} />
          <AppText variant="bodyMedium" style={styles.sectionTitle}>
            {t('onlineSection.title')}
          </AppText>
        </View>

        <Skeleton width={90} height={14} borderRadius={borderRadius.xs} />
      </View>

      {/* Lista horizontal con botón + Nuevo y avatares esqueleto */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollList}
      >
        {/* Botón Nuevo */}
        <View style={styles.peerItem}>
          <View style={styles.newButtonCircle}>
            <Plus size={20} color={colors.primary} strokeWidth={2.5} />
          </View>
          <AppText variant="caption" style={styles.peerName}>
            {t('onlineSection.new')}
          </AppText>
        </View>

        {/* 5 Skeletons de compañeros */}
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={`peer_skel_${item}`} style={styles.peerItem}>
            <View style={styles.avatarWrapper}>
              <Skeleton width={52} height={52} variant="circle" />
            </View>
            <Skeleton
              width={44}
              height={10}
              borderRadius={borderRadius.xs}
              style={styles.nameSkeleton}
            />
          </View>
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
  peerName: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: 11,
    textAlign: 'center',
  },
  avatarWrapper: {
    width: 52,
    height: 52,
    marginBottom: 6,
  },
  nameSkeleton: {
    marginTop: 2,
  },
});

export default OnlinePeersSkeleton;
