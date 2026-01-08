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
import { spacing, fontScale, moderateScale } from '../../utils/responsive';
import { fontFamily } from '../../theme/typography';

const FAQ_LIST = [
  'About the Wippi Audio Player',
  'Using the Wippi Audio Player',
  'Device controllers',
  'Wippi Mobile App',
  'Troubleshooting',
  'Warrynty, Repairs, Exchange & Return',
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

        <View style={styles.headerCenter}>
          <Text style={styles.title}>FAQ’s</Text>
          <Text style={styles.subtitle}>
            Find quick answers to your questions
          </Text>
        </View>

        <View style={{ width: moderateScale(22) }} />
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
            <ArrowRight width={moderateScale(24)} height={moderateScale(24)} />
          </Pressable>
        ))}
      </ScrollView>

      {/* FOOTER CTA */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Need more information?</Text>

        <LinearGradient
          colors={['#667AFF', '#9324F0', '#4010AB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
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
    paddingHorizontal: spacing.lg,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },

  headerCenter: {
    flex: 1,
    marginHorizontal: spacing.lg,
  },

  title: {
    color: '#FFFFFF',
    fontSize: fontScale(18),
    fontFamily: fontFamily.bold,
  },

  subtitle: {
    color: '#8E8E93',
    fontSize: fontScale(13),
    marginTop: spacing.xs,
    fontFamily: fontFamily.regular,
  },

  /* LIST */
  listContainer: {
    paddingTop: spacing.sm,
    paddingBottom: moderateScale(140), // 🔥 space for CTA
  },

  faqCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(14),
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    height: moderateScale(60),
  },

  faqText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.semibold,
  },

  /* FOOTER */
  footer: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    alignItems: 'center',
  },

  footerText: {
    color: '#8E8E93',
    fontSize: fontScale(13),
    marginBottom: spacing.md,
    fontFamily: fontFamily.regular,
  },

  contactBtn: {
    width: '100%',
    minHeight: moderateScale(52),
    borderRadius: moderateScale(14),
    marginBottom: spacing.lg,
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
