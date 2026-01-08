import { fontScale } from '../utils/responsive';

export const fontFamily = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
};

export const typography = {
  title: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontScale(18),
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontScale(14),
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontScale(12),
  },
};
