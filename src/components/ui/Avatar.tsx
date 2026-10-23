import React from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native';
import { colors } from '@/theme';

export interface AvatarProps {
  uri: string;
  size?: number;
  isOnline?: boolean;
  flag?: string;
  style?: StyleProp<ViewStyle>;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 48,
  isOnline = false,
  flag,
  style,
}) => {
  const indicatorSize = Math.max(10, Math.round(size * 0.25));

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Image
        source={{ uri }}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
        ]}
      />
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
          <Text style={styles.flagText}>{flag}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.borderLight,
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
