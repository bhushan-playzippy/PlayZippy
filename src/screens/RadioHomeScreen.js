import React, { use } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  spacing,
  fontScale,
  moderateScale,
  verticalScale,
} from '../utils/responsive';
import { fontFamily } from '../theme/typography';
import { useNavigation } from '@react-navigation/native';

// ICONS
import RadioIcon from '../../assets/icons/radio.svg';

const HERO_IMAGE = require('../../assets/images/radio-hero.jpg');

const RADIO_CARDS = [
  {
    id: 'harmony',
    title: 'Harmony',
    subtitle:
      'Explore the epic tale of Ramayana through engaging lessons and activities.',
    image: require('../../assets/images/radio-harmony.jpg'),
  },
  {
    id: 'eq',
    title: 'EQ',
    subtitle:
      'Explore the epic tale of Ramayana through engaging lessons and activities.',
    image: require('../../assets/images/radio-eq.jpg'),
  },
];

export default function RadioHomeScreen() {
  const navigation = useNavigation();

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cardWrapper}
        onPress={() => {
          navigation.navigate('RadioChannel', {
            channelId: item.id,
            title: item.title,
          });
        }}
      >
        <Image source={item.image} style={styles.cardImage} />

        {/* Gradient overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.85)']}
          locations={[0, 0.55, 1]}
          style={styles.cardGradient}
        />

        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <RadioIcon width={moderateScale(24)} height={moderateScale(24)} />
          <Text style={styles.headerTitle}>Radio</Text>
        </View>
      </View>

      {/* CONTENT */}
      <FlatList
        data={RADIO_CARDS}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.heroWrapper}>
            <Image source={HERO_IMAGE} style={styles.heroImage} />

            <LinearGradient
              colors={['rgba(0,0,0,0.75)', 'transparent']}
              style={styles.heroTopFade}
            />

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.85)']}
              style={styles.heroBottomFade}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E11',
    paddingTop: 0,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(20),
    fontFamily: fontFamily.semiBold,
  },

  /* HERO */
  heroWrapper: {
    width: '100%', // 🔥 full screen
    marginBottom: verticalScale(14),
    overflow: 'hidden',
  },

  heroImage: {
    width: '100%',
    height: verticalScale(240),
    resizeMode: 'cover',
  },

  heroTopFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: verticalScale(120),
  },

  heroBottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(140),
  },

  /* LIST */
  listContent: {
    paddingBottom: verticalScale(96), // tab bar safe
  },

  /* CARD */
  cardWrapper: {
    marginHorizontal: spacing.lg,
    marginBottom: verticalScale(14),
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: verticalScale(172),
  },

  cardGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: moderateScale(20),
  },

  cardText: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: verticalScale(18),
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(17),
    fontFamily: fontFamily.semiBold,
    marginBottom: spacing.xs,
  },

  cardSubtitle: {
    color: '#DADADA',
    fontSize: fontScale(13),
    lineHeight: fontScale(18),
    fontFamily: fontFamily.regular,
  },
});
