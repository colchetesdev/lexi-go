import { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { ArrowLeft, Check, Volume2 } from "lucide-react-native";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "@components/Header";
import GlassButton from "@components/GlassButton";
import { styles } from "./styles";
import { useLanguage } from "../../context/LanguageContext";
import { getWordByTerm } from "../../data/dailyWords";
import { categoryLabels } from "../../data/wordCatalog";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Word">;

export default function Word({ navigation, route }: Props) {
  const { language, t } = useLanguage();
  const word = getWordByTerm(route.params?.term);
  const [marked, setMarked] = useState(false);
  const category = categoryLabels[word.category][language];
  const difficulty = word.difficulty === "Beginner" ? t("beginner") : t("intermediate");
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem("@marked_words").then((stored) => {
      if (!active || !stored) return;
      try {
        const markedWords = JSON.parse(stored) as string[];
        setMarked(markedWords.includes(word.term));
      } catch {
        setMarked(false);
      }
    });
    return () => { active = false; };
  }, [word.term]);

  const toggleMarked = async () => {
    const nextMarked = !marked;
    setMarked(nextMarked);
    try {
      const stored = await AsyncStorage.getItem("@marked_words");
      const markedWords = stored ? JSON.parse(stored) as string[] : [];
      const updatedWords = nextMarked ? [...new Set([...markedWords, word.term])] : markedWords.filter((term) => term !== word.term);
      await AsyncStorage.setItem("@marked_words", JSON.stringify(updatedWords));
    } catch {
      // A mudança visual continua funcionando mesmo se o armazenamento não estiver disponível.
    }
  };
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 393, height / 852);
  const cardHeight = Math.max(360, Math.min(440 * scale, height - 250));
  const horizontalMargin = Math.max(11, (width - Math.min(369 * scale, width - 22)) / 2);
  return <ImageBackground source={require("@assets/background.png")} resizeMode="cover" style={styles.container}><Header/><GlassButton accessibilityLabel="Go back" size={48} onPress={() => navigation.goBack()} style={[styles.back, { top: 80 * scale, left: 12 * scale }]}><ArrowLeft color="#FFF" size={24}/></GlassButton><View style={[styles.hero, { marginTop: 71 * scale }]}><Text style={styles.word}>{word.term}</Text><View style={styles.pronunciation}><Text style={styles.phonetic}>{word.phonetic}</Text><GlassButton accessibilityLabel="Play pronunciation" size={48} onPress={() => Speech.speak(word.term, { language: language === "pt" ? "pt-BR" : "en-US" })}><Volume2 color="#FFF" size={24}/></GlassButton></View></View><View style={[styles.card, { height: cardHeight, marginHorizontal: horizontalMargin }]}><Text style={styles.cardTitle}>{t("definition")}</Text><View style={styles.cardBody}><Text style={styles.definition}>{word.definition[language]}</Text><Text style={styles.exampleTitle}>{t("example")}</Text><Text style={styles.definition}>{word.example[language]}</Text><TouchableOpacity accessibilityRole="button" accessibilityLabel={marked ? t("unmarkWord") : t("markWord")} accessibilityState={{ selected: marked }} style={[styles.check, marked && styles.checkMarked]} onPress={toggleMarked}><Check color="#FFF" size={24}/></TouchableOpacity><Text style={styles.meta}>{t("category")}: {category}</Text><Text style={styles.meta}>{t("difficulty")}: {difficulty}</Text></View></View></ImageBackground>;
}
