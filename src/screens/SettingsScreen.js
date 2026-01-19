import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useKidsProfileStore } from '../store/kidsProfile.store';
import SettingsItem from '../components/SettingsItem';
import { colors } from '../theme/colors';
import LogoutModal from './Settings/LogoutModal';

// 🔥 RESPONSIVE UTILS
import { spacing, fontScale, moderateScale } from '../utils/responsive';
import { fontFamily } from '../theme/typography';

export default function SettingsScreen() {
  const [showLogout, setShowLogout] = useState(false);
  const navigation = useNavigation();

  const kidProfile = useKidsProfileStore(state => state.kidProfile);

  const kidsProfileLabel = kidProfile
    ? `${kidProfile.name}'s Profile`
    : 'Kid’s Profile';

  return (
    <SafeAreaView style={styles.container}>
      {/* MAIN CARD */}
      <View style={styles.card}>
        <SettingsItem
          label={'My Profile'}
          icon="user"
          onPress={() => navigation.navigate('Profile')}
        />

        <SettingsItem
          label={kidsProfileLabel}
          icon="kid"
          onPress={() => {
            if (kidProfile) {
              navigation.navigate('KidProfileView');
            } else {
              navigation.navigate('KidsProfile');
            }
          }}
        />

        <SettingsItem label="Device Wi-Fi Setup" icon="wifi" />
        <SettingsItem
          label="Orders"
          icon="orders"
          onPress={() => {
            navigation.navigate('Orders');
          }}
        />
        <SettingsItem
          label="FAQ"
          icon="faq"
          onPress={() => navigation.navigate('Faq')}
        />
        <SettingsItem label="Contact us" icon="call" />
        <SettingsItem
          label="Log Out"
          icon="logout"
          showDivider={false}
          onPress={() => setShowLogout(true)}
        />

        <LogoutModal
          visible={showLogout}
          onCancel={() => setShowLogout(false)}
          onConfirm={() => {
            setShowLogout(false);
            // 🔥 clear store + navigate to auth
          }}
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.textRow}>
          <Text style={styles.text}>Terms of use</Text>
          <Text style={styles.text}>Privacy Policy</Text>
          <Text style={styles.text}>Shipping Policy</Text>
        </View>

        <Text style={[styles.text, styles.footerSpacing]}>
          Return & Refunds
        </Text>

        <Text style={styles.text}>App version 1.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl,
  },

  card: {
    height: moderateScale(450),
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: moderateScale(16),
    backgroundColor: colors.card,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
  },

  footer: {
    marginTop: 'auto', // 🔥 keeps footer at bottom naturally
  },

  textRow: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    gap: moderateScale(24),
    marginBottom: spacing.md,
  },

  footerSpacing: {
    marginBottom: spacing.sm,
  },

  text: {
    color: '#888',
    fontSize: fontScale(18),
    textAlign: 'center',
    fontFamily: fontFamily.bold,
  },
});
