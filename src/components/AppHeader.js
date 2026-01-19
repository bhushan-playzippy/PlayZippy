import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../assets/icons/backLeft.svg';
import {
  scale,
  verticalScale,
  fontScale,
  moderateScale,
  spacing,
} from '../utils/responsive';
import { fontFamily } from '../theme/typography';

export default function AppHeader({
  title,
  showBack = true,
  rightIcon: RightIcon,
  onRightPress,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* LEFT */}
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={moderateScale(22)} height={moderateScale(22)} />
          </TouchableOpacity>
        )}
      </View>

      {/* CENTER */}
      <Text style={styles.title}>{title}</Text>

      {/* RIGHT */}
      <View style={[styles.side, styles.right]}>
        {RightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            <RightIcon width={moderateScale(18)} height={moderateScale(18)} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: verticalScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  side: {
    width: scale(32),
    justifyContent: 'center',
  },

  right: {
    alignItems: 'flex-end',
  },

  title: {
    flex: 1,
    textAlign: 'left',
    color: '#FFFFFF',
    fontSize: fontScale(18),
    fontFamily: fontFamily.bold,
  },
});
