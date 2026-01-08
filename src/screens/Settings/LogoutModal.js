import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import LogoutIcon from '../../../assets/icons/logout.svg';
import CloseIcon from '../../../assets/icons/x-close.svg';

import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
  spacing,
} from '../../utils/responsive';

export default function LogoutModal({ visible, onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Close */}
          <TouchableOpacity style={styles.closeBtn} onPress={onCancel}>
            <CloseIcon width={scale(18)} height={scale(18)} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconWrapper}>
            <LogoutIcon width={scale(28)} height={scale(28)} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Log Out</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Do you want to logout from your account?
          </Text>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.outlineBtn} onPress={onConfirm}>
              <Text style={styles.outlineText}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1 }} onPress={onCancel}>
              <LinearGradient
                colors={['#667AFF', '#9324F0', '#4010AB']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryText}>No</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: scale(300),
    borderRadius: moderateScale(20),
    backgroundColor: '#1C1C24',
    padding: spacing.xl,
    alignItems: 'center',
  },

  closeBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },

  iconWrapper: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: '#24242F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  title: {
    color: '#FFFFFF',
    fontSize: fontScale(18),
    fontWeight: '700',
    marginBottom: spacing.sm,
  },

  subtitle: {
    color: '#8E8E93',
    fontSize: fontScale(14),
    textAlign: 'center',
    marginBottom: spacing.lg,
  },

  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },

  outlineBtn: {
    flex: 1,
    height: verticalScale(44),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#6D5FFD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  outlineText: {
    color: '#6D5FFD',
    fontSize: fontScale(14),
    fontWeight: '600',
  },

  primaryBtn: {
    height: verticalScale(44),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: fontScale(14),
    fontWeight: '600',
  },
});
