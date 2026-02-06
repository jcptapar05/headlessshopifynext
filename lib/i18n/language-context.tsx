"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { dictionaries, Locale } from "./dictionaries";

type LanguageContextType = {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (typeof dictionaries)["en"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Locale>("en");

  // Ideally persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("language") as Locale;
    if (saved && (saved === "en" || saved === "tl" || saved === "zh")) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Locale) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t: dictionaries[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
