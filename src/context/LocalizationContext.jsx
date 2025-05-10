import { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../utils/localization';

// Create the localization context
const LocalizationContext = createContext();

export function LocalizationProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get saved language preference or default to English
    return localStorage.getItem('language') || 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    toggleLanguage,
    t,
    translations
  };

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}

export const useLocalization = () => useContext(LocalizationContext);