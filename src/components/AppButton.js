import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  scale,
  verticalScale,
  fontScale,
  moderateScale,
} from '../utils/responsive';
import { fontFamily } from '../theme/typography';

export default function AppButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
    >
      <LinearGradient
        colors={
          disabled ? ['#3A3A3C', '#3A3A3C'] : ['#667AFF', '#9324F0', '#4010AB']
        }
        locations={[0.0128, 0.5002, 0.9876]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.52 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: verticalScale(48),
    width: scale(345),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: fontScale(18),
    fontFamily: fontFamily.semiBold,
  },
});
