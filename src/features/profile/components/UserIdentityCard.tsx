import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Pencil, CheckCircle2, Mail } from 'lucide-react-native';
import { colors, spacing } from '@/theme';
import { AppText } from '@/components';
import type { UserProfile } from '@/store/useAuthStore';

export interface UserIdentityCardProps {
  user: UserProfile;
  onPressEdit: () => void;
}

export const UserIdentityCard: React.FC<UserIdentityCardProps> = ({
  user,
  onPressEdit,
}) => {
  return (
    <View style={styles.container}>
      {/* Avatar con botón de editar */}
      <View style={styles.avatarWrapper}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatarImage} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressEdit}
          style={styles.editBadgeButton}
        >
          <Pencil size={15} color={colors.surface} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      {/* Nombre, Bandera y Check de Verificado */}
      <View style={styles.nameRow}>
        <AppText variant="h2" style={styles.nameText}>
          {user.name}
        </AppText>
        {!!user.countryFlag && (
          <AppText style={styles.flagEmoji}> {user.countryFlag}</AppText>
        )}
        {user.isVerified && (
          <View style={styles.verifiedIconWrapper}>
            <CheckCircle2 size={18} color={colors.primary} />
          </View>
        )}
      </View>

      {/* Correo electrónico visible sutilmente */}
      {!!user.email && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressEdit}
          style={styles.emailPill}
        >
          <Mail size={13} color={colors.textSecondary} style={styles.emailIcon} />
          <AppText variant="caption" style={styles.emailText}>
            {user.email}
          </AppText>
        </TouchableOpacity>
      )}

      {/* Biografía */}
      {!!user.bio && (
        <AppText variant="bodySmall" style={styles.bioText}>
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
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatarImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: colors.surface,
  },
  editBadgeButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  flagEmoji: {
    fontSize: 18,
    marginHorizontal: 4,
  },
  verifiedIconWrapper: {
    marginLeft: 2,
  },
  emailPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSubtle,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  emailIcon: {
    marginRight: 4,
  },
  emailText: {
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 12,
  },
  bioText: {
    textAlign: 'center',
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 2,
    paddingHorizontal: spacing.md,
  },
});
