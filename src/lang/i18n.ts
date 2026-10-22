import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ES
import esCommon from './es/common.json';
import esHome from './es/home.json';
import esExplore from './es/explore.json';

// EN
import enCommon from './en/common.json';
import enHome from './en/home.json';
import enExplore from './en/explore.json';

// PT
import ptCommon from './pt/common.json';
import ptHome from './pt/home.json';
import ptExplore from './pt/explore.json';

export const defaultNS = 'common';

export const resources = {
  es: {
    common: esCommon,
    home: esHome,
    explore: esExplore,
  },
  en: {
    common: enCommon,
    home: enHome,
    explore: enExplore,
  },
  pt: {
    common: ptCommon,
    home: ptHome,
    explore: ptExplore,
  },
} as const;

export type SupportedLanguage = keyof typeof resources;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'es', // Idioma por defecto
  fallbackLng: 'es',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export const changeAppLanguage = async (language: SupportedLanguage): Promise<void> => {
  await i18n.changeLanguage(language);
};

export default i18n;
