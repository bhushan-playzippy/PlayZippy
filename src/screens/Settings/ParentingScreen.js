import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useKidsProfileStore } from '../../store/kidsProfile.store';
// SVGs (use your actual filenames)
import BackIcon from '../../../assets/icons/backLeft.svg';
import CheckIcon from '../../../assets/icons/check.svg';
import ParentingIcon from '../../../assets/icons/parenting.svg';
import CrossSearchBar from '../../../assets/icons/crossSearchBar.svg';
import { fontFamily } from '../../theme/typography';

const DATA = [
  'Amazing experience',
  'Works fine, but could use more',
  'Great content',
  'Too slow — needs better performance',
  'A search bar would be really helpful.',
  'Notifications need more control',
  'Comedy',
  'Cool Jazz',
  'Co worker',
  'Conspiracy',
  'Cozy Mystery',
];

export default function ParentingScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(parenting ?? []);

  const [query, setQuery] = useState('');

  const parenting = useKidsProfileStore(state => state.parenting);
  const setParenting = useKidsProfileStore(state => state.setParenting);

  useEffect(() => {
    if (parenting?.length) {
      setSelected(parenting);
    }
  }, [parenting]);

  /* ---------------- FILTERED LIST ---------------- */
  const filteredData = useMemo(() => {
    const base = query.trim()
      ? DATA.filter(item => item.toLowerCase().includes(query.toLowerCase()))
      : DATA;

    return [
      ...base.filter(item => selected.includes(item)),
      ...base.filter(item => !selected.includes(item)),
    ];
  }, [query, selected]);

  const isEmpty = filteredData.length === 0;

  const toggleSelect = item => {
    setSelected(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      }
      return [...prev, item];
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setParenting(selected);
    });

    return unsubscribe;
  }, [navigation, selected, setParenting]);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            setParenting(selected);
            navigation.goBack();
          }}
        >
          <BackIcon width={moderateScale(24)} height={moderateScale(24)} />
        </Pressable>

        <Text style={styles.title}>Parenting</Text>
      </View>

      <View style={styles.subtitleContainer}>
        <ParentingIcon width={moderateScale(24)} height={moderateScale(24)} />
        <Text style={styles.subtitle}>
          Personalize content with values of your choice!
        </Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Write here..."
          placeholderTextColor="#8E8E93"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />

        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <CrossSearchBar width={16} height={16} />
          </Pressable>
        )}
      </View>

      {isEmpty && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptySub}>
            Try searching with a different keyword
          </Text>
        </View>
      )}

      {/* LIST */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item}-${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item);
          return (
            <Pressable
              onPress={() => toggleSelect(item)}
              style={[styles.optionCard, isSelected && styles.optionSelected]}
            >
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <CheckIcon width={12} height={12} />}
              </View>

              <Text style={styles.optionText}>{item}</Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
    paddingHorizontal: scale(16),
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingVertical: verticalScale(16),
  },

  title: {
    color: '#E6E6E6',
    fontSize: fontScale(18),
    fontFamily: fontFamily.bold,
  },

  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
    gap: scale(8),
  },

  subtitle: {
    color: '#fff',
    fontSize: fontScale(14),
    marginTop: verticalScale(2),
    paddingLeft: scale(4),
    fontFamily: fontFamily.medium,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(14),
    height: verticalScale(46),
    marginBottom: verticalScale(16),
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.semiBold,
  },

  emptyState: {
    alignItems: 'center',
    marginTop: verticalScale(60),
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.semiBold,
  },

  emptySub: {
    color: '#8E8E93',
    fontSize: fontScale(13),
    marginTop: verticalScale(6),
  },

  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),

    alignSelf: 'flex-start', // 🔥 KEY POINT
    maxWidth: '100%', // prevents overflow

    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(12),

    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(14),

    marginBottom: verticalScale(12),
  },

  optionSelected: {
    backgroundColor: '#24242F',
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },

  radio: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    borderWidth: 1.5,
    borderColor: '#3A3A3C',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  radioSelected: {
    backgroundColor: '#34C759', // iOS green
    borderColor: '#34C759',
  },

  optionText: {
    color: '#FFFFFF',
    fontSize: fontScale(14),
    flexShrink: 1,
    fontFamily: fontFamily.medium,
  },

  saveBtn: {
    height: verticalScale(50),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(16),
  },

  saveText: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontFamily: fontFamily.semiBold,
  },
});
