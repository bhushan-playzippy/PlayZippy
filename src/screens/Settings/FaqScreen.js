import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// SVGs..
import BackIcon from '../../../assets/icons/backLeft.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import WhatsappIcon from '../../../assets/icons/whatsapp.svg';

// 🔥 RESPONSIVE UTILS
import {
  spacing,
  fontScale,
  moderateScale,
  verticalScale,
} from '../../utils/responsive';
import { fontFamily } from '../../theme/typography';

const FAQ_LIST = [
  'About the Wippi Audio Player',
  'Using the Wippi Audio Player',
  'Device controllers',
  'Wippi Mobile App',
  'Troubleshooting',
  'Warranty, Repairs, Exchange & Return',
];

export default function FaqScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon width={moderateScale(22)} height={moderateScale(22)} />
        </Pressable>

        <View style={styles.headerText}>
          <Text style={styles.title}>FAQ’s</Text>
          <Text style={styles.subtitle}>
            Find quick answers to your questions
          </Text>
        </View>
      </View>

      {/* FAQ LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {FAQ_LIST.map(item => (
          <Pressable
            key={item}
            style={styles.faqCard}
            onPress={() => {
              if (item === 'Device Setup') {
                navigation.navigate('DeviceSetupFaq');
              }
            }}
          >
            <Text style={styles.faqText}>{item}</Text>
            <ArrowRight width={moderateScale(20)} height={moderateScale(20)} />
          </Pressable>
        ))}
      </ScrollView>

      {/* FOOTER CTA */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Need more information?</Text>

        <LinearGradient
          colors={['#667AFF', '#9324F0', '#4010AB']}
          locations={[0.0128, 0.5002, 0.9876]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.52 }}
          style={styles.contactBtn}
        >
          <Pressable
            onPress={() => console.log('Contact Us')}
            style={styles.contactPressable}
          >
            <View style={styles.contactContent}>
              <WhatsappIcon
                width={moderateScale(20)}
                height={moderateScale(20)}
              />
              <Text style={styles.contactText}>Contact Us</Text>
            </View>
          </Pressable>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E11',
    // paddingHorizontal: spacing.lg,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg, // 16
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(20),
    gap: spacing.md, // 12
  },

  title: {
    color: '#FFFFFF',
    fontSize: fontScale(18),
    fontFamily: fontFamily.semiBold,
    lineHeight: fontScale(22),
  },

  subtitle: {
    marginTop: verticalScale(2), // 🔥 tighter
    color: '#8E8E93',
    fontSize: fontScale(13),
    fontFamily: fontFamily.regular,
    lineHeight: fontScale(18),
  },

  /* LIST */
  listContainer: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg, // 🔥 move padding here
    paddingBottom: moderateScale(160), // space for CTA
  },

  faqCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(14),
    paddingHorizontal: spacing.lg, // 16
    height: moderateScale(56),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4, // 🔥 correct height
    marginBottom: spacing.sm,
  },

  faqText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.medium, // 🔥 not semibold
  },

  /* FOOTER */
  footer: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: verticalScale(20),
    alignItems: 'center',
  },

  footerText: {
    color: '#8E8E93',
    fontSize: fontScale(13),
    marginBottom: verticalScale(12),
    fontFamily: fontFamily.regular,
  },

  contactBtn: {
    width: '100%',
    height: moderateScale(52),
    borderRadius: moderateScale(14),
  },

  contactPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contactText: {
    color: '#FFFFFF',
    fontSize: fontScale(14),
    fontWeight: '600',
    marginLeft: spacing.sm,
    fontFamily: fontFamily.semiBold,
  },
});
