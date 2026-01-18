/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { fontFamily } from '../theme/typography';
import SettingsStack from './SettingsStack';
import RadioStack from './RadioStack';

// SVG ICONS
import LibraryIcon from '../../assets/icons/library.svg';

import ShopIcon from '../../assets/icons/shop.svg';
import HomeIcon from '../../assets/icons/home.svg';
import RewardsIcon from '../../assets/icons/rewards.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import { fontScale, verticalScale, scale } from '../utils/responsive';

const Tab = createBottomTabNavigator();

/* ---------------------------------- */
/* Placeholder screen */
/* ---------------------------------- */
function PlaceholderScreen() {
  return <View style={styles.placeholder} />;
}

/* ---------------------------------- */
/* ICON MAP */
/* ---------------------------------- */
const ICONS = {
  Library: LibraryIcon,
  Shop: ShopIcon,
  Home: HomeIcon,
  Rewards: RewardsIcon,
  Settings: SettingsIcon,
};

/* ---------------------------------- */
/* TAB ITEM (ICON + LABEL + ANIMATION) */
/* ---------------------------------- */
const TabItem = React.memo(function TabItem({ label, Icon, focused, onPress }) {
  const scales = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;
  const translateY = useRef(new Animated.Value(4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scales, {
        toValue: focused ? 1.15 : 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: focused ? 1 : 0.6,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: focused ? 0 : 4,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused, opacity, scales, translateY]);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.tabItem, focused && styles.tabItemFocused]}
    >
      <Animated.View
        style={{
          transform: [{ scale: scales }],
          opacity,
          alignItems: 'center',
        }}
      >
        <Icon
          width={scale(26.33)}
          height={scale(26.33)}
          fill={focused ? '#FFFFFF' : '#17191A'}
        />

        {/* 🔥 LABEL */}
        <Animated.Text
          style={[
            styles.label,
            {
              opacity,
              transform: [{ translateY }],
              color: focused ? '#FFFFFF' : '#4B5057',
            },
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
});

/* ---------------------------------- */
/* CUSTOM TAB BAR */
/* ---------------------------------- */
function CustomTabBar({ state, navigation }) {
  // 🔥 hide tab bar on Profile screen
  const route = state.routes[state.index];
  const focusedRouteName = getFocusedRouteNameFromRoute(route) ?? route.name;

  if (
    focusedRouteName === 'Profile' ||
    focusedRouteName === 'KidsProfile' ||
    focusedRouteName === 'ContentSafety' ||
    focusedRouteName === 'Parenting' ||
    focusedRouteName === 'KidProfileView' ||
    focusedRouteName === 'Faq' ||
    focusedRouteName === 'Orders' ||
    focusedRouteName === 'OrderDetails' ||
    focusedRouteName === 'RadioChannel'
  ) {
    return null;
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((r, index) => {
        const focused = state.index === index;
        const Icon = ICONS[r.name];

        return (
          <TabItem
            key={r.key}
            label={r.name}
            Icon={Icon}
            focused={focused}
            onPress={() => {
              if (!focused) {
                navigation.navigate(r.name);
              }
            }}
          />
        );
      })}
    </View>
  );
}

/* ---------------------------------- */
/* MAIN TAB NAVIGATOR */
/* ---------------------------------- */
export default function BottomBarNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={CustomTabBar}
      initialRouteName="Home"
    >
      <Tab.Screen name="Library" component={PlaceholderScreen} />
      <Tab.Screen name="Shop" component={PlaceholderScreen} />
      <Tab.Screen name="Home" component={RadioStack} />
      <Tab.Screen name="Rewards" component={PlaceholderScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
}

/* ---------------------------------- */
/* STYLES */
/* ---------------------------------- */
const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    /* Figma: height 94 */
    height: verticalScale(94),
    /* Figma padding: 8px 16px 32px 16px */
    paddingTop: verticalScale(8),
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(32),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#17191A',

    /* Shadow/xs */
    shadowColor: '#F1F1F1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  tabItemFocused: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    marginTop: verticalScale(6),
    fontSize: fontScale(13), // Figma bottom tabs usually 12
    lineHeight: fontScale(14),
    color: '#4B5057',
    fontFamily: fontFamily.regular,
  },
});
