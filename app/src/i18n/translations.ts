export type TranslationKey =
  | "todayWordIs"
  | "seeMore"
  | "discovered"
  | "relatedWords"
  | "history"
  | "results"
  | "term"
  | "category"
  | "searchWord"
  | "applyFilters"
  | "difficulty"
  | "all"
  | "backEnd"
  | "frontEnd"
  | "beginner"
  | "intermediate"
  | "noResults"
  | "definition"
  | "example"
  | "wordDefinition"
  | "wordExample"
  | "categoryValue"
  | "difficultyValue"
  | "markWord"
  | "unmarkWord"
  | "about"
  | "aboutTitle"
  | "aboutDescription"
  | "aboutUtilityTitle"
  | "aboutUtilityOne"
  | "aboutUtilityTwo"
  | "aboutUtilityThree"
  | "aboutAudienceTitle"
  | "aboutAudience"
  | "aboutProjectTitle"
  | "aboutProjectText"
  | "aboutLearningTitle"
  | "aboutLearningText"
  | "aboutDevelopmentTitle"
  | "aboutDevelopmentText"
  | "aboutCollaboratorsTitle"
  | "aboutCollaboratorsText";

export const translations: Record<"en" | "pt", Record<TranslationKey, string>> = {
  en: {
    todayWordIs: "Today, the word is",
    seeMore: "See more",
    discovered: "99 of 156 discovered",
    relatedWords: "Related words",
    history: "History",
    results: "Results",
    term: "Term",
    category: "Category",
    searchWord: "Search a word",
    applyFilters: "Apply filters",
    difficulty: "Difficulty",
    all: "All",
    backEnd: "Back-end",
    frontEnd: "Front-end",
    beginner: "Beginner",
    intermediate: "Intermediate",
    noResults: "No results found",
    definition: "Definition",
    example: "Example:",
    wordDefinition: "A set of rules that allows programs to communicate with each other.",
    wordExample: "The weather app uses a public API to fetch forecast data.",
    categoryValue: "Category: Back-end",
    difficultyValue: "Difficulty: Beginner",
    markWord: "Mark word as learned",
    unmarkWord: "Unmark word",
    about: "About",
    aboutTitle: "Learn technology English with LexiGo",
    aboutDescription: "LexiGo helps Portuguese speakers learn the English vocabulary used in technology, programming and software development.",
    aboutUtilityTitle: "How it helps",
    aboutUtilityOne: "Discover a new technical word every day.",
    aboutUtilityTwo: "Read definitions and examples in context.",
    aboutUtilityThree: "Review terms and mark what you have learned.",
    aboutAudienceTitle: "Made for",
    aboutAudience: "Students, developers and anyone who wants to communicate with more confidence in the technology world.",
    aboutProjectTitle: "About the project",
    aboutProjectText: "LexiGo was created to make technical English more accessible, practical and connected to the real vocabulary used in software development.",
    aboutLearningTitle: "Learning experience",
    aboutLearningText: "The app combines a daily word, definitions, examples, pronunciation, search, history and marking tools so each learner can study at their own pace.",
    aboutDevelopmentTitle: "Development support",
    aboutDevelopmentText: "The project supports the development and learning of the teachers and students of Lar Donato Flores by bringing technology, language and everyday practice together.",
    aboutCollaboratorsTitle: "Collaborators",
    aboutCollaboratorsText: "Built with the collaboration of the LexiGo development team, teachers and collaborators of Lar Donato Flores, whose educational context guides the project’s priorities.",
  },
  pt: {
    todayWordIs: "Hoje, a palavra é",
    seeMore: "Ver mais",
    discovered: "99 de 156 descobertas",
    relatedWords: "Palavras relacionadas",
    history: "Histórico",
    results: "Resultados",
    term: "Termo",
    category: "Categoria",
    searchWord: "Pesquise uma palavra",
    applyFilters: "Aplicar filtros",
    difficulty: "Dificuldade",
    all: "Todos",
    backEnd: "Back-end",
    frontEnd: "Front-end",
    beginner: "Iniciante",
    intermediate: "Intermediário",
    noResults: "Nenhum resultado encontrado",
    definition: "Definição",
    example: "Exemplo:",
    wordDefinition: "Um conjunto de regras que permite que programas se comuniquem entre si.",
    wordExample: "O aplicativo de clima usa uma API pública para buscar dados de previsão.",
    categoryValue: "Categoria: Back-end",
    difficultyValue: "Dificuldade: Iniciante",
    markWord: "Marcar palavra como aprendida",
    unmarkWord: "Desmarcar palavra",
    about: "Sobre",
    aboutTitle: "Aprenda inglês de tecnologia com o LexiGo",
    aboutDescription: "O LexiGo ajuda falantes de português a aprender o vocabulário em inglês usado em tecnologia, programação e desenvolvimento de software.",
    aboutUtilityTitle: "Como ele ajuda",
    aboutUtilityOne: "Descubra uma nova palavra técnica todos os dias.",
    aboutUtilityTwo: "Leia definições e exemplos em contexto.",
    aboutUtilityThree: "Revise termos e marque o que você já aprendeu.",
    aboutAudienceTitle: "Feito para",
    aboutAudience: "Estudantes, desenvolvedores e qualquer pessoa que queira se comunicar com mais confiança no mundo da tecnologia.",
    aboutProjectTitle: "Sobre o projeto",
    aboutProjectText: "O LexiGo foi criado para tornar o inglês técnico mais acessível, prático e conectado ao vocabulário real usado no desenvolvimento de software.",
    aboutLearningTitle: "Experiência de aprendizado",
    aboutLearningText: "O aplicativo combina palavra do dia, definições, exemplos, pronúncia, busca, histórico e marcação de termos para que cada pessoa estude no seu próprio ritmo.",
    aboutDevelopmentTitle: "Apoio ao desenvolvimento",
    aboutDevelopmentText: "O projeto auxilia o desenvolvimento e o aprendizado dos docentes e estudantes do Lar Donato Flores, aproximando tecnologia, linguagem e prática cotidiana.",
    aboutCollaboratorsTitle: "Colaboradores",
    aboutCollaboratorsText: "Desenvolvido com a colaboração da equipe do LexiGo, dos docentes e dos colaboradores do Lar Donato Flores, cujo contexto educacional orienta as prioridades do projeto.",
  },
};
