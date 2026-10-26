import { WordCategory, wordCatalog } from "./wordCatalog";

export type Difficulty = "Beginner" | "Intermediate";

export type Term = {
  term: string;
  category: WordCategory;
  difficulty: Difficulty;
};

export const terms: Term[] = wordCatalog;
