import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

i18n
  .use(initReactI18next) 
  .use(LanguageDetector) 
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru }
    },
    fallbackLng: "en", // Если язык не найден, используем английский
    detection: {
      order: ["localStorage", "navigator"], // Определение языка
      caches: ["localStorage"] // Кэшируем в локальном хранилище
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
