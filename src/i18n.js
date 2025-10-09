import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru/ru.json';
import kg from './locales/kg/kg.json';

const resources = {
    ru: { translation: ru },
    kg: { translation: kg },
};

// localStorage’дан тилди алуу, эгер жок болсо kg деп кой
const savedLang = localStorage.getItem('language') || 'kg';

i18n
    .use(initReactI18next)
    .init({
        lng: savedLang, // баштапкы тил
        fallbackLng: 'kg',
        resources,
        interpolation: { escapeValue: false },
    });

export default i18n;
