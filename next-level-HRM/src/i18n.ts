import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
const savedLanguage = localStorage.getItem('app_language') || 'en';
i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        supportedLngs: ['en', 'vi'],
        lng: savedLanguage,
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;