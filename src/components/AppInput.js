/* AppInput.js */
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Animated, Platform } from 'react-native';
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
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /* 🔥 subtle focus animation */
  const onFocus = () => {
    setFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.01,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const onBlur = () => {
    setFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const isFilled = !!value?.length;

  const showFocusStyle = focused || isFilled;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <LinearGradient
        colors={
          showFocusStyle
            ? ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.10)']
            : ['#1A1920', '#1A1920']
        }
        style={[
          styles.container,
          showFocusStyle && styles.focusedBorder,
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
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    height: verticalScale(48),
    borderRadius: moderateScale(8), // 🔥 Figma: 8px
    paddingHorizontal: spacing.md,

    backgroundColor: '#1A1920',
    borderWidth: 1,
    borderColor: '#2C2C2E',

    marginBottom: spacing.lg,
  },

  focusedBorder: {
    borderWidth: 1.5, // 🔥 Figma: 1.5px
    borderColor: '#FFFFFF',
  },

  errorBorder: {
    borderColor: '#FF4D4F',
    borderWidth: 1.5,
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
    paddingVertical: isIOS ? spacing.sm : spacing.xs,
  },
});
