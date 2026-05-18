import { createContext, useContext, useState } from "react";

const LanguageContext = createContext({
  language: "en",
  handleLanguage: ()=> {}
});

export function LanguageProvider({ children } : any) {
  const [language, setLanguage] = useState("en");

  const handleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, handleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}