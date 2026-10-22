import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { spacing } from '../../../theme';
import { CoinPackageCard } from './CoinPackageCard';
import { CoinPackage } from '../types';

export interface PackagesCarouselProps {
  packages: CoinPackage[];
  onPressBuy: (pkg: CoinPackage) => void;
}

export const PackagesCarousel: React.FC<PackagesCarouselProps> = ({
  packages,
  onPressBuy,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {packages.map((pkg) => (
        <CoinPackageCard key={pkg.id} pkg={pkg} onPressBuy={onPressBuy} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    paddingVertical: spacing.md,
  },
});
