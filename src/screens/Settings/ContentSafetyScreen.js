/* eslint-disable react-native/no-inline-styles */
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
import Radio from '../../components/Radio';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useKidsProfileStore } from '../../store/kidsProfile.store';

// SVGs (use your actual filenames)
import BackIcon from '../../../assets/icons/backLeft.svg';
import PentagonIcon from '../../../assets/icons/pentagon.svg';
import CrossSearchBar from '../../../assets/icons/crossSearchBar.svg';
import { fontFamily } from '../../theme/typography';

const DATA = [
  'Amazing experience',
  'Adult Content',
  'Racism',
  'Vulgar Language',
  'Violence',
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

export default function ContentSafetyScreen() {
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(contentSafety ?? []);
  const [showRestrictedError, setShowRestrictedError] = useState(false);

  const contentSafety = useKidsProfileStore(state => state.contentSafety);
  const setContentSafety = useKidsProfileStore(state => state.setContentSafety);
  const restrictedWords = useKidsProfileStore(state => state.restrictedWords);

  useEffect(() => {
    if (contentSafety?.length) {
      setSelected(contentSafety);
    }
  }, [contentSafety]);

  /* ---------------- FILTERED LIST ---------------- */
  const filteredData = useMemo(() => {
    const base = query.trim()
      ? DATA.filter(item => item.toLowerCase().includes(query.toLowerCase()))
      : DATA;

    const unique = Array.from(new Set(base));

    return [
      ...unique.filter(item => selected.includes(item)),
      ...unique.filter(item => !selected.includes(item)),
    ];
  }, [query, selected]);

  const isEmpty = filteredData.length === 0;

  const toggleSelect = item => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item],
    );
  };

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', () => {
      setContentSafety(selected);
    });

    return unsub;
  }, [navigation, selected, setContentSafety]);
  useEffect(() => {
    setShowRestrictedError(false);
  }, [query]);

  const renderItem = ({ item }) => {
    const isSelected = selected.includes(item);
    const isRestricted = restrictedWords.includes(item);

    return (
      <View style={styles.rowWrapper}>
        <Pressable
          onPress={() => {
            if (isRestricted) {
              setShowRestrictedError(true);
              return;
            }

            setShowRestrictedError(false);
            toggleSelect(item);
          }}
          style={[
            styles.optionCard,
            isSelected && styles.optionSelected,
            isRestricted && styles.optionRestricted,
          ]}
        >
          {/* RADIO — hidden for restricted */}
          {!isRestricted && <Radio selected={isSelected} />}

          <Text
            style={[
              styles.optionText,
              (isSelected || isRestricted) && styles.optionTextStrike,
              isRestricted && styles.optionTextRestricted,
            ]}
          >
            {item}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            setContentSafety(selected);
            navigation.goBack();
          }}
        >
          <BackIcon width={20} height={20} />
        </Pressable>
        <Text style={styles.title}>Content Safety</Text>

        <View style={{ width: 20 }} />
      </View>

      <View style={styles.subtitleContainer}>
        <PentagonIcon width={16} height={16} style={{ marginTop: 4 }} />
        <Text style={styles.subtitle}>
          Protect your child from unwanted content!
        </Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        {/* <SearchIcon width={16} height={16} /> */}

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
        contentContainerStyle={{
          paddingBottom: verticalScale(24),
        }}
        renderItem={renderItem}
      />
      {showRestrictedError && (
        <View style={styles.restrictedBox}>
          <Text style={styles.restrictedText}>
            ! Restricted words by Wippi!
          </Text>
        </View>
      )}
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
    fontWeight: '700',
    fontFamily: fontFamily.bold,
  },

  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(10),
  },

  subtitle: {
    color: '#fff',
    fontSize: fontScale(14),
    marginTop: verticalScale(2),
    fontWeight: '500',
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

  restrictedBox: {
    height: verticalScale(48),
    borderRadius: moderateScale(12),
    borderWidth: 1.5,
    borderColor: '#CC202E',
    backgroundColor: 'rgba(204,32,46,0.1)',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(16),
  },

  optionRestricted: {
    opacity: 0.65,
    borderWidth: 1,
    // borderColor: '#CC202E',
  },

  radioRestricted: {
    borderColor: '#3A3A3C',
  },

  restrictedText: {
    color: '#FF4D4F',
    fontSize: fontScale(14),
    fontFamily: fontFamily.semiBold,
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
  },

  emptyState: {
    alignItems: 'center',
    marginTop: verticalScale(60),
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontWeight: '600',
    fontFamily: fontFamily.semiBold,
  },

  emptySub: {
    color: '#8E8E93',
    fontSize: fontScale(13),
    marginTop: verticalScale(6),
    fontFamily: fontFamily.regular,
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

  textStrike: {
    textDecorationLine: 'line-through',
  },
  restrictedCard: {
    borderWidth: 1,
    borderColor: '#3A3A3C',
    backgroundColor: '#18181D',
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
    backgroundColor: '#fff',
    borderColor: '#000',
  },

  optionText: {
    color: '#FFFFFF',
    fontSize: fontScale(14),
    fontFamily: fontFamily.medium,

    flexShrink: 1, // 🔥 allows wrapping
  },

  optionTextStrike: {
    textDecorationLine: 'line-through',
  },

  optionTextRestricted: {
    color: '#8E8E93',
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
