import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../../assets/icons/backLeft.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import GuardrailIcon from '../../../assets/icons/guardrail.svg';
import LearningIcon from '../../../assets/icons/learning.svg';
import { useKidsProfileStore } from '../../store/kidsProfile.store';

/* 🔥 RESPONSIVE UTILS */
import { spacing, fontScale, moderateScale } from '../../utils/responsive';
import { fontFamily } from '../../theme/typography';

export default function KidProfileViewScreen() {
  const navigation = useNavigation();

  const guardrails = useKidsProfileStore(state => state.guardrails);
  const learningThemes = useKidsProfileStore(state => state.learningThemes);
  const kidProfile = useKidsProfileStore(state => state.kidProfile);
  const setEditMode = useKidsProfileStore(state => state.setEditMode);

  if (!kidProfile) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <BackIcon width={moderateScale(22)} height={moderateScale(22)} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            {`${kidProfile.name.split(' ')[0]}'s Profile`}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setEditMode(true);
            navigation.replace('KidsProfile');
          }}
        >
          <EditIcon width={moderateScale(18)} height={moderateScale(18)} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* AVATAR */}
        <View style={styles.avatarWrapper}>
          <LinearGradient
            colors={['#8B5CFF', '#C77DFF']}
            style={styles.avatarRing}
          />
          <View style={styles.statusDot} />
        </View>

        <Text style={styles.name}>{kidProfile.name}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            {new Date().getFullYear() - new Date(kidProfile.dob).getFullYear()}{' '}
            Yrs
          </Text>
          <Text style={styles.meta}>{kidProfile.gender}</Text>
          <Text style={styles.meta}>{kidProfile.language}</Text>
        </View>

        {/* GUARDRAILS */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <GuardrailIcon
                width={moderateScale(18)}
                height={moderateScale(18)}
              />
              <Text style={styles.cardTitle}>Guardrails</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Guardrails')}>
              <EditIcon width={moderateScale(16)} height={moderateScale(16)} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chipsContainer}>
            {guardrails.map(item => (
              <View key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* LEARNING THEMES */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <LearningIcon
                width={moderateScale(18)}
                height={moderateScale(18)}
              />
              <Text style={styles.cardTitle}>Learning Themes</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('LearningTheme')}
            >
              <EditIcon width={moderateScale(16)} height={moderateScale(16)} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chipsContainer}>
            {learningThemes.map(item => (
              <View key={item} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E11',
    paddingHorizontal: spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },

  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(18),
    fontFamily: fontFamily.bold,
  },

  scrollContent: {
    paddingBottom: spacing.xl,
  },

  avatarWrapper: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },

  avatarRing: {
    width: moderateScale(110),
    height: moderateScale(110),
    borderRadius: moderateScale(55),
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusDot: {
    position: 'absolute',
    bottom: moderateScale(6),
    right: '38%',
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    backgroundColor: '#E6E6E6',
    borderWidth: moderateScale(2),
    borderColor: '#0E0E11',
  },

  name: {
    color: '#FFFFFF',
    fontSize: fontScale(20),
    textAlign: 'center',
    marginTop: spacing.md,
    fontFamily: fontFamily.semiBold,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },

  meta: {
    color: '#CCCCCC',
    fontSize: fontScale(16),
    marginHorizontal: spacing.xl,
    fontFamily: fontFamily.semiBold,
  },

  card: {
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(16),
    padding: spacing.md,
    marginTop: spacing.lg,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    marginLeft: spacing.sm,
    fontFamily: fontFamily.semiBold,
  },

  chipsContainer: {
    maxHeight: moderateScale(200),
  },

  chip: {
    alignSelf: 'flex-start',
    backgroundColor: '#24242F',
    borderRadius: moderateScale(10),
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    minWidth: moderateScale(110),
    marginBottom: spacing.sm,
  },

  chipText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.medium,
  },
});
