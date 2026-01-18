import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CashIcon from '../../../assets/icons/cash.svg'; // replace with your icon
import DownloadIcon from '../../../assets/icons/download.svg'; // replace with your icon

import { spacing, fontScale, moderateScale } from '../../utils/responsive';
import { fontFamily } from '../../theme/typography';

export default function PaymentDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      {/* ROWS */}
      <Row label="MRP" value="₹6,999.00" />
      <Row label="Discount" value="-₹2,000.00" negative />

      <Divider />

      <Row label="Discounted Price" value="₹4,999.00" />

      <Divider />

      <Row label="Delivery Charge" value="₹400.00" />
      <Row label="Coupon" value="-₹200.00" negative />

      <Divider />

      <Row label="Total" value="₹5,199.00" bold />

      {/* PAYMENT MODE */}
      <View style={styles.paidBox}>
        <CashIcon width={18} height={18} />
        <Text style={styles.paidText}>Paid by cash</Text>
      </View>

      {/* INVOICE */}
      <View style={styles.invoiceRow}>
        <Text style={styles.invoiceText}>Get Invoice</Text>
        <DownloadIcon width={18} height={18} />
      </View>
    </View>
  );
}

/* ---------------- ROW COMPONENT ---------------- */

const Row = ({ label, value, bold, negative }) => (
  <View style={styles.row}>
    <Text style={[styles.label, bold && styles.boldText]}>{label}</Text>

    <Text
      style={[
        styles.value,
        bold && styles.boldText,
        negative && styles.negative,
      ]}
    >
      {value}
    </Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121216',
    borderRadius: moderateScale(16),
    padding: spacing.lg,
    marginTop: spacing.lg,
  },

  title: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.semiBold,
    marginBottom: spacing.md,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  label: {
    color: '#8E8E93',
    fontSize: fontScale(14),
    fontFamily: fontFamily.medium,
  },

  value: {
    color: '#FFFFFF',
    fontSize: fontScale(14),
    fontFamily: fontFamily.regular,
  },

  boldText: {
    color: '#FFFFFF',
    fontFamily: fontFamily.bold,
  },

  negative: {
    color: '#B0B0B5',
  },

  divider: {
    height: 1,
    backgroundColor: '#2C2C2E',
    marginVertical: spacing.sm,
  },

  paidBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(12),
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },

  paidText: {
    color: '#FFFFFF',
    fontSize: fontScale(14),
    marginLeft: spacing.sm,
    fontFamily: fontFamily.semiBold,
  },

  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  invoiceText: {
    color: '#FFFFFF',
    fontSize: fontScale(14),
    marginRight: spacing.xs,
    fontFamily: fontFamily.semiBold,
  },
});
