import { useEffect, useState } from "react";
import { Animated, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { ArrowLeft, BadgeCheck, Check, Volume2 } from "lucide-react-native";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@components/Header";
import AppBackground from "@components/AppBackground";
import GlassButton from "@components/GlassButton";
import { styles } from "./styles";
import { useLanguage } from "../../context/LanguageContext";
import { getWordByTerm } from "../../data/dailyWords";
import { categoryLabels } from "../../data/wordCatalog";
import { recordHistoryTerm } from "../../data/progress";
import { liquidGlassLight } from "../../styles/glass";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Word">;

export default function Word({ navigation, route }: Props) {
  const { language, t } = useLanguage();
  const word = getWordByTerm(route.params?.term);
  const [marked, setMarked] = useState(false);
  const [saving, setSaving] = useState(false);
  const checkScale = useState(() => new Animated.Value(1))[0];
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const category = categoryLabels[word.category][language];
  const difficulty = word.difficulty === "Beginner" ? t("beginner") : t("intermediate");
  const horizontalMargin = Math.max(11, (width - Math.min(369, width - 22)) / 2);

  useEffect(() => {
    let active = true;
    void recordHistoryTerm(word.term);

    AsyncStorage.getItem("@marked_words").then((stored) => {
      if (!active) return;
      try {
        const parsed = stored ? JSON.parse(stored) as unknown : [];
        const markedWords = Array.isArray(parsed) ? parsed : [];
        setMarked(markedWords.some((term) => typeof term === "string" && term.toLowerCase() === word.term.toLowerCase()));
      } catch {
        setMarked(false);
      }
    }).catch(() => {
      if (active) setMarked(false);
    });

    return () => { active = false; };
  }, [word.term]);

  const toggleMarked = async () => {
    if (saving || marked) return;

    const nextMarked = true;
    let completionAnimationPending = false;
    setSaving(true);
    setMarked(nextMarked);

    try {
      const stored = await AsyncStorage.getItem("@marked_words");
      const parsed = stored ? JSON.parse(stored) as unknown : [];
      const markedWords = Array.isArray(parsed)
        ? parsed.filter((term): term is string => typeof term === "string")
        : [];
      const normalizedTerm = word.term.toLowerCase();
      const withoutCurrent = markedWords.filter((term) => term.toLowerCase() !== normalizedTerm);
      const updatedWords = nextMarked ? [...withoutCurrent, word.term] : withoutCurrent;

      await AsyncStorage.setItem("@marked_words", JSON.stringify(updatedWords));
      if (nextMarked) {
        completionAnimationPending = true;
        Animated.sequence([
          Animated.timing(checkScale, { toValue: 1.22, duration: 160, useNativeDriver: true }),
          Animated.spring(checkScale, { toValue: 1, useNativeDriver: true, speed: 24, bounciness: 6 }),
        ]).start(({ finished }) => {
          setSaving(false);
          if (finished) navigation.navigate("Home");
        });
      }
    } catch {
      setMarked(marked);
    } finally {
      if (!completionAnimationPending) setSaving(false);
    }
  };

  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

  return (
    <AppBackground style={styles.container}>
      <Header />
      <GlassButton accessibilityLabel={t("goBack")} size={48} onPress={goBack} style={[styles.back, { top: 64 + insets.top + 16, left: 12 }]}>
        <ArrowLeft color="#FFF" size={24}/>
      </GlassButton>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.word} numberOfLines={1} adjustsFontSizeToFit>{word.term}</Text>
          <View style={styles.pronunciation}>
            <Text style={styles.phonetic} numberOfLines={1} adjustsFontSizeToFit>{word.phonetic}</Text>
            <GlassButton accessibilityLabel={t("playPronunciation")} size={48} onPress={() => Speech.speak(word.term, { language: language === "pt" ? "pt-BR" : "en-US" })}>
              <Volume2 color="#FFF" size={24}/>
            </GlassButton>
          </View>
        </View>
        <View style={[styles.card, liquidGlassLight, { marginHorizontal: horizontalMargin }]}>
          <Text style={styles.cardTitle}>{t("definition")}</Text>
          <View style={styles.cardBody}>
            <Text style={styles.definition}>{word.definition[language]}</Text>
            <Text style={styles.exampleTitle}>{t("example")}</Text>
            <Text style={styles.definition}>{word.example[language]}</Text>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={marked ? t("completedWord") : t("markWord")}
              accessibilityState={{ selected: marked, disabled: marked || saving, busy: saving }}
              disabled={saving || marked}
              style={[styles.check, marked && styles.checkMarked, { transform: [{ scale: checkScale }] }]}
              onPress={toggleMarked}
            >
              {marked ? <BadgeCheck color="#FFF" size={25}/> : <Check color="#FFF" size={24}/>}
            </TouchableOpacity>
            <Text style={styles.meta}>{t("category")}: {category}</Text>
            <Text style={styles.meta}>{t("difficulty")}: {difficulty}</Text>
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
}
