/**
 * Module dependencies.
 */

import Backend from 'i18next-http-backend';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import { getLocales } from 'expo-localization';
const deviceLanguage = getLocales()[0].languageTag;
console.log(deviceLanguage);



const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: (callback) => {
        // We will get back a string like "en-US". We
        // return a string like "en" to match our language
        // files.
        return callback(deviceLanguage);
    },
    init: () => { },
    cacheUserLanguage: () => { },
};

i18n
    .use(Backend)
    .use(initReactI18next)
    .use(RNLanguageDetector)
    .use(languageDetector)
    .init({
        fallbackLng: 'en-GB',
        interpolation: {
            escapeValue: false
        },
        compatibilityJSON: 'v2',
        keySeparator:'.',
        whitelist: ['en-GB', 'pt-PT'],
        debug: false,
        resources: {
            'en-GB': {
                translation: require('../languages/en-GB/translation.json'),
            },
            'pt-PT': {
                translation: require('../languages/pt-PT/translation.json'),
            }
        }
    });


/**
 * Export `i18n`.
 */

export default i18n;