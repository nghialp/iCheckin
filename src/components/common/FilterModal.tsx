import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon';

interface Filter {
  types: string[];
  distance: number | null;
  rating: number | null;
  isOpenNow: boolean;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Filter) => void;
  onReset: () => void;
  initialFilters: Filter;
}

const PLACE_TYPES = ['Food', 'Hotel', 'Museum', 'Park', 'Cafe', 'Restaurant', 'Bar', 'Shop'];
const DISTANCE_OPTIONS = [
  { label: '< 1 km', value: 1 },
  { label: '< 5 km', value: 5 },
  { label: '< 10 km', value: 10 },
];
const RATING_OPTIONS = [1, 2, 3, 4, 5];

export default function FilterModal({
  visible,
  onClose,
  onApply,
  onReset,
  initialFilters,
}: FilterModalProps) {
  const insets = useSafeAreaInsets();
  const [tempFilters, setTempFilters] = useState<Filter>(initialFilters);

  const handleSelectType = (type: string) => {
    setTempFilters((prev) => {
      const types = prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type];
      return { ...prev, types };
    });
  };

  const handleSelectDistance = (distance: number) => {
    setTempFilters((prev) => ({
      ...prev,
      distance: prev.distance === distance ? null : distance,
    }));
  };

  const handleSelectRating = (rating: number) => {
    setTempFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }));
  };

  const handleApply = () => {
    onApply(tempFilters);
  };

  const handleReset = () => {
    setTempFilters({
      types: [],
      distance: null,
      rating: null,
      isOpenNow: false,
    });
    onReset();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Filter</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Theme Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Theme</Text>
            <View style={styles.typesContainer}>
              {PLACE_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    tempFilters.types.includes(type) && styles.typeButtonActive,
                  ]}
                  onPress={() => handleSelectType(type)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      tempFilters.types.includes(type) && styles.typeTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Distance Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distance</Text>
            <View style={styles.optionsContainer}>
              {DISTANCE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionButton,
                    tempFilters.distance === option.value && styles.optionButtonActive,
                  ]}
                  onPress={() => handleSelectDistance(option.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      tempFilters.distance === option.value && styles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rating Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rating</Text>
            <View style={styles.ratingContainer}>
              {RATING_OPTIONS.map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.ratingButton,
                    tempFilters.rating === rating && styles.ratingButtonActive,
                  ]}
                  onPress={() => handleSelectRating(rating)}
                >
                  <Icon
                    name={tempFilters.rating === rating ? 'star' : 'star-outline'}
                    size={24}
                    color={tempFilters.rating === rating ? '#FFB800' : '#ddd'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Status Section */}
          <View style={styles.section}>
            <View style={styles.statusRow}>
              <Text style={styles.sectionTitle}>Status</Text>
              <Switch
                value={tempFilters.isOpenNow}
                onValueChange={(value) =>
                  setTempFilters((prev) => ({ ...prev, isOpenNow: value }))
                }
                trackColor={{ false: '#ddd', true: '#81C784' }}
                thumbColor={tempFilters.isOpenNow ? '#fff' : '#f1f1f1'}
              />
            </View>
            <Text style={styles.statusLabel}>Open Now</Text>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  typeButtonActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  typeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  typeTextActive: {
    color: '#fff',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionButtonActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  optionText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  ratingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  ratingButtonActive: {
    backgroundColor: '#fffbf0',
    borderColor: '#FFB800',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066CC',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#0066CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
