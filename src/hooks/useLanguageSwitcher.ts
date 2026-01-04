// src/hooks/useLanguageSwitcher.ts
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'appLanguage';

export function useLanguageSwitcher() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);

  // Load ngôn ngữ đã lưu khi khởi động
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLang && savedLang !== i18n.language) {
        await i18n.changeLanguage(savedLang);
        setLanguage(savedLang);
      }
    };
    loadLanguage();
  }, []);

  // Hàm đổi ngôn ngữ
  const switchLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    setLanguage(lng);
  };

  return { language, switchLanguage };
}