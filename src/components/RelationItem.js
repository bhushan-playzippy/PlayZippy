import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { fontFamily } from '../theme/typography';
import { moderateScale, verticalScale, spacing } from '../utils/responsive';

// SVG imports (we’ll configure this below)
import DadIcon from '../../assets/icons/father.svg';
import MomIcon from '../../assets/icons/mother.svg';
import GuardianIcon from '../../assets/icons/guardian.svg';
import GrandfatherIcon from '../../assets/icons/grandFather.svg';
import GrandmotherIcon from '../../assets/icons/grandMother.svg';
import { fontScale } from '../utils/responsive';

const ICON_MAP = {
  Dad: DadIcon,
  Mom: MomIcon,
  Guardian: GuardianIcon,
  Grandfather: GrandfatherIcon,
  Grandmother: GrandmotherIcon,
};

export default function RelationItem({
  label,
  selected,
  onPress,
  fullWidth = false,
}) {
  const Icon = ICON_MAP[label];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.item,
        // fullWidth && styles.fullWidth,

        selected && styles.relationSelected,
      ]}
    >
      <View style={styles.iconWrapper}>
        {Icon && <Icon width={32} height={32} />}
      </View>

      <Text style={[styles.text, selected && styles.textSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    width: '48%',
    height: verticalScale(78),
    borderRadius: moderateScale(12),
    backgroundColor: '#1C1C24',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },

  relationSelected: {
    backgroundColor: '#24242F',
    borderWidth: moderateScale(1),
    borderColor: '#FFFFFF',
  },

  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#8E8E93',
    fontSize: fontScale(14),
    fontFamily: fontFamily.medium,
  },
  textSelected: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: fontScale(15),
  },
});
