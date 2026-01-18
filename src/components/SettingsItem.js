import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
// import { colors } from '../theme/colors';
import { spacing, fontScale, moderateScale } from '../utils/responsive';
import { fontFamily } from '../theme/typography';

// SVG imports
import UserIcon from '../../assets/icons/user.svg';
import KidIcon from '../../assets/icons/kid.svg';
import WifiIcon from '../../assets/icons/wifi.svg';
import OrdersIcon from '../../assets/icons/orders.svg';
import FaqIcon from '../../assets/icons/faq.svg';
import CallIcon from '../../assets/icons/call.svg';
import LogoutIcon from '../../assets/icons/logout.svg';

const ICON_MAP = {
  user: UserIcon,
  kid: KidIcon,
  wifi: WifiIcon,
  orders: OrdersIcon,
  faq: FaqIcon,
  call: CallIcon,
  logout: LogoutIcon,
};

export default function SettingsItem({
  label,
  icon,
  onPress,
  showDivider = true,
}) {
  const Icon = ICON_MAP[icon];

  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      >
        <View style={styles.left}>
          {Icon && <Icon width={24} height={24} />}
          <Text style={styles.text}>{label}</Text>
        </View>
      </Pressable>

      {showDivider && <View style={styles.divider} />}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: moderateScale(18),
    paddingHorizontal: moderateScale(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: '#2A2A36',
    borderRadius: 12,
    // marginVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
    fontStyle: 'normal',
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A35',
    marginHorizontal: 12,
  },
});
