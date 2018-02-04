import ReactNative from 'react-native';
const { NativeModules } = require('react-native');
const { RNI18n } = NativeModules;
import I18n from 'react-native-i18n';

// Import all locales
import en from './../../locales/en.json';
import de from './../../locales/de.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  de
};

const currentLocale = I18n.currentLocale();

// The method we'll use instead of a regular string
export function t(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;
