import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "Oversea Chinese Mission",
      subtitle: "Visitor Registration",
      welcome_back: "Welcome Back!",
      welcome: "Welcome to OCM!",
      heres_a_list: "Here's a list of all visitors and admins:",
      show_image: "Show Image",
      print_card: "Print ID Card",
      user_nav_admin_dashboard: "Admin Dashboard",
      user_nav_qr: "My QR Code",
      logout: "Logout",
      create_account: "Create Account",
      sign_in: "Sign In",
      sign_up: "Sign Up",
    },
  },
  zh: {
    translation: {
      title: "中華海外宣道會",
      subtitle: "訪客登記",
      welcome_back: "歡迎回來!",
      welcome: "歡迎來到中宣會!",
      heres_a_list: "這是中宣會所有的訪客和官員:",
      show_image: "照片",
      print_card: "列印ID卡",
      user_nav_admin_dashboard: "管理儀表板",
      user_nav_qr: "我的二維碼",
      logout: "登出",
      create_account: "登記",
      sign_in: "登入",
      sign_up: "登記",
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
