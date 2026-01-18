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
import GirlKidIcon from '../../../assets/icons/girlKid.svg';
import BoyKidIcon from '../../../assets/icons/boyKid.svg';
import ArrowRight from '../../../assets/icons/arrow-right.svg';
import AlertIcon from '../../../assets/icons/alert.svg';
import ContentSafetyIcon from '../../../assets/icons/contentSafety.svg';
import ParentingIcon from '../../../assets/icons/parenting.svg';
import XCloseIcon from '../../../assets/icons/x-close.svg';

import { useKidsProfileStore } from '../../store/kidsProfile.store';

/* 🔥 RESPONSIVE UTILS */
import {
  spacing,
  fontScale,
  moderateScale,
  isIOS,
  verticalScale,
  scale,
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
  const contentSafety = useKidsProfileStore(s => s.contentSafety);
  const parenting = useKidsProfileStore(s => s.parenting);

  const setKidProfile = useKidsProfileStore(s => s.setKidProfile);
  const kidProfile = useKidsProfileStore(s => s.kidProfile);
  const editMode = useKidsProfileStore(s => s.editMode);
  const setEditMode = useKidsProfileStore(s => s.setEditMode);
  const [focusedField, setFocusedField] = useState(null);

  const formatDate = date => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${year} ${month} ${day}`;
  };

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Enter name';
    }

    if (!dob) {
      newErrors.dob = 'Select date of birth';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const initialRef = React.useRef(null);

  useEffect(() => {
    if (!editMode || !kidProfile) return;

    const snapshot = {
      name: kidProfile.name ?? '',
      dob: kidProfile.dob ? new Date(kidProfile.dob).toISOString() : null,
      gender: kidProfile.gender ?? 'Girl',
      language: kidProfile.language ?? 'English',
    };

    initialRef.current = snapshot;

    setName(snapshot.name);
    setDob(snapshot.dob ? new Date(snapshot.dob) : null);
    setGender(snapshot.gender);
    setLanguage(snapshot.language);
  }, [editMode, kidProfile]);

  const hasChanges = () => {
    if (!initialRef.current) return false;

    const current = {
      name: name.trim(),
      dob: dob ? dob.toISOString() : null,
      gender,
      language,
    };

    return Object.keys(current).some(
      key => current[key] !== initialRef.current[key],
    );
  };

  const onSave = () => {
    if (!validate()) return;

    // 🟢 Create mode → no modal
    if (!editMode) {
      handleConfirmSave();
      return;
    }

    // 🟡 Edit mode, no changes → just go back
    if (!hasChanges()) {
      navigation.goBack();
      return;
    }

    // 🔴 Edit mode + changes → show modal
    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    setKidProfile({
      name,
      dob: dob ? dob.toISOString() : null,
      gender,
      language,
      parenting,
    });

    setEditMode(false);
    setShowConfirmModal(false);

    navigation.goBack(); // 🔥 NO LAG
  };

  const clearError = field => {
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const getInputStyle = field => [
    styles.inputBox,
    focusedField === field && styles.inputFocused,
    errors[field] && styles.inputError,
  ];

  const getAgeInYears = dobs => {
    if (!dobs) return null;

    const birthDate = dobs instanceof Date ? dobs : new Date(dobs);
    if (isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const age = getAgeInYears(dob);
  const showKidIcons = !dob || (typeof age === 'number' && age <= 5);

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

        <View style={{ top: scale(30) }}>
          <View style={getInputStyle('name')}>
            <UserIcon
              width={24}
              height={24}
              opacity={focusedField === 'name' ? 1 : 0.5}
            />

            <TextInput
              placeholder="Name"
              placeholderTextColor="#8E8E93"
              value={name}
              onChangeText={text => {
                const filtered = text.replace(/[^a-zA-Z\s]/g, '');
                setName(filtered);
                clearError('name');
              }}
              autoCapitalize="words"
              style={styles.inputWithIcon}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          {/* DOB */}
          <TouchableOpacity
            style={[styles.inputBox, errors.dob && styles.inputError]}
            onPress={() => {
              setShowDatePicker(true);
              clearError('dob');
            }}
          >
            <CalendarIcon width={24} height={24} />
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
                  showKidIcons ? (
                    <GirlKidIcon
                      width={moderateScale(32)}
                      height={moderateScale(34.133)}
                    />
                  ) : (
                    <GirlIcon
                      width={moderateScale(32)}
                      height={moderateScale(34.133)}
                    />
                  )
                ) : showKidIcons ? (
                  <BoyKidIcon
                    width={moderateScale(32)}
                    height={moderateScale(34.133)}
                  />
                ) : (
                  <BoyIcon
                    width={moderateScale(32)}
                    height={moderateScale(34.133)}
                  />
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
            onPress={() => navigation.navigate('ContentSafety')}
          >
            <View style={styles.settingLeft}>
              <ContentSafetyIcon
                width={moderateScale(18)}
                height={moderateScale(18)}
              />
              <Text style={styles.settingText}>Content Safety</Text>
              {!!contentSafety.length && (
                <Text style={styles.rowText}>({contentSafety.length})</Text>
              )}
            </View>
            <ArrowRight
              width={moderateScale(24)}
              height={moderateScale(24)}
              alignSelf="center"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingCard}
            onPress={() => navigation.navigate('Parenting')}
          >
            <View style={styles.settingLeft}>
              <ParentingIcon
                width={moderateScale(18)}
                height={moderateScale(18)}
              />
              <Text style={styles.settingText}>Parenting</Text>

              {!!parenting.length && (
                <Text style={styles.rowText}>({parenting.length})</Text>
              )}
            </View>
            <ArrowRight
              width={moderateScale(24)}
              height={moderateScale(24)}
              alignSelf="center"
            />
          </TouchableOpacity>
        </View>

        {/* ERROR */}
        {errors.message && (
          <View style={styles.errorCard}>
            <AlertIcon width={moderateScale(16)} height={moderateScale(16)} />
            <Text style={styles.errorText}>{errors.message}</Text>
          </View>
        )}

        {/* SAVE */}
        <View style={styles.fixedBottom}>
          {Object.keys(errors).length > 0 && (
            <View style={styles.fixedErrorBox}>
              <AlertIcon width={16} height={16} />
              <Text style={styles.fixedErrorText}>
                {errors.name || errors.dob}
              </Text>
            </View>
          )}

          <TouchableOpacity onPress={onSave}>
            <LinearGradient
              colors={['#667AFF', '#9324F0', '#4010AB']}
              locations={[0.0128, 0.5002, 0.9876]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.52 }}
              style={styles.fixedSaveBtn}
            >
              <Text style={styles.fixedSaveText}>
                {editMode ? 'Update' : 'Save'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

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
              <View style={styles.modalTextWrapper}>
                <Text style={styles.modalText}>Do you want to save the</Text>
                <Text style={styles.modalText}>updates?</Text>
              </View>
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
                    setKidProfile({
                      name,
                      dob: dob instanceof Date ? dob.toISOString() : dob,
                      gender,
                      language,
                      parenting,
                    });

                    setEditMode(false);
                    setShowConfirmModal(false);
                    navigation.replace('KidProfileView');
                  }}
                >
                  <LinearGradient
                    colors={['#667AFF', '#9324F0', '#4010AB']}
                    locations={[0.0128, 0.5002, 0.9876]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.52 }}
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
    // justifyContent: 'space-between',
    gap: spacing.md,
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
    gap: spacing.sm,
    height: verticalScale(48),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#1A1920',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  inputWithIcon: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: fontScale(15),
    paddingVertical: isIOS ? spacing.sm : spacing.xs,
  },

  inputFocused: {
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
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
    height: verticalScale(56),
    paddingHorizontal: spacing.md,
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
    fontSize: fontScale(16),
    fontFamily: fontFamily.bold,
  },

  settingCard: {
    flexDirection: 'row',
    height: verticalScale(52),
    justifyContent: 'space-between',
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(14),
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginTop: verticalScale(12),
  },

  fixedBottom: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: isIOS ? verticalScale(24) : verticalScale(16),
  },

  fixedErrorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(48),
    borderRadius: moderateScale(12),
    borderWidth: 1.5,
    borderColor: '#CC202E',
    backgroundColor: 'rgba(204, 32, 46, 0.1)',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },

  fixedErrorText: {
    color: '#FF4D4F',
    fontSize: fontScale(14),
    marginLeft: spacing.sm,
    fontFamily: fontFamily.semiBold,
  },

  fixedSaveBtn: {
    width: scale(348),
    height: verticalScale(48),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  fixedSaveText: {
    color: '#FFFFFF',
    fontSize: fontScale(18),
    fontFamily: fontFamily.semiBold,
  },

  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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

  inputError: {
    borderColor: '#FF4D4F',
    borderWidth: 1,
  },

  errorContainer: {
    borderWidth: 1,
    borderColor: '#CC202E',
    borderRadius: 12,
    marginBottom: 8,
    height: verticalScale(48),
    justifyContent: 'center',
    paddingTop: spacing.xs,
  },
  relationErrorBox: {
    borderWidth: 1,
    borderColor: '#FF4D4F',
    borderRadius: moderateScale(12),
    padding: spacing.xs,
  },

  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CC202E',
    borderWidth: 1,
    borderRadius: moderateScale(14),
    padding: spacing.md,
    marginTop: verticalScale(12),
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
    width: '90%',
    minHeight: moderateScale(235),
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(16),
    padding: spacing.lg,
  },
  modalTextWrapper: {
    paddingVertical: spacing.xxl, // 8
    paddingHorizontal: spacing.md, // 16
    alignItems: 'center',
  },

  closeIcon: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },

  modalText: {
    color: '#FFFFFF',
    fontSize: fontScale(18),
    lineHeight: fontScale(26),
    fontFamily: fontFamily.regular,
    textAlign: 'center',
  },

  modalActions: {
    flexDirection: 'row',
    gap: spacing.md,
    top: verticalScale(10),
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
    fontFamily: fontFamily.medium,
  },

  modalYes: {
    color: '#fff',
    fontSize: fontScale(16),
    fontFamily: fontFamily.medium,
  },
});
