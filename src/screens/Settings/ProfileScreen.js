import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BackLeft from '../../../assets/icons/backLeft.svg';
import { useProfileStore } from '../../store/profile.store';
import RelationItem from '../../components/RelationItem';
import { colors } from '../../theme/colors';
import UserIcon from '../../../assets/icons/user.svg';
import MailIcon from '../../../assets/icons/mail.svg';
import PhoneIcon from '../../../assets/icons/phone.svg';
import EditIcon from '../../../assets/icons/editprofile.svg';
import { fontFamily } from '../../theme/typography';
import XClose from '../../../assets/icons/x-close.svg';
import {
  scale,
  verticalScale,
  fontScale,
  moderateScale,
  spacing,
  isIOS,
} from '../../utils/responsive';

export default function ProfileScreen() {
  const navigation = useNavigation();

  /* ---------------- Zustand Store ---------------- */
  const {
    profile,
    mode,
    setMode,
    createProfile,
    updateProfile,
    isDirty,
    setDirty,
    showConfirmModal,
    openConfirmModal,
    closeConfirmModal,
  } = useProfileStore();

  /* ---------------- Local State ---------------- */
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [mobile, setMobile] = useState(profile?.mobile || '');
  const [relation, setRelation] = useState(profile?.relation || null);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});

  /* ---------------- Initial Mode ---------------- */
  useEffect(() => {
    if (!profile) {
      setMode('create');
    } else {
      setMode('view');
    }
  }, [profile, setMode]);

  const clearError = field => {
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  /* ---------------- Dirty Tracking ---------------- */
  useEffect(() => {
    if (mode !== 'view') {
      setDirty(true);
    }
  }, [name, email, relation, mode, setDirty]);

  /* ---------------- Back Guard ---------------- */
  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', e => {
      if (!isDirty || mode === 'view') return;

      e.preventDefault();
      openConfirmModal();
    });
    return unsub;
  }, [isDirty, mode, navigation, openConfirmModal]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Enter name';
    }

    if (!email.trim()) {
      newErrors.email = 'Enter email';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter valid email';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Enter phone number';
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      newErrors.mobile = 'Enter valid phone number';
    }

    if (!relation) {
      newErrors.relation = 'Select relation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (
      name.trim() &&
      /^\S+@\S+\.\S+$/.test(email) &&
      /^[0-9]{10}$/.test(mobile) &&
      relation
    ) {
      setErrors({});
    }
  }, [name, email, mobile, relation]);

  /* ---------------- Save ---------------- */
  const handleSave = () => {
    if (!validate()) return;

    const data = { name, email, mobile, relation };

    profile ? updateProfile(data) : createProfile(data);

    closeConfirmModal();
    setDirty(false);
    setMode('view');
  };

  const getInputStyle = field => [
    styles.inputBox,
    focusedField === field && styles.inputFocused,
    errors[field] && styles.inputError,
  ];

  /* ================================================= */
  /* =================== RENDER ====================== */
  /* ================================================= */

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        {/* ---------------- Header ---------------- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackLeft width={24} height={24} fill="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>My Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* ================= VIEW MODE ================= */}
        {mode === 'view' && profile && (
          <View style={styles.viewContainer}>
            <View style={styles.profileTop}>
              <View style={styles.avatar} />
              <Text style={styles.relationText}>{profile.relation}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{profile.name}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{profile.email}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Mobile Number</Text>
              <Text style={styles.value}>{mobile}</Text>
            </View>

            <TouchableOpacity
              style={styles.outlineBtn}
              onPress={() => setMode('edit')}
            >
              <EditIcon width={16} height={16} />
              <Text style={styles.outlineBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ================= CREATE / EDIT ================= */}
        {mode !== 'view' && (
          <View style={styles.form}>
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

            <View style={getInputStyle('email')}>
              <MailIcon
                width={24}
                height={24}
                opacity={focusedField === 'email' ? 1 : 0.5}
              />
              <TextInput
                placeholder="E Mail"
                placeholderTextColor="#8E8E93"
                value={email}
                onChangeText={text => {
                  const filtered = text.replace(/[^a-zA-Z0-9@._-]/g, '');
                  setEmail(filtered);
                  clearError('email');
                }}
                style={styles.inputWithIcon}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <View style={getInputStyle('mobile')}>
              <PhoneIcon
                width={24}
                height={24}
                opacity={focusedField === 'mobile' ? 1 : 0.5}
              />
              <TextInput
                value={mobile}
                onChangeText={text => {
                  const digitsOnly = text.replace(/[^0-9]/g, '').slice(0, 10);
                  setMobile(digitsOnly);
                  clearError('mobile');
                }}
                placeholder="99999 88888"
                placeholderTextColor="#8E8E93"
                keyboardType="phone-pad"
                style={styles.inputWithIcon}
                onFocus={() => setFocusedField('mobile')}
                onBlur={() => setFocusedField(null)}
              />
            </View>

            <View
              style={[
                styles.relationGrid,
                errors.relation && styles.relationErrorBox,
              ]}
            >
              {/* Row 1 */}
              <View style={styles.relationRow}>
                <RelationItem
                  label="Dad"
                  selected={relation === 'Dad'}
                  onPress={() => {
                    setRelation('Dad');
                    clearError('Dad');
                  }}
                />
                <RelationItem
                  label="Mom"
                  selected={relation === 'Mom'}
                  onPress={() => {
                    setRelation('Mom');
                    clearError('Mom');
                  }}
                />
              </View>

              {/* Row 2 */}
              <View style={styles.relationRow}>
                <RelationItem
                  label="Grandfather"
                  selected={relation === 'Grandfather'}
                  onPress={() => {
                    setRelation('Grandfather');
                    clearError('Grandfather');
                  }}
                />
                <RelationItem
                  label="Grandmother"
                  selected={relation === 'Grandmother'}
                  onPress={() => {
                    setRelation('Grandmother');
                    clearError('Grandmother');
                  }}
                />
              </View>

              {/* Row 3 */}
              <RelationItem
                label="Guardian"
                fullWidth
                selected={relation === 'Guardian'}
                onPress={() => {
                  setRelation('Guardian');
                  clearError('Guardian');
                }}
              />
            </View>

            <View style={styles.saveWrapper}>
              {Object.keys(errors).length > 0 && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    !{' '}
                    {errors.name ||
                      errors.email ||
                      errors.mobile ||
                      errors.relation}
                  </Text>
                </View>
              )}

              <TouchableOpacity onPress={handleSave}>
                <LinearGradient
                  colors={['#667AFF', '#9324F0', '#4010AB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.primaryBtn]}
                >
                  <Text style={styles.primaryBtnText}>
                    {profile ? 'Update' : 'Save'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ================= CONFIRM MODAL ================= */}
        <Modal visible={showConfirmModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <TouchableOpacity style={styles.modalClose} />

              <Text style={styles.modalText}>
                Do you want to save the changes?
              </Text>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalNoBtn}>
                  <Text style={styles.modalNoText}>No</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1 }}>
                  <LinearGradient style={styles.modalYesBtn}>
                    <Text style={styles.modalYesText}>Yes</Text>
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

/* ================================================= */
/* =================== STYLES ====================== */
/* ================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },

  /* ---------------- Header ---------------- */
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

  inputFocused: {
    borderColor: '#FFFFFF',
    borderWidth: 1.5,
  },

  inputError: {
    borderColor: '#FF4D4F',
    borderWidth: 1,
  },

  modalClose: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontSize: fontScale(18),
    fontFamily: fontFamily.medium,
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

  errorText: {
    color: '#FF4D4F',
    fontSize: fontScale(14),
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    fontFamily: fontFamily.semiBold,
  },

  /* ---------------- View Mode ---------------- */
  viewContainer: {
    marginTop: spacing.lg,
  },
  profileTop: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: scale(110),
    height: scale(110),
    borderRadius: scale(55),
    backgroundColor: '#2C2C2E',
    marginBottom: spacing.sm,
  },
  relationText: {
    color: '#fff',
    fontSize: fontScale(16),
    fontWeight: '600',
  },

  infoRow: {
    marginBottom: spacing.lg,
  },
  label: {
    color: '#8E8E93',
    fontSize: fontScale(12),
    marginBottom: spacing.xs,
  },
  value: {
    color: '#fff',
    fontSize: fontScale(15),
  },

  outlineBtn: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#6D5FFD',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // 🔥 spacing between icon & text
  },

  outlineBtnText: {
    color: '#6D5FFD',
    fontSize: fontScale(15),
    fontWeight: '600',
  },

  /* ---------------- Form ---------------- */
  form: {
    marginTop: spacing.lg,
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

  disabledInput: {
    opacity: 0.6,
  },

  relationGrid: {
    marginTop: spacing.md,
  },
  relationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },

  saveWrapper: {
    // marginTop: spacing.xxl,
    top: moderateScale(120),
    marginBottom: isIOS ? spacing.xl : spacing.lg,
  },

  primaryBtn: {
    height: verticalScale(50),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: fontScale(16),
    fontFamily: fontFamily.semiBold,
  },

  /* ---------------- Modal ---------------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: scale(343), // 375 - 16 - 16
    backgroundColor: '#1A1920',
    borderRadius: moderateScale(16),
    paddingHorizontal: spacing.lg, // 16
    paddingTop: verticalScale(72),
    paddingBottom: spacing.lg,
  },

  modalText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: fontScale(18),
    lineHeight: fontScale(26),
    fontFamily: fontFamily.regular,
    paddingVertical: spacing.sm, // 8
  },

  modalActions: {
    flexDirection: 'row',
    marginTop: verticalScale(21),
    gap: spacing.lg, // 16
  },

  modalNoBtn: {
    flex: 1,
    height: verticalScale(48),
    borderRadius: moderateScale(14),
    borderWidth: 1.5,
    borderColor: '#6D5FFD',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modalNoText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.medium,
  },

  modalYesBtn: {
    flex: 1,
    height: verticalScale(48),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalYesText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.semiBold,
  },
});
