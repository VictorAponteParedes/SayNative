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
import esSupport from './es/support.json';
import esAuth from './es/auth.json';
import esCalls from './es/calls.json';

// EN
import enCommon from './en/common.json';
import enHome from './en/home.json';
import enExplore from './en/explore.json';
import enChats from './en/chats.json';
import enCoins from './en/coins.json';
import enProfile from './en/profile.json';
import enNotifications from './en/notifications.json';
import enSecurity from './en/security.json';
import enSupport from './en/support.json';
import enAuth from './en/auth.json';
import enCalls from './en/calls.json';

// PT
import ptCommon from './pt/common.json';
import ptHome from './pt/home.json';
import ptExplore from './pt/explore.json';
import ptChats from './pt/chats.json';
import ptCoins from './pt/coins.json';
import ptProfile from './pt/profile.json';
import ptNotifications from './pt/notifications.json';
import ptSecurity from './pt/security.json';
import ptSupport from './pt/support.json';
import ptAuth from './pt/auth.json';
import ptCalls from './pt/calls.json';

// ZH (Chino Simplificado)
import zhCommon from './zh/common.json';
import zhHome from './zh/home.json';
import zhExplore from './zh/explore.json';
import zhChats from './zh/chats.json';
import zhCoins from './zh/coins.json';
import zhProfile from './zh/profile.json';
import zhNotifications from './zh/notifications.json';
import zhSecurity from './zh/security.json';
import zhSupport from './zh/support.json';
import zhAuth from './zh/auth.json';
import zhCalls from './zh/calls.json';

// JA (Japonés)
import jaCommon from './ja/common.json';
import jaHome from './ja/home.json';
import jaExplore from './ja/explore.json';
import jaChats from './ja/chats.json';
import jaCoins from './ja/coins.json';
import jaProfile from './ja/profile.json';
import jaNotifications from './ja/notifications.json';
import jaSecurity from './ja/security.json';
import jaSupport from './ja/support.json';
import jaAuth from './ja/auth.json';
import jaCalls from './ja/calls.json';

// FR (Francés)
import frCommon from './fr/common.json';
import frHome from './fr/home.json';
import frExplore from './fr/explore.json';
import frChats from './fr/chats.json';
import frCoins from './fr/coins.json';
import frProfile from './fr/profile.json';
import frNotifications from './fr/notifications.json';
import frSecurity from './fr/security.json';
import frSupport from './fr/support.json';
import frAuth from './fr/auth.json';
import frCalls from './fr/calls.json';

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
    support: esSupport,
    auth: esAuth,
    calls: esCalls,
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
    support: enSupport,
    auth: enAuth,
    calls: enCalls,
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
    support: ptSupport,
    auth: ptAuth,
    calls: ptCalls,
  },
  zh: {
    common: zhCommon,
    home: zhHome,
    explore: zhExplore,
    chats: zhChats,
    coins: zhCoins,
    profile: zhProfile,
    notifications: zhNotifications,
    security: zhSecurity,
    support: zhSupport,
    auth: zhAuth,
    calls: zhCalls,
  },
  ja: {
    common: jaCommon,
    home: jaHome,
    explore: jaExplore,
    chats: jaChats,
    coins: jaCoins,
    profile: jaProfile,
    notifications: jaNotifications,
    security: jaSecurity,
    support: jaSupport,
    auth: jaAuth,
    calls: jaCalls,
  },
  fr: {
    common: frCommon,
    home: frHome,
    explore: frExplore,
    chats: frChats,
    coins: frCoins,
    profile: frProfile,
    notifications: frNotifications,
    security: frSecurity,
    support: frSupport,
    auth: frAuth,
    calls: frCalls,
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
