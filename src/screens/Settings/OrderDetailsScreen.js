import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import PaymentDetails from './PaymentDetails';
import BackIcon from '../../../assets/icons/backLeft.svg';
import { spacing, fontScale, moderateScale } from '../../utils/responsive';

export default function OrderDetailsScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { order } = params;

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon width={20} height={20} />
        </Pressable>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{ width: 20 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* PRODUCT */}
        <Text style={styles.product}>{order.title}</Text>
        <Text style={styles.orderId}>Order ID: {order.id}</Text>

        {/* TIMELINE */}
        <View style={styles.card}>
          {order.timeline.map((step, index) => (
            <View key={index} style={styles.timelineRow}>
              <View style={styles.dot} />
              <View>
                <Text style={styles.timelineText}>{step.label}</Text>
                <Text style={styles.timelineDate}>{step.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* SHIPPING */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Shipping Details</Text>
          <Text style={styles.text}>{order.shipping.name}</Text>
          <Text style={styles.text}>{order.shipping.address}</Text>
          <Text style={styles.text}>{order.shipping.phone}</Text>
        </View>

        {/* PAYMENT */}
        <PaymentDetails />

        <LinearGradient
          colors={['#6D5FFD', '#9A4DFF']}
          style={styles.invoiceBtn}
        >
          <Text style={styles.invoiceText}>Get Invoice</Text>
        </LinearGradient>
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
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
    fontSize: fontScale(18),
    fontWeight: '700',
  },

  product: {
    color: '#FFF',
    fontSize: fontScale(18),
    fontWeight: '600',
    marginTop: spacing.md,
  },
  orderId: {
    color: '#8E8E93',
    marginBottom: spacing.lg,
  },

  card: {
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(14),
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  sectionTitle: {
    color: '#FFF',
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  text: {
    color: '#CCC',
    marginBottom: spacing.xs,
  },

  timelineRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CFF',
    marginRight: spacing.md,
    marginTop: 6,
  },
  timelineText: {
    color: '#FFF',
    fontWeight: '500',
  },
  timelineDate: {
    color: '#8E8E93',
    fontSize: fontScale(12),
  },

  invoiceBtn: {
    height: moderateScale(50),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  invoiceText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
