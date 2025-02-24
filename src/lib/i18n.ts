import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "Oversea Chinese Mission",
      subtitle: "Visitor Registration",
      welcome_back: "Welcome Back!",
      heres_a_list: "Here's a list of all visitors and admins:",
      show_image: "Show Image",
      print_card: "Print ID Card",
    },
  },
  zh: {
    translation: {
      title: "中華海外宣道會",
      subtitle: "訪客登記",
      welcome_back: "歡迎回來!",
      heres_a_list: "這是中宣會所有的訪客和官員:",
      show_image: "照片",
      print_card: "列印ID卡"
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

const savedLang = typeof window !== "undefined" ? localStorage.getItem("lng") : "en";

i18n.init({
  lng: savedLang || "en",
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lng", lng);
  }
});


export default i18n;
