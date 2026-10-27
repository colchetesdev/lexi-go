import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import Header from "@components/Header";
import AppBackground from "@components/AppBackground";
import BottomNav from "@components/BottomNav";
import TermTable from "@components/TermTable";
import { styles } from "./styles";
import { RootStackParamList } from "../../types/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getHistoryTerms } from "../../data/progress";
import { WordCategory, wordCatalog } from "../../data/wordCatalog";

type Props = NativeStackScreenProps<RootStackParamList, "History">;
type HistoryRow = { term: string; category: WordCategory };

export default function History({ navigation }: Props) {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [rows, setRows] = useState<HistoryRow[]>([]);

  const loadHistory = useCallback(async () => {
    const historyTerms = await getHistoryTerms();
    setRows(historyTerms.map((term) => {
      const entry = wordCatalog.find((word) => word.term.toLowerCase() === term.toLowerCase());
      return { term, category: entry?.category ?? "Back-end" };
    }));
  }, []);

  useFocusEffect(useCallback(() => {
    loadHistory();
  }, [loadHistory]));

  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

  return (
    <AppBackground style={styles.container}>
      <Header />
      <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("goBack")} hitSlop={8} activeOpacity={0.75} style={[styles.back, { top: 64 + insets.top + 17 }]} onPress={goBack}>
        <ArrowLeft color="#FFF" size={19}/>
      </TouchableOpacity>
      <TermTable title={t("history")} variant="history" rows={rows} onRowPress={(term) => navigation.navigate("Word", { term })}/>
      <BottomNav navigation={navigation} active="history"/>
    </AppBackground>
  );
}
