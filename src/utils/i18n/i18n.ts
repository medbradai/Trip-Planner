import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translationFR from "./fr/translations-fr";
import translationsEn from "./en/translations-en";

// the translations
const resources = {
    fr: {translation: translationFR},
    en: {translation: translationsEn}
};

void i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        lng: "en",
        resources,
    });

export default i18n;
