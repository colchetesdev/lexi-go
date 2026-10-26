import { useMemo, useState } from "react";
import { ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "@components/Header";
import TermTable from "@components/TermTable";
import { RootStackParamList } from "../../types/navigation";
import { Difficulty, terms } from "../../data/terms";
import { categoryLabels, WordCategory, wordCategories } from "../../data/wordCatalog";
import { useLanguage } from "../../context/LanguageContext";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;
type Category = "All" | WordCategory;

export default function Search({ navigation }: Props) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return terms.filter((item) => {
      const localizedCategory = categoryLabels[item.category][language];
      const localizedDifficulty = item.difficulty === "Beginner" ? t("beginner") : t("intermediate");
      const matchesQuery = !normalizedQuery || [item.term, item.category, item.difficulty, localizedCategory, localizedDifficulty].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesCategory = category === "All" || item.category === category;
      const matchesDifficulty = difficulty === "All" || item.difficulty === difficulty;
      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [category, difficulty, language, query, t]);

  const activeFilterCount = Number(category !== "All") + Number(difficulty !== "All");

  return <ImageBackground source={require("@assets/background.png")} resizeMode="cover" style={styles.container}>
    <Header />
    <View pointerEvents="none" style={styles.overlay}/>
    <View style={styles.searchBox}><TextInput value={query} onChangeText={setQuery} placeholder={t("searchWord")} placeholderTextColor="#E3E3E3" style={styles.input} accessibilityLabel={t("searchWord")}/><SearchIcon color="#FFF" size={19}/></View>
    <TouchableOpacity accessibilityRole="button" style={styles.filter} onPress={() => setFiltersOpen((open) => !open)}><Text style={styles.filterText}>{t("applyFilters")}{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}</Text><SlidersHorizontal color="#FFF" size={20}/></TouchableOpacity>
    {filtersOpen && <View style={styles.filterPanel}>
      <Text style={styles.filterLabel}>{t("category")}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroller} contentContainerStyle={styles.chips}>{(["All", ...wordCategories] as Category[]).map((value) => <TouchableOpacity key={value} onPress={() => setCategory(value)} style={[styles.chip, category === value && styles.selectedChip]}><Text style={[styles.chipText, category === value && styles.selectedChipText]}>{value === "All" ? t("all") : categoryLabels[value][language]}</Text></TouchableOpacity>)}</ScrollView>
      <Text style={styles.filterLabel}>{t("difficulty")}</Text>
      <View style={styles.chips}>{(["All", "Beginner", "Intermediate"] as const).map((value) => <TouchableOpacity key={value} onPress={() => setDifficulty(value)} style={[styles.chip, difficulty === value && styles.selectedChip]}><Text style={[styles.chipText, difficulty === value && styles.selectedChipText]}>{value === "All" ? t("all") : value === "Beginner" ? t("beginner") : t("intermediate")}</Text></TouchableOpacity>)}</View>
    </View>}
    <TermTable title={t("results")} variant="results" top={filtersOpen ? 375 : 220} rows={filteredTerms} onRowPress={(term) => navigation.navigate("Word", { term })} />
    <TouchableOpacity accessibilityRole="button" style={styles.close} onPress={() => navigation.navigate("Home")}><X color="#FFF" size={24}/></TouchableOpacity>
  </ImageBackground>;
}
