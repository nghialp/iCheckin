import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import en from './locales/en.json';
import vi from './locales/vi.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
};

// Lấy locale đầu tiên từ thiết bị
const locales = getLocales();
const deviceLanguage = locales[0]?.languageCode || 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage, // ngôn ngữ mặc định theo thiết bị
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;