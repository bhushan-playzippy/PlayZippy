import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../../../assets/icons/backLeft.svg';
import { ORDERS } from '../../mock/orders.mock';
import { spacing, moderateScale, fontScale } from '../../utils/responsive';

export default function OrdersListScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('OrderDetails', { order: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.cardInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.status}>{item.status}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon width={20} height={20} />
        </Pressable>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={{ width: 20 }} />
      </View>

      {ORDERS.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No Order History!</Text>

          <LinearGradient
            colors={['#6D5FFD', '#9A4DFF']}
            style={styles.exploreBtn}
          >
            <Text style={styles.exploreText}>Explore</Text>
          </LinearGradient>
        </View>
      ) : (
        <FlatList
          data={ORDERS}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
        />
      )}
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

  card: {
    flexDirection: 'row',
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(14),
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  image: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(10),
  },
  cardInfo: {
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: fontScale(16),
    fontWeight: '600',
  },
  status: {
    color: '#8E8E93',
    marginTop: spacing.xs,
  },
  date: {
    color: '#6D6D72',
    fontSize: fontScale(12),
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#8E8E93',
    marginBottom: spacing.lg,
  },
  exploreBtn: {
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: moderateScale(14),
  },
  exploreText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
