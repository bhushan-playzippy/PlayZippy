import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, spacing } from '../utils/responsive';

export default function GradientBorder({ children, style }) {
  return (
    <LinearGradient
      colors={['#8B5CFF', '#C77DFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View style={[styles.gradientInner, style]}>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: moderateScale(18),
    padding: moderateScale(1),
    marginTop: spacing.lg,
  },

  gradientInner: {
    borderRadius: moderateScale(16),
    backgroundColor: '#1C1C24',
    padding: spacing.md,
  },
});
