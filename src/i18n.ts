import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

const normalizeLanguage = (lng: string | undefined) => {
  if (!lng) return "en";
  if (lng.startsWith("en")) return "en";
  if (lng.startsWith("ru")) return "ru";
  return "en";
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

const currentLng = i18n.language;
const normalizedLng = normalizeLanguage(currentLng);

if (currentLng !== normalizedLng) {
  i18n.changeLanguage(normalizedLng);
  localStorage.setItem("i18nextLng", normalizedLng);
}

export default i18n;
