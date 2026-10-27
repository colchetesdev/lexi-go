import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft, ArrowUpRight } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@components/Header";
import AppBackground from "@components/AppBackground";
import GlassButton from "@components/GlassButton";
import { RootStackParamList } from "../../types/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { getDailyReviewWords, getLearnedTerms } from "../../data/progress";
import { categoryLabels, CatalogWord } from "../../data/wordCatalog";
import { styles } from "./styles";
import { liquidGlassLight } from "../../styles/glass";

type Props = NativeStackScreenProps<RootStackParamList, "Review">;

export default function Review({ navigation }: Props) {
  const { language, t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [reviewWords, setReviewWords] = useState<CatalogWord[]>([]);

  const loadReview = useCallback(async () => {
    setReviewWords(getDailyReviewWords(await getLearnedTerms()));
  }, []);

  useFocusEffect(useCallback(() => {
    loadReview();
  }, [loadReview]));

  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

  return (
    <AppBackground style={styles.container}>
      <Header />
      <GlassButton accessibilityLabel={t("goBack")} size={48} onPress={goBack} style={[styles.back, { top: 64 + insets.top + 16 }]}>
        <ArrowLeft color="#FFF" size={24}/>
      </GlassButton>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, liquidGlassLight]}>
          <Text style={styles.title}>{t("dailyReview")}</Text>
          <Text style={styles.description}>{t("reviewDescription")}</Text>
          {reviewWords.length === 0 ? <Text style={styles.empty}>{t("reviewEmpty")}</Text> : reviewWords.map((word) => (
            <TouchableOpacity key={word.term} accessibilityRole="button" accessibilityLabel={`${t("openTerm")}: ${word.term}`} style={styles.row} onPress={() => navigation.navigate("Word", { term: word.term })}>
              <View style={styles.rowText}>
                <Text style={styles.term}>{word.term}</Text>
                <Text style={styles.category}>{categoryLabels[word.category][language]}</Text>
              </View>
              <View style={styles.action}><ArrowUpRight color="#FFF" size={15}/></View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
}
