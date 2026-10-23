import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { colors } from '@/theme';

export interface AppLogoProps {
  size?: number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rounded?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 32,
  style,
  containerStyle,
  rounded = true,
}) => {
  const borderRadius = rounded ? Math.round(size * 0.26) : 0;

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius,
        },
        containerStyle,
      ]}
    >
      <Image
        source={require('../../../assets/images/logo.png')}
        style={[
          {
            width: size,
            height: size,
            borderRadius,
          },
          style,
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
});
