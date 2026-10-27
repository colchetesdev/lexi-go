import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import Header from "@components/Header";
import AppBackground from "@components/AppBackground";
import TermTable from "@components/TermTable";
import { RootStackParamList } from "../../types/navigation";
import { Difficulty, terms } from "../../data/terms";
import { categoryLabels, WordCategory, wordCategories } from "../../data/wordCatalog";
import { useLanguage } from "../../context/LanguageContext";
import { styles } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getLearnedTerms } from "../../data/progress";
import { liquidGlass, liquidGlassLight } from "../../styles/glass";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;
type Category = "All" | WordCategory;
type Status = "All" | "Learned" | "NotLearned";

export default function Search({ navigation }: Props) {
  const { language, t } = useLanguage();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [status, setStatus] = useState<Status>("All");
  const [learnedTerms, setLearnedTerms] = useState<Set<string>>(new Set());
  const [resultsScrolled, setResultsScrolled] = useState(false);
  const entrance = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(entrance, { toValue: 0, duration: 260, useNativeDriver: true }).start();
    return () => entrance.stopAnimation();
  }, [entrance]);

  const loadLearnedTerms = useCallback(async () => {
    setLearnedTerms(new Set((await getLearnedTerms()).map((term) => term.toLowerCase())));
  }, []);

  useFocusEffect(useCallback(() => {
    loadLearnedTerms();
  }, [loadLearnedTerms]));

  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return terms.filter((item) => {
      const localizedCategory = categoryLabels[item.category][language];
      const localizedDifficulty = item.difficulty === "Beginner" ? t("beginner") : t("intermediate");
      const matchesQuery = !normalizedQuery || [item.term, item.category, item.difficulty, localizedCategory, localizedDifficulty].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesCategory = category === "All" || item.category === category;
      const matchesDifficulty = difficulty === "All" || item.difficulty === difficulty;
      const isLearned = learnedTerms.has(item.term.toLowerCase());
      const matchesStatus = status === "All" || (status === "Learned" ? isLearned : !isLearned);
      return matchesQuery && matchesCategory && matchesDifficulty && matchesStatus;
    });
  }, [category, difficulty, language, learnedTerms, query, status, t]);

  const activeFilterCount = Number(category !== "All") + Number(difficulty !== "All") + Number(status !== "All");
  const resultsTop = filtersOpen ? Math.min(390, Math.max(360, height - 250)) : 220;
  const handleResultsScroll = (offsetY: number) => {
    const nextScrolled = offsetY > 8;
    if (nextScrolled && !resultsScrolled) setFiltersOpen(false);
    setResultsScrolled(nextScrolled);
  };

  return <Animated.View style={[styles.screen, { transform: [{ translateX: entrance.interpolate({ inputRange: [0, 1], outputRange: [0, width] }) }] }]}><AppBackground style={styles.container}>
    <Header />
    <View pointerEvents="none" style={styles.overlay}/>
    <View style={[styles.searchBox, liquidGlass]}><TextInput value={query} onChangeText={setQuery} placeholder={t("searchWord")} placeholderTextColor="#E3E3E3" style={styles.input} accessibilityLabel={t("searchWord")} returnKeyType="search"/>{query.length > 0 && <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("clearSearch")} hitSlop={6} style={styles.clearSearch} onPress={() => setQuery("")}><X color="#FFF" size={18}/></TouchableOpacity>}<SearchIcon color="#FFF" size={19}/></View>
    {!resultsScrolled && <TouchableOpacity accessibilityRole="button" accessibilityLabel={`${t("filterOptions")}${activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}`} accessibilityState={{ expanded: filtersOpen }} style={styles.filter} onPress={() => setFiltersOpen((open) => !open)}><Text style={styles.filterText}>{t("applyFilters")}{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}</Text><SlidersHorizontal color="#FFF" size={20}/></TouchableOpacity>}
    {filtersOpen && !resultsScrolled && <View style={[styles.filterPanel, liquidGlassLight]}>
      <Text style={styles.filterLabel}>{t("category")}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroller} contentContainerStyle={styles.chips}>{(["All", ...wordCategories] as Category[]).map((value) => { const label = value === "All" ? t("all") : categoryLabels[value][language]; return <TouchableOpacity key={value} accessibilityRole="button" accessibilityLabel={`${t("category")}: ${label}`} accessibilityState={{ selected: category === value }} onPress={() => setCategory(value)} style={[styles.chip, category === value && styles.selectedChip]}><Text style={[styles.chipText, category === value && styles.selectedChipText]}>{label}</Text></TouchableOpacity>; })}</ScrollView>
      <Text style={styles.filterLabel}>{t("difficulty")}</Text>
      <View style={styles.chips}>{(["All", "Beginner", "Intermediate"] as const).map((value) => { const label = value === "All" ? t("all") : value === "Beginner" ? t("beginner") : t("intermediate"); return <TouchableOpacity key={value} accessibilityRole="button" accessibilityLabel={`${t("difficulty")}: ${label}`} accessibilityState={{ selected: difficulty === value }} onPress={() => setDifficulty(value)} style={[styles.chip, difficulty === value && styles.selectedChip]}><Text style={[styles.chipText, difficulty === value && styles.selectedChipText]}>{label}</Text></TouchableOpacity>; })}</View>
      <Text style={styles.filterLabel}>{t("status")}</Text>
      <View style={styles.chips}>{(["All", "Learned", "NotLearned"] as const).map((value) => { const label = value === "All" ? t("allStatus") : value === "Learned" ? t("learnedStatus") : t("notLearnedStatus"); return <TouchableOpacity key={value} accessibilityRole="button" accessibilityLabel={`${t("status")}: ${label}`} accessibilityState={{ selected: status === value }} onPress={() => setStatus(value)} style={[styles.chip, status === value && styles.selectedChip]}><Text style={[styles.chipText, status === value && styles.selectedChipText]}>{label}</Text></TouchableOpacity>; })}</View>
    </View>}
    <TermTable title={t("results")} variant="results" top={resultsTop} rows={filteredTerms} onRowPress={(term) => navigation.navigate("Word", { term })} onRowsScroll={handleResultsScroll} />
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("closeSearch")} hitSlop={8} style={[styles.close, { bottom: Math.max(90, insets.bottom + 70) }]} onPress={() => navigation.navigate("Home")}><X color="#FFF" size={24}/></TouchableOpacity>
  </AppBackground></Animated.View>;
}
