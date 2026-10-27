import { useCallback, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@components/Header";
import AppBackground from "@components/AppBackground";
import GlassButton from "@components/GlassButton";
import { RootStackParamList } from "../../types/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { getLearnedTerms } from "../../data/progress";
import { categoryLabels, wordCatalog } from "../../data/wordCatalog";
import { styles } from "./styles";
import { liquidGlassLight } from "../../styles/glass";

type Props = NativeStackScreenProps<RootStackParamList, "Statistics">;

export default function Statistics({ navigation }: Props) {
  const { language, t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [learnedTerms, setLearnedTerms] = useState<string[]>([]);

  const loadStatistics = useCallback(async () => {
    setLearnedTerms(await getLearnedTerms());
  }, []);

  useFocusEffect(useCallback(() => {
    loadStatistics();
  }, [loadStatistics]));

  const learnedSet = useMemo(() => new Set(learnedTerms.map((term) => term.toLowerCase())), [learnedTerms]);
  const learnedWords = useMemo(() => wordCatalog.filter((word) => learnedSet.has(word.term.toLowerCase())), [learnedSet]);
  const completion = wordCatalog.length > 0 ? Math.round((learnedWords.length / wordCatalog.length) * 100) : 0;
  const categoryStats = useMemo(() => wordCatalog.reduce<Record<string, number>>((result, word) => {
    if (learnedSet.has(word.term.toLowerCase())) result[word.category] = (result[word.category] ?? 0) + 1;
    return result;
  }, {}), [learnedSet]);
  const difficultyStats = useMemo(() => ({
    Beginner: learnedWords.filter((word) => word.difficulty === "Beginner").length,
    Intermediate: learnedWords.filter((word) => word.difficulty === "Intermediate").length,
  }), [learnedWords]);
  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

  return (
    <AppBackground style={styles.container}>
      <Header />
      <GlassButton accessibilityLabel={t("goBack")} size={48} onPress={goBack} style={[styles.back, { top: 64 + insets.top + 16 }]}>
        <ArrowLeft color="#FFF" size={24}/>
      </GlassButton>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, liquidGlassLight]}>
          <Text style={styles.title}>{t("statistics")}</Text>
          <View style={styles.statGrid}>
            <View style={styles.stat}><Text style={styles.statValue}>{learnedWords.length}</Text><Text style={styles.statLabel}>{t("learnedWords")}</Text></View>
            <View style={styles.stat}><Text style={styles.statValue}>{wordCatalog.length - learnedWords.length}</Text><Text style={styles.statLabel}>{t("remainingWords")}</Text></View>
            <View style={styles.stat}><Text style={styles.statValue}>{completion}%</Text><Text style={styles.statLabel}>{t("completion")}</Text></View>
          </View>
          <Text style={styles.sectionTitle}>{t("difficultyProgress")}</Text>
          <View style={styles.line}><Text style={styles.lineLabel}>{t("beginner")}</Text><Text style={styles.lineValue}>{difficultyStats.Beginner}</Text></View>
          <View style={styles.line}><Text style={styles.lineLabel}>{t("intermediate")}</Text><Text style={styles.lineValue}>{difficultyStats.Intermediate}</Text></View>
          <Text style={styles.sectionTitle}>{t("categoryProgress")}</Text>
          {Object.keys(categoryStats).length === 0 ? <Text style={styles.empty}>{t("reviewEmpty")}</Text> : Object.entries(categoryStats).map(([category, count]) => (
            <View key={category} style={styles.line}><Text style={styles.lineLabel}>{categoryLabels[category as keyof typeof categoryLabels][language]}</Text><Text style={styles.lineValue}>{count}</Text></View>
          ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
}
