import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from '../utils/responsive';

export default function Radio({ selected }) {
  return (
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );
}

const styles = StyleSheet.create({
  // radio button
  radioOuter: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    borderWidth: scale(2),
    borderColor: '#3A3A3C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioOuterSelected: {
    borderColor: '#FFFFFF',
  },

  radioInner: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: '#FFFFFF',
  },
});
