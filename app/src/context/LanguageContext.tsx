import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TranslationKey, translations } from "../i18n/translations";

type Language = "en" | "pt";

interface LanguageContextData {
  language: Language;
  handleLanguage: () => void;
  loading: boolean;
  t: (key: TranslationKey) => string;
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
      try {
        const stored = await AsyncStorage.getItem("@language");

        if (stored === "en" || stored === "pt") {
          setLanguage(stored);
        }
      } catch {
        // O idioma padrão continua disponível quando o armazenamento falha.
      } finally {
        setLoading(false);
      }
    }

    loadLanguage();
  }, []);

  async function handleLanguage() {
    const newLang = language === "en" ? "pt" : "en";
    setLanguage(newLang);
    try {
      await AsyncStorage.setItem("@language", newLang);
    } catch {
      // A troca visual continua funcionando nesta sessão.
    }
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        handleLanguage,
        loading,
        t: (key) => translations[language][key],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
