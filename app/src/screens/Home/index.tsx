import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarChart3, RotateCcw, Search, Volume2 } from "lucide-react-native";
import * as Speech from "expo-speech";
import Header from "@components/Header";
import AppBackground from "@components/AppBackground";
import BottomNav from "@components/BottomNav";
import GlassButton from "@components/GlassButton";
import TermTable from "@components/TermTable";
import { styles } from "./styles";
import { RootStackParamList } from "../../types/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useLanguage } from "../../context/LanguageContext";
import { getDailyWord } from "../../data/dailyWords";
import { wordCatalog } from "../../data/wordCatalog";
import { getLearnedTerms } from "../../data/progress";
import { liquidGlassLight } from "../../styles/glass";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;
export default function Home({ navigation }: Props) {
  const { language, t } = useLanguage();
  const dailyWord = getDailyWord();
  const [markedCount, setMarkedCount] = useState(0);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const totalWords = wordCatalog.length;
  const progress = totalWords > 0 ? Math.min(markedCount / totalWords, 1) : 0;
  const discoveredLabel = t("discoveredCount").replace("{{count}}", String(markedCount)).replace("{{total}}", String(totalWords));

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 280,
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnimation]);

  const loadProgress = useCallback(async () => {
    setMarkedCount((await getLearnedTerms()).length);
  }, []);

  useFocusEffect(useCallback(() => {
    loadProgress();
  }, [loadProgress]));

  const openDailyWord = () => navigation.push("Word", { term: dailyWord.term });
  const playDailyWord = async () => {
    await Speech.stop();
    Speech.speak(dailyWord.term, { language: language === "pt" ? "pt-BR" : "en-US" });
  };
  return <AppBackground style={styles.container}>
    <Header />
    <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.today}>{t("todayWordIs")}</Text><Text numberOfLines={1} adjustsFontSizeToFit style={styles.word}>{dailyWord.term}</Text>
      <View style={styles.soundRow}><GlassButton size={40} accessibilityLabel={t("playPronunciation")} onPress={playDailyWord} style={styles.soundButton}><Volume2 color="#39284B" size={22}/></GlassButton><TouchableOpacity accessibilityRole="button" accessibilityLabel={t("seeMore")} activeOpacity={0.75} style={[styles.seeMore, liquidGlassLight]} onPress={openDailyWord}><Text style={styles.seeMoreText}>{t("seeMore")}</Text><Search color="#39284B" size={18}/></TouchableOpacity></View>
      <View accessible accessibilityRole="progressbar" accessibilityLabel={discoveredLabel} accessibilityValue={{ min: 0, max: totalWords, now: markedCount, text: discoveredLabel }} style={styles.progressTrack}><Animated.View style={[styles.progressFill, { width: progressAnimation.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }]}/></View><Text style={styles.progressLabel}>{discoveredLabel}</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("openReview")} activeOpacity={0.78} style={[styles.quickAction, liquidGlassLight]} onPress={() => navigation.navigate("Review")}>
          <Text style={styles.quickActionText}>{t("dailyReview")}</Text><RotateCcw color="#39284B" size={16}/>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("openStatistics")} activeOpacity={0.78} style={[styles.quickAction, liquidGlassLight]} onPress={() => navigation.navigate("Statistics")}>
          <Text style={styles.quickActionText}>{t("statistics")}</Text><BarChart3 color="#39284B" size={16}/>
        </TouchableOpacity>
      </View>
      <TermTable title={t("relatedWords")} variant="related" rows={dailyWord.relatedTerms} compact embedded onRowPress={(term) => navigation.navigate("Word", { term })} />
    </ScrollView><BottomNav navigation={navigation} active="home" />
  </AppBackground>;
}
