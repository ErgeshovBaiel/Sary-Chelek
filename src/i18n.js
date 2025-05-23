import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./locales/en/en.json";
import ru from "./locales/ru/ru.json";
import kg from "./locales/kg/kg.json";


const resources = {
  en: {
    translation: en
  },
  ru: {
    translation: ru
  },
  kg: {
    translation: kg
  },
};

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources, 
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

