import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  scale,
  verticalScale,
  fontScale,
  moderateScale,
} from '../utils/responsive';
import { fontFamily } from '../theme/typography';

const HEADER_MAX_HEIGHT = verticalScale(300);
const HEADER_MIN_HEIGHT = verticalScale(96);
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function RadioChannelScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  /* ---------------- INTERPOLATIONS ---------------- */

  const headerHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE * 0.6],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, -verticalScale(40)],
    extrapolate: 'clamp',
  });

  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [0, -verticalScale(18)],
    extrapolate: 'clamp',
  });

  const subtitleOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DISTANCE * 0.4],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  /* ---------------- RENDER ---------------- */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* COLLAPSING HEADER */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        {/* IMAGE */}
        <Animated.Image
          source={require('../../assets/images/radio-harmony.jpg')}
          style={[
            styles.bannerImage,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
        />

        {/* GRADIENT */}
        <LinearGradient
          colors={['transparent', '#0E0E11']}
          style={StyleSheet.absoluteFill}
        />

        {/* HEADER CONTENT */}
        <Animated.View
          style={[
            styles.headerContent,
            { transform: [{ translateY: titleTranslateY }] },
          ]}
        >
          <Text style={styles.channelTitle}>Harmony</Text>

          <Animated.Text
            style={[styles.channelSubtitle, { opacity: subtitleOpacity }]}
          >
            Calm melodies and soothing words weave the perfect path to restful
            dreams.
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      {/* LIST */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: HEADER_MAX_HEIGHT + verticalScale(12),
          paddingBottom: verticalScale(40),
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        {RADIO_LIST.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.time}>{item.time}</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- DATA ---------------- */

const RADIO_LIST = [
  {
    time: '07:00 am',
    title: 'Morning Mantras & Bhakti Songs',
    subtitle: 'Bhakti & Inspirational Tales',
  },
  { time: '08:00 am', title: 'Kindness & Joy', subtitle: 'Emotional Growth' },
  {
    time: '08:30 am',
    title: 'Background Audio',
    subtitle: 'Soft flute, meditation chimes',
  },
  {
    time: '11:00 am',
    title: 'Little Legends',
    subtitle: 'Moral & Inspirational Stories',
  },
  {
    time: '12:00 pm',
    title: 'Gratitude & Cultures',
    subtitle: 'Emotional Awareness & Traditions',
  },
  {
    time: '08:30 am',
    title: 'Background Audio',
    subtitle: 'Soft flute, meditation chimes',
  },
  {
    time: '11:00 am',
    title: 'Little Legends',
    subtitle: 'Moral & Inspirational Stories',
  },
  {
    time: '12:00 pm',
    title: 'Gratitude & Cultures',
    subtitle: 'Emotional Awareness & Traditions',
  },
];

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E11',
  },

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    backgroundColor: '#0E0E11',
  },

  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },

  headerContent: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(16),
    right: scale(16),
  },

  channelTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(24),
    fontFamily: fontFamily.bold,
  },

  channelSubtitle: {
    marginTop: verticalScale(6),
    color: '#D0D0D0',
    fontSize: fontScale(14),
    fontFamily: fontFamily.regular,
    lineHeight: fontScale(20),
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(12),
    alignItems: 'center',
  },

  time: {
    width: scale(64),
    color: '#B0B0B0',
    fontSize: fontScale(12),
    fontFamily: fontFamily.medium,
  },

  card: {
    flex: 1,
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(14),
    padding: scale(14),
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(15),
    fontFamily: fontFamily.semiBold,
  },

  cardSubtitle: {
    marginTop: verticalScale(4),
    color: '#9B9B9B',
    fontSize: fontScale(13),
    fontFamily: fontFamily.regular,
  },
});
