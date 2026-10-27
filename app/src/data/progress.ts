import AsyncStorage from "@react-native-async-storage/async-storage";
import { CatalogWord, wordCatalog } from "./wordCatalog";

export const MARKED_WORDS_KEY = "@marked_words";
export const HISTORY_TERMS_KEY = "@history_terms";

export async function getLearnedTerms(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem(MARKED_WORDS_KEY);
    const parsed = stored ? JSON.parse(stored) as unknown : [];
    if (!Array.isArray(parsed)) return [];

    const catalogTerms = new Set(wordCatalog.map((word) => word.term.toLowerCase()));
    return Array.from(new Set(parsed.filter((term): term is string => typeof term === "string" && catalogTerms.has(term.toLowerCase()))));
  } catch {
    return [];
  }
}

export function getDailyReviewWords(learnedTerms: string[], date = new Date()): CatalogWord[] {
  const learned = wordCatalog.filter((word) => learnedTerms.some((term) => term.toLowerCase() === word.term.toLowerCase()));
  if (learned.length === 0) return [];

  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / (24 * 60 * 60 * 1000));
  const start = day % learned.length;
  const reviewSize = Math.min(5, learned.length);
  return Array.from({ length: reviewSize }, (_, index) => learned[(start + index) % learned.length]);
}

export async function getHistoryTerms(): Promise<string[]> {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_TERMS_KEY);
    const parsed = stored ? JSON.parse(stored) as unknown : [];
    if (!Array.isArray(parsed)) return [];
    const catalogTerms = new Set(wordCatalog.map((word) => word.term.toLowerCase()));
    return parsed.filter((term): term is string => typeof term === "string" && catalogTerms.has(term.toLowerCase()));
  } catch {
    return [];
  }
}

export async function recordHistoryTerm(term: string): Promise<void> {
  try {
    const history = await getHistoryTerms();
    const normalizedTerm = term.toLowerCase();
    const withoutCurrent = history.filter((item) => item.toLowerCase() !== normalizedTerm);
    await AsyncStorage.setItem(HISTORY_TERMS_KEY, JSON.stringify([term, ...withoutCurrent].slice(0, 20)));
  } catch {
    // O histórico é complementar e não deve interromper a abertura do termo.
  }
}
