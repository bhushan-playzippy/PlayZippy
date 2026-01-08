import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

/* iPhone 13 mini baseline */
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

/* ---------------- SCALE ---------------- */

export const scale = size => (width / BASE_WIDTH) * size;
export const verticalScale = size => (height / BASE_HEIGHT) * size;

/* ---------------- FONT ---------------- */

export const fontScale = size =>
  Math.round(PixelRatio.roundToNearestPixel(scale(size)));

/* ---------------- SAFE SCALE ---------------- */

export const moderateScale = (size, factor = 0.4) =>
  size + (scale(size) - size) * factor;

/* ---------------- PLATFORM ---------------- */

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

/* ---------------- SPACING SYSTEM ---------------- */

export const spacing = {
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  lg: moderateScale(16),
  xl: moderateScale(24),
  xxl: moderateScale(32),
};
