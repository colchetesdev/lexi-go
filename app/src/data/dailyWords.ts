import { CatalogWord, WordCategory, wordCatalog } from "./wordCatalog";

export type LocalizedText = { en: string; pt: string };

export type WordEntry = {
  term: string;
  phonetic: string;
  category: WordCategory;
  difficulty: "Beginner" | "Intermediate";
  definition: LocalizedText;
  example: LocalizedText;
  relatedTerms: string[];
};

export const dailyWords: WordEntry[] = [
  {
    term: "API",
    phonetic: "/ˌeɪ.piˈaɪ/",
    category: "Back-end",
    difficulty: "Beginner",
    definition: { en: "A set of rules that allows programs to communicate with each other.", pt: "Um conjunto de regras que permite que programas se comuniquem entre si." },
    example: { en: "The weather app uses a public API to fetch forecast data.", pt: "O aplicativo de clima usa uma API pública para buscar dados de previsão." },
    relatedTerms: ["Endpoint", "Backend", "Devops"],
  },
  {
    term: "Endpoint",
    phonetic: "/ˈend.pɔɪnt/",
    category: "Back-end",
    difficulty: "Beginner",
    definition: { en: "A specific URL where an API receives or returns data.", pt: "Uma URL específica onde uma API recebe ou retorna dados." },
    example: { en: "The client sends a request to the users endpoint.", pt: "O cliente envia uma requisição para o endpoint de usuários." },
    relatedTerms: ["API", "Backend", "Database"],
  },
  {
    term: "Backend",
    phonetic: "/ˈbæk.end/",
    category: "Back-end",
    difficulty: "Beginner",
    definition: { en: "The part of an application that runs on the server.", pt: "A parte de uma aplicação que é executada no servidor." },
    example: { en: "The backend validates the user before saving the form.", pt: "O back-end valida o usuário antes de salvar o formulário." },
    relatedTerms: ["API", "Endpoint", "Database"],
  },
  {
    term: "DevOps",
    phonetic: "/dɪvˈɒps/",
    category: "DevOps",
    difficulty: "Intermediate",
    definition: { en: "A set of practices that brings development and operations teams together.", pt: "Um conjunto de práticas que aproxima as equipes de desenvolvimento e operações." },
    example: { en: "DevOps helps teams deploy software more reliably.", pt: "DevOps ajuda as equipes a publicar software com mais confiabilidade." },
    relatedTerms: ["Backend", "API", "Frontend"],
  },
  {
    term: "Database",
    phonetic: "/ˈdeɪ.tə.beɪs/",
    category: "Back-end",
    difficulty: "Intermediate",
    definition: { en: "An organized collection of data that an application can read and update.", pt: "Uma coleção organizada de dados que uma aplicação pode consultar e atualizar." },
    example: { en: "The service stores account data in a database.", pt: "O serviço armazena os dados da conta em um banco de dados." },
    relatedTerms: ["Backend", "Endpoint", "API"],
  },
  {
    term: "Frontend",
    phonetic: "/ˈfrʌnt.end/",
    category: "Front-end",
    difficulty: "Beginner",
    definition: { en: "The part of an application that users see and interact with.", pt: "A parte de uma aplicação que os usuários veem e utilizam." },
    example: { en: "The frontend displays the data returned by the API.", pt: "O front-end exibe os dados retornados pela API." },
    relatedTerms: ["API", "Backend", "DevOps"],
  },
];

export function getDailyWord(date = new Date()): WordEntry {
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const currentDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const firstDayOfYear = Date.UTC(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((currentDay - firstDayOfYear) / dayInMilliseconds);
  const catalogWord = wordCatalog[dayOfYear % wordCatalog.length];
  return getWordByTerm(catalogWord.term);
}

export function getWordByTerm(term?: string): WordEntry {
  const normalizedTerm = term?.toLowerCase();
  const detailedWord = dailyWords.find((word) => word.term.toLowerCase() === normalizedTerm);
  if (detailedWord) return detailedWord;

  const catalogWord = wordCatalog.find((word) => word.term.toLowerCase() === normalizedTerm);
  return catalogWord ? createWordEntry(catalogWord) : getWordByTerm(wordCatalog[0].term);
}

function createWordEntry(catalogWord: CatalogWord): WordEntry {
  const relatedTerms = wordCatalog.filter((word) => word.category === catalogWord.category && word.term !== catalogWord.term).slice(0, 3).map((word) => word.term);
  const categoryName = catalogWord.category.toLowerCase();
  return {
    ...catalogWord,
    definition: {
      en: `${catalogWord.term} is a ${categoryName} concept commonly used in software development.`,
      pt: `${catalogWord.term} é um conceito de ${categoryName} usado com frequência no desenvolvimento de software.`,
    },
    example: {
      en: `Developers use ${catalogWord.term} when building and maintaining applications.`,
      pt: `Desenvolvedores usam ${catalogWord.term} ao criar e manter aplicações.`,
    },
    relatedTerms,
  };
}
