import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Language = "en" | "pt";

interface LanguageContextData {
  language: Language;
  handleLanguage: () => void;
  loading: boolean;
}

const LanguageContext = createContext({} as LanguageContextData);

interface Props {
  children: ReactNode;
}

export function LanguageProvider({ children }: Props) {
  const [language, setLanguage] = useState<Language>("en");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLanguage() {
      const stored = await AsyncStorage.getItem("@language");

      if (stored === "en" || stored === "pt") {
        setLanguage(stored);
      }

      setLoading(false);
    }

    loadLanguage();
  }, []);

  async function handleLanguage() {
    setLanguage((prev) => {
      const newLang = prev === "en" ? "pt" : "en";

      AsyncStorage.setItem("@language", newLang);

      return newLang;
    });
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        handleLanguage,
        loading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}