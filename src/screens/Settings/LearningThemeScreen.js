import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
  Keyboard,
  Platform,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  fontScale,
} from '../../utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useKidsProfileStore } from '../../store/kidsProfile.store';
// SVGs (use your actual filenames)
import BackIcon from '../../../assets/icons/backLeft.svg';
import CheckIcon from '../../../assets/icons/check.svg';
import PentagonIcon from '../../../assets/icons/pentagon.svg';
import CrossSearchBar from '../../../assets/icons/crossSearchBar.svg';

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

export default function LearningThemeScreen() {
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [query, setQuery] = useState('');
  const storedLearningThemes = useKidsProfileStore(
    state => state.learningThemes,
  );

  const [selected, setSelected] = useState(storedLearningThemes || []);

  const setListLearning = useKidsProfileStore(state => state.setListLearning);

  useEffect(() => {
    if (storedLearningThemes?.length) {
      setSelected(storedLearningThemes);
    }
  }, [storedLearningThemes]);

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
  const canSave = selected.length > 0;

  const toggleSelect = item => {
    setSelected(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      }
      return [...prev, item];
    });
  };

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true),
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon width={20} height={20} />
        </Pressable>
        <Text style={styles.title}>Learning Themes</Text>

        <View style={{ width: 20 }} />
      </View>

      <View style={styles.subtitleContainer}>
        <PentagonIcon width={16} height={16} style={{ marginTop: 4 }} />
        <Text style={styles.subtitle}>
          Help us know about your kids interest!
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
        contentContainerStyle={{ paddingBottom: 24 }}
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

      {!keyboardVisible && (
        <Pressable
          disabled={!canSave}
          onPress={() => {
            console.log('Selected guardrails:', selected);
            setListLearning(selected);
            navigation.goBack();
          }}
        >
          <LinearGradient
            colors={['#6D5FFD', '#9A4DFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.saveBtn, !canSave && { opacity: 0.5 }]}
          >
            <Text style={styles.saveText}>Save</Text>
          </LinearGradient>
        </Pressable>
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
    fontWeight: '600',
  },

  emptyState: {
    alignItems: 'center',
    marginTop: verticalScale(60),
  },

  emptyTitle: {
    color: '#FFFFFF',
    fontSize: fontScale(16),
    fontWeight: '600',
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
    backgroundColor: '#1C1C24',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(16),
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
    fontWeight: '600',
  },
});
