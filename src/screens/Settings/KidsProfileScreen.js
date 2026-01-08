/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import BackLeft from '../../../assets/icons/backLeft.svg';
import UserIcon from '../../../assets/icons/user.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import GirlIcon from '../../../assets/icons/girl.svg';
import BoyIcon from '../../../assets/icons/boy.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import AlertIcon from '../../../assets/icons/alert.svg';
import GuardrailIcon from '../../../assets/icons/guardrail.svg';
import LearningIcon from '../../../assets/icons/learning.svg';
import XCloseIcon from '../../../assets/icons/x-close.svg';

import { useKidsProfileStore } from '../../store/kidsProfile.store';

/* 🔥 RESPONSIVE UTILS */
import {
  spacing,
  fontScale,
  moderateScale,
  isIOS,
} from '../../utils/responsive';
import { fontFamily } from '../../theme/typography';

const GENDERS = ['Girl', 'Boy'];
const LANGUAGES = ['English', 'Hinglish'];

export default function KidsProfileScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('Girl');
  const [language, setLanguage] = useState('English');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});

  const guardrails = useKidsProfileStore(s => s.guardrails);
  const learningThemes = useKidsProfileStore(s => s.learningThemes);
  const setKidProfile = useKidsProfileStore(s => s.setKidProfile);
  const kidProfile = useKidsProfileStore(s => s.kidProfile);
  const editMode = useKidsProfileStore(s => s.editMode);
  const setEditMode = useKidsProfileStore(s => s.setEditMode);

  useEffect(() => {
    if (editMode && kidProfile) {
      setName(kidProfile.name);
      setDob(new Date(kidProfile.dob));
      setGender(kidProfile.gender);
      setLanguage(kidProfile.language);
    }
  }, [editMode, kidProfile]);

  const formatDate = date => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${year} ${month} ${day}`;
  };

  const validate = () => {
    let msg = '';
    if (!name.trim() && !dob) msg = 'Enter name and select date';
    else if (!name.trim()) msg = 'Enter name';
    else if (!dob) msg = 'Select date';

    if (msg) {
      setErrors({ message: msg });
      return false;
    }
    setErrors({});
    return true;
  };

  const onSave = () => {
    if (!validate()) return;
    setShowConfirmModal(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={isIOS ? 'padding' : undefined}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackLeft width={moderateScale(24)} height={moderateScale(24)} />
          </TouchableOpacity>

          <Text style={styles.title}>Kid's Profile</Text>
          <View style={{ width: moderateScale(24) }} />
        </View>

        {/* NAME */}
        <View style={styles.inputBox}>
          <UserIcon width={moderateScale(24)} height={moderateScale(24)} />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#8E8E93"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        {/* DOB */}
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setShowDatePicker(true)}
        >
          <CalendarIcon width={moderateScale(24)} height={moderateScale(24)} />
          <Text style={styles.dobText}>
            {dob ? formatDate(dob) : 'Date of Birth'}
          </Text>
        </TouchableOpacity>

        {/* GENDER */}
        <View style={styles.row}>
          {GENDERS.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => setGender(item)}
              style={[styles.card, gender === item && styles.cardSelected]}
            >
              {item === 'Girl' ? (
                <GirlIcon
                  width={moderateScale(28)}
                  height={moderateScale(28)}
                />
              ) : (
                <BoyIcon width={moderateScale(28)} height={moderateScale(28)} />
              )}
              <Text style={styles.cardText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LANGUAGE */}
        <Text style={styles.sectionTitle}>Language for</Text>
        <View style={styles.row}>
          {LANGUAGES.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => setLanguage(item)}
              style={[styles.card, language === item && styles.cardSelected]}
            >
              <Text style={styles.cardText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LINKS */}
        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => navigation.navigate('Guardrails')}
        >
          <View style={styles.settingLeft}>
            <GuardrailIcon
              width={moderateScale(18)}
              height={moderateScale(18)}
            />
            <Text style={styles.settingText}>Guardrails</Text>
            {!!guardrails.length && (
              <Text style={styles.rowText}>({guardrails.length})</Text>
            )}
          </View>
          <ArrowRight width={moderateScale(24)} height={moderateScale(24)} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingCard}
          onPress={() => navigation.navigate('LearningTheme')}
        >
          <View style={styles.settingLeft}>
            <LearningIcon
              width={moderateScale(18)}
              height={moderateScale(18)}
            />
            <Text style={styles.settingText}>Learning Themes</Text>
            {!!learningThemes.length && (
              <Text style={styles.rowText}>({learningThemes.length})</Text>
            )}
          </View>
          <ArrowRight width={moderateScale(24)} height={moderateScale(24)} />
        </TouchableOpacity>

        {/* ERROR */}
        {errors.message && (
          <View style={styles.errorCard}>
            <AlertIcon width={moderateScale(16)} height={moderateScale(16)} />
            <Text style={styles.errorText}>{errors.message}</Text>
          </View>
        )}

        {/* SAVE */}
        <TouchableOpacity onPress={onSave} style={{ marginTop: 'auto' }}>
          <LinearGradient
            colors={['#667AFF', '#9324F0', '#4010AB']}
            style={styles.saveBtn}
          >
            <Text style={styles.saveText}>{editMode ? 'Update' : 'Save'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* DATE PICKER — FIXED FOR iOS */}
        <DatePicker
          modal
          open={showDatePicker}
          date={dob || new Date()}
          mode="date"
          onConfirm={date => {
            setShowDatePicker(false);
            setDob(date);
          }}
          onCancel={() => setShowDatePicker(false)}
        />

        {/* CONFIRM MODAL */}
        <Modal transparent visible={showConfirmModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <XCloseIcon
                width={moderateScale(22)}
                height={moderateScale(22)}
                style={styles.closeIcon}
                onPress={() => setShowConfirmModal(false)}
              />

              <Text style={styles.modalText}>
                Do you want to save the updates?
              </Text>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalBtnOutline}
                  onPress={() => setShowConfirmModal(false)}
                >
                  <Text style={styles.modalNo}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    setKidProfile({ name, dob, gender, language });
                    setEditMode(false);
                    setShowConfirmModal(false);
                    navigation.replace('KidProfileView');
                  }}
                >
                  <LinearGradient
                    colors={['#6D5FFD', '#9A4DFF']}
                    style={styles.modalBtnPrimary}
                  >
                    <Text style={styles.modalYes}>Yes</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },

  title: {
    color: '#fff',
    fontSize: fontScale(18),
    fontFamily: fontFamily.bold,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: moderateScale(12),
    paddingHorizontal: spacing.md,
    minHeight: moderateScale(48),
    marginBottom: spacing.sm,
  },

  input: {
    flex: 1,
    color: '#fff',
    fontSize: fontScale(16),
    marginLeft: spacing.sm,
    fontFamily: fontFamily.medium,
  },

  dobText: {
    color: '#fff',
    fontSize: fontScale(16),
    marginLeft: spacing.sm,
    fontFamily: fontFamily.medium,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },

  card: {
    width: '48%',
    minHeight: moderateScale(72),
    borderRadius: moderateScale(14),
    backgroundColor: '#1C1C24',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },

  cardSelected: {
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    backgroundColor: '#24242F',
  },

  cardText: {
    color: '#fff',
    fontSize: fontScale(18),
    fontFamily: fontFamily.medium,
  },

  sectionTitle: {
    color: '#fff',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontSize: fontScale(14),
    fontFamily: fontFamily.semiBold,
  },

  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(14),
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },

  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  settingText: {
    color: '#fff',
    fontSize: fontScale(16),
    marginLeft: spacing.sm,
    fontFamily: fontFamily.medium,
  },

  rowText: {
    color: '#fff',
    fontSize: fontScale(14),
    marginLeft: spacing.sm,
  },

  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CC202E',
    borderWidth: 1,
    borderRadius: moderateScale(14),
    padding: spacing.md,
    marginTop: spacing.md,
  },

  errorText: {
    color: '#CC202E',
    fontSize: fontScale(13),
    marginLeft: spacing.sm,
    fontFamily: fontFamily.regular,
  },

  saveBtn: {
    minHeight: moderateScale(50),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },

  saveText: {
    color: '#fff',
    fontSize: fontScale(16),
    fontFamily: fontFamily.semiBold,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '80%',
    minHeight: moderateScale(200),
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(16),
    padding: spacing.lg,
  },

  closeIcon: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },

  modalText: {
    color: '#fff',
    fontSize: fontScale(18),
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontFamily: fontFamily.semiBold,
  },

  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },

  modalBtnOutline: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6D5FFD',
    borderRadius: moderateScale(12),
    paddingVertical: spacing.md,
    alignItems: 'center',
  },

  modalBtnPrimary: {
    flex: 1,
    borderRadius: moderateScale(12),
    paddingVertical: spacing.md,
    alignItems: 'center',
  },

  modalNo: {
    color: '#6D5FFD',
    fontSize: fontScale(16),
    fontWeight: '600',
  },

  modalYes: {
    color: '#fff',
    fontSize: fontScale(16),
    fontWeight: '600',
  },
});
