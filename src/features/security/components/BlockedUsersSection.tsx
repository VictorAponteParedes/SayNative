import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ban, UserX } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '@/theme';
import { AppText, Avatar } from '@/components';
import type { BlockedUser } from '../types';

export interface BlockedUsersSectionProps {
  blockedUsers: BlockedUser[];
  onUnblock: (user: BlockedUser) => void;
}

export const BlockedUsersSection: React.FC<BlockedUsersSectionProps> = ({
  blockedUsers,
  onUnblock,
}) => {
  const { t } = useTranslation('security');

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerRow}>
        <AppText variant="caption" style={styles.sectionTitle}>
          {t('blockedUsers.sectionTitle', { count: blockedUsers.length })}
        </AppText>
        <Ban size={16} color={colors.textSecondary} />
      </View>

      <AppText variant="caption" style={styles.sectionDesc}>
        {t('blockedUsers.description')}
      </AppText>

      {/* Tarjeta con lista de usuarios bloqueados */}
      <View style={styles.card}>
        {blockedUsers.map((user, index) => (
          <React.Fragment key={user.id}>
            {index > 0 && <View style={styles.divider} />}
            <View style={styles.userRow}>
              {/* Avatar del usuario o icono de bloqueo */}
              {user.avatarUrl ? (
                <Avatar
                  uri={user.avatarUrl}
                  name={user.name}
                  size={42}
                  flag={user.countryCode}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <UserX size={18} color={colors.textSecondary} />
                </View>
              )}

              {/* Información del usuario */}
              <View style={styles.userInfoColumn}>
                <AppText variant="body" style={styles.userName}>
                  {user.name} {user.countryCode ? `· ${user.countryCode}` : ''}
                </AppText>
                <AppText variant="caption" style={styles.blockedDate}>
                  {t('blockedUsers.blockedDate', { date: user.blockedDate })}
                </AppText>
                <View style={styles.reasonPill}>
                  <AppText variant="caption" style={styles.reasonText}>
                    {user.reasonKey?.includes('.')
                      ? t(user.reasonKey)
                      : user.reasonKey || t('blockedUsers.behaviorReason')}
                  </AppText>
                </View>
              </View>

              {/* Botón Desbloquear */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onUnblock(user)}
                style={styles.unblockButton}
              >
                <AppText variant="caption" style={styles.unblockButtonText}>
                  {t('blockedUsers.unblockButton')}
                </AppText>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}

        {blockedUsers.length === 0 && (
          <View style={styles.emptyContainer}>
            <AppText variant="bodySmall" style={styles.emptyText}>
              {t('blockedUsers.noBlocked')}
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  sectionDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  userInfoColumn: {
    flex: 1,
    marginRight: spacing.sm,
  },
  userName: {
    fontWeight: '800',
    color: colors.textPrimary,
    fontSize: 14,
    marginBottom: 1,
  },
  blockedDate: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: 4,
  },
  reasonPill: {
    backgroundColor: colors.primaryBgSubtle,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: 6,
  },
  reasonText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  unblockButton: {
    backgroundColor: colors.primaryBgSubtle,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 10,
  },
  unblockButtonText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  emptyContainer: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
  },
});
