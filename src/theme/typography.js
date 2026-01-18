import { fontScale } from '../utils/responsive';

export const fontFamily = {
  regular: 'Quicksand-Regular',
  medium: 'Quicksand-Medium',
  semiBold: 'Quicksand-SemiBold',
  bold: 'Quicksand-Bold',
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
