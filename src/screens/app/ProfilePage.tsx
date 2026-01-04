import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguageSwitcher } from '../../hooks/useLanguageSwitcher';

export default function ProfilePage() {
  const { language, switchLanguage } = useLanguageSwitcher();

  return (
    <View style={{ padding: 16 }}>
      <Text>Current language: {language}</Text>

      <TouchableOpacity
        style={{ marginTop: 12, padding: 10, backgroundColor: '#eee' }}
        onPress={() => switchLanguage('vi')}
      >
        <Text>🇻🇳 Tiếng Việt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 12, padding: 10, backgroundColor: '#eee' }}
        onPress={() => switchLanguage('en')}
      >
        <Text>🇺🇸 English</Text>
      </TouchableOpacity>
    </View>
  );
}