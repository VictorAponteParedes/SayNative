import React from 'react';
import { ViewStyle, StyleSheet, StatusBar, Platform } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { colors } from '../../theme';

export interface SafeAreaContainerProps {
  children: React.ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
  backgroundColor?: string;
}

export const SafeAreaContainer: React.FC<SafeAreaContainerProps> = ({
  children,
  edges = ['top', 'left', 'right'],
  style,
  backgroundColor = colors.background,
}) => {
  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, { backgroundColor }, style]}
    >
      <StatusBar
        barStyle="dark-content"
        {...(Platform.OS === 'android' ? { backgroundColor } : {})}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
