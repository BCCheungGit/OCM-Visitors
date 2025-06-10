import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
      visitor: "Visitor",
      admin: "Admin",
      phone_number: "Phone Number",
      first_time: "First Time?",
      first_name: "First Name",
      last_name: "Last Name",
      already_have: "Already have an account?",
      manual_check_in: "Manual Check-In",
      view_users: "View Visitors",
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
      create_account: "注冊",
      sign_in: "登入",
      sign_up: "注冊",
      visitor: "訪客",
      admin: "管理員",
      phone_number: "電話號碼",
      first_time: "新訪客",
      first_name: "名字",
      last_name: "姓氏",
      already_have: "已經有帳戶了嗎?",
      manual_check_in: "手動登記",
      view_users: "查看訪客",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const savedLang =
  typeof window !== "undefined" ? localStorage.getItem("lng") : "en";

i18n.init({
  lng: savedLang || "en",
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lng", lng);
  }
});

export default i18n;
