import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors, fonts } from '@/theme';
import { AppText } from './AppText';
import { resolveAvatarUrl } from '@/utils/resolveAvatarUrl';

export interface AvatarProps {
  uri?: string | null;
  name?: string;
  size?: number;
  isOnline?: boolean;
  flag?: string;
  style?: StyleProp<ViewStyle>;
}

export const getInitials = (name?: string): string => {
  if (!name || !name.trim()) return '?';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 48,
  isOnline = false,
  flag,
  style,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [uri]);

  const indicatorSize = Math.max(10, Math.round(size * 0.25));
  const initials = getInitials(name);
  const resolvedUri = resolveAvatarUrl(uri);
  const hasValidUri = Boolean(resolvedUri && resolvedUri.trim() && !hasError);

  return (
    <View style={[{ width: size, height: size }, style]}>
      {hasValidUri ? (
        <Image
          source={{ uri: resolvedUri }}
          onError={() => setHasError(true)}
          style={[
            styles.image,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          <AppText
            style={[
              styles.initialsText,
              {
                fontSize: Math.max(12, Math.round(size * 0.38)),
              },
            ]}
          >
            {initials}
          </AppText>
        </View>
      )}

      {isOnline && (
        <View
          style={[
            styles.onlineBadge,
            {
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              bottom: 0,
              right: 0,
              borderWidth: size > 40 ? 2 : 1.5,
            },
          ]}
        />
      )}

      {flag && (
        <View style={styles.flagContainer}>
          <AppText style={styles.flagText}>{flag}</AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.borderLight,
  },
  initialsContainer: {
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    fontFamily: fonts.bold,
    color: colors.white,
    letterSpacing: 0.5,
  },
  onlineBadge: {
    position: 'absolute',
    backgroundColor: colors.online,
    borderColor: colors.surface,
  },
  flagContainer: {
    position: 'absolute',
    top: -2,
    right: -4,
  },
  flagText: {
    fontSize: 16,
  },
});

export default Avatar;
