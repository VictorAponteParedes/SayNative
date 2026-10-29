import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Pencil, CheckCircle2, Mail } from 'lucide-react-native';
import { colors, spacing, borderRadius, fonts } from '@/theme';
import { AppText, Avatar } from '@/components';
import type { UserProfile } from '@/store/useAuthStore';

export interface UserIdentityCardProps {
  user: UserProfile;
  onPressEdit: () => void;
  onPressChangePhoto?: () => void;
}

export const UserIdentityCard: React.FC<UserIdentityCardProps> = ({
  user,
  onPressEdit,
  onPressChangePhoto,
}) => {
  return (
    <View style={styles.container}>
      {/* Avatar con doble anillo concéntrico y botón de editar */}
      <View style={styles.avatarOuterRing}>
        <View style={styles.avatarInnerContainer}>
          <Avatar
            uri={user.avatarUrl}
            name={user.name}
            size={88}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressChangePhoto || onPressEdit}
          style={styles.editBadgeButton}
          accessibilityRole="button"
          accessibilityLabel="Cambiar foto de perfil"
        >
          <Pencil size={13} color={colors.white} strokeWidth={2.4} />
        </TouchableOpacity>
      </View>

      {/* Nombre y Bandera de País */}
      <View style={styles.nameRow}>
        <AppText style={styles.nameText}>
          {user.name}
        </AppText>
        {!!user.countryFlag && (
          <View style={styles.flagBadge}>
            <AppText style={styles.flagEmoji}>{user.countryFlag}</AppText>
          </View>
        )}
        {user.isVerified && (
          <View style={styles.verifiedIconWrapper}>
            <CheckCircle2 size={18} color={colors.primary} />
          </View>
        )}
      </View>

      {/* Correo Electrónico en Tarjeta / Pill Blanca Flotante */}
      {!!user.email && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressEdit}
          style={styles.emailPill}
          accessibilityRole="button"
          accessibilityLabel={`Correo: ${user.email}`}
        >
          <Mail size={14} color={colors.primary} style={styles.emailIcon} />
          <AppText style={styles.emailText}>
            {user.email}
          </AppText>
        </TouchableOpacity>
      )}

      {/* Biografía si está presente */}
      {!!user.bio && (
        <AppText style={styles.bioText}>
          {user.bio}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  avatarOuterRing: {
    position: 'relative',
    padding: 3.5,
    borderRadius: borderRadius.full,
    borderWidth: 2.5,
    borderColor: colors.primaryLighter,
    marginBottom: spacing.xs + 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarInnerContainer: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  editBadgeButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
    gap: 6,
  },
  nameText: {
    fontFamily: fonts.extraBold,
    fontSize: 22,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  flagBadge: {
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: borderRadius.xs,
  },
  flagEmoji: {
    fontSize: 16,
  },
  verifiedIconWrapper: {
    marginLeft: 2,
  },
  emailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    marginTop: 2,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  emailIcon: {
    marginRight: 6,
  },
  emailText: {
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    fontSize: 13,
  },
  bioText: {
    fontFamily: fonts.regular,
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 18,
    fontSize: 12.5,
    marginTop: 2,
    paddingHorizontal: spacing.md,
  },
});
