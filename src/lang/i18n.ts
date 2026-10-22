import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ES
import esCommon from './es/common.json';
import esHome from './es/home.json';
import esExplore from './es/explore.json';
import esChats from './es/chats.json';
import esCoins from './es/coins.json';
import esProfile from './es/profile.json';
import esNotifications from './es/notifications.json';
import esSecurity from './es/security.json';

// EN
import enCommon from './en/common.json';
import enHome from './en/home.json';
import enExplore from './en/explore.json';
import enChats from './en/chats.json';
import enCoins from './en/coins.json';
import enProfile from './en/profile.json';
import enNotifications from './en/notifications.json';
import enSecurity from './en/security.json';

// PT
import ptCommon from './pt/common.json';
import ptHome from './pt/home.json';
import ptExplore from './pt/explore.json';
import ptChats from './pt/chats.json';
import ptCoins from './pt/coins.json';
import ptProfile from './pt/profile.json';
import ptNotifications from './pt/notifications.json';
import ptSecurity from './pt/security.json';

export const defaultNS = 'common';

export const resources = {
  es: {
    common: esCommon,
    home: esHome,
    explore: esExplore,
    chats: esChats,
    coins: esCoins,
    profile: esProfile,
    notifications: esNotifications,
    security: esSecurity,
  },
  en: {
    common: enCommon,
    home: enHome,
    explore: enExplore,
    chats: enChats,
    coins: enCoins,
    profile: enProfile,
    notifications: enNotifications,
    security: enSecurity,
  },
  pt: {
    common: ptCommon,
    home: ptHome,
    explore: ptExplore,
    chats: ptChats,
    coins: ptCoins,
    profile: ptProfile,
    notifications: ptNotifications,
    security: ptSecurity,
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
