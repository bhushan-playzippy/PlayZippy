/* AppInput.js */
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  spacing,
  fontScale,
  verticalScale,
  moderateScale,
  isIOS,
} from '../utils/responsive';
import { fontFamily } from '../theme/typography';

export default function AppInput({
  value,
  placeholder,
  icon,
  error,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
  maxLength,
}) {
  const [focused, setFocused] = useState(false);

  const isFilled = !!value?.length;
  const isActive = focused || isFilled;

  return (
    <View style={styles.wrapper}>
      {/* 🔥 GRADIENT OVERLAY (FOCUS / FILLED ONLY) */}
      {isActive && !error && (
        <LinearGradient
          colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.10)']}
          style={styles.gradientOverlay}
        />
      )}

      {/* INPUT CONTAINER */}
      <View
        style={[
          styles.container,
          isActive && styles.focusedBorder,
          error && styles.errorBorder,
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}

        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          style={styles.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: spacing.lg,
  },

  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: moderateScale(8),
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',

    height: verticalScale(48),
    borderRadius: moderateScale(8),
    paddingHorizontal: spacing.md,

    backgroundColor: '#1A1920',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },

  focusedBorder: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  errorBorder: {
    borderWidth: 1.5,
    borderColor: '#FF4D4F',
  },

  icon: {
    marginRight: spacing.sm,
    opacity: 0.9,
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: fontScale(15),
    fontFamily: fontFamily.regular,

    paddingVertical: 0, // 🔥 IMPORTANT
    lineHeight: fontScale(18), // 🔥 fixes iOS vertical mismatch

    ...(isIOS && {
      marginTop: 1, // tiny optical fix
    }),
  },
});
