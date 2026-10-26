import { ArrowUpRight, History } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useLanguage } from "../../context/LanguageContext";
import { categoryLabels, WordCategory } from "../../data/wordCatalog";

type Row = string | { term: string; category: WordCategory };
type Props = { title: string; rows: Row[]; variant: "related" | "history" | "results"; compact?: boolean; top?: number; onRowPress?: (term: string) => void };
export default function TermTable({ title, rows, variant, compact = false, top, onRowPress }: Props) {
  const { language, t } = useLanguage();
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / 393, height / 852);
  const cardWidth = Math.min(345 * scale, width - 32);
  const cardTop = (top ?? (compact ? 390 : 90)) * scale;
  const cardHeight = compact ? Math.max(220, 246 * scale) : Math.min(534 * scale, Math.max(260, height - cardTop - 110));
  const titleBarStyle = variant === "related" ? styles.relatedTitle : variant === "history" ? styles.historyTitle : styles.resultsTitle;
  return <View style={[styles.card, { width: cardWidth, left: (width - cardWidth) / 2, top: cardTop, height: cardHeight }]}>
    <View style={[styles.titleBar, titleBarStyle]}>{title === "History" && <History color="#FFF" size={20}/>}<Text style={styles.title}>{title}</Text></View>
    <View style={styles.headers}><Text style={styles.header}>{t("term")}</Text><Text style={styles.header}>{t("category")}</Text></View>
    {rows.length === 0 ? <Text style={styles.empty}>{t("noResults")}</Text> : rows.map((row, index) => { const term = typeof row === "string" ? row : row.term; const category = typeof row === "string" ? t("backEnd") : categoryLabels[row.category][language]; return <View key={`${term}-${index}`} style={styles.row}><Text style={styles.cell}>{term}</Text><Text style={styles.cell}>{category}</Text><TouchableOpacity accessibilityRole="button" style={styles.action} onPress={() => onRowPress?.(term)}><ArrowUpRight color="#FFF" size={14}/></TouchableOpacity></View>; })}
  </View>;
}
const styles = StyleSheet.create({ card: { position: "absolute", backgroundColor: "#E5E5E5", borderRadius: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: .25, shadowRadius: 6, shadowOffset: { width: 0, height: 8 } }, titleBar: { height: 48, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", padding: 12 }, relatedTitle: { backgroundColor: "#39284B", justifyContent: "flex-start" }, historyTitle: { backgroundColor: "#1E1E1E" }, resultsTitle: { backgroundColor: "#1E1E1E", justifyContent: "flex-start" }, title: { color: "#FFF", fontFamily: "MontserratBold", fontSize: 16 }, headers: { height: 26, backgroundColor: "#E5E5E5", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, alignItems: "center" }, header: { color: "#39284B", fontFamily: "MontserratSemibold", fontSize: 12 }, row: { minHeight: 48, flexDirection: "row", alignItems: "center", paddingHorizontal: 16 }, cell: { flex: 1, color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 12 }, empty: { color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 14, textAlign: "center", marginTop: 28 }, action: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#1E1E1E", alignItems: "center", justifyContent: "center" } });
