import { ArrowUpRight, History } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useLanguage } from "../../context/LanguageContext";
import { categoryLabels, WordCategory, wordCatalog } from "../../data/wordCatalog";
import { liquidGlassLight } from "../../styles/glass";

type Row = string | { term: string; category: WordCategory };
type Props = { title: string; rows: Row[]; variant: "related" | "history" | "results"; compact?: boolean; embedded?: boolean; top?: number; onRowPress?: (term: string) => void; onRowsScroll?: (offsetY: number) => void };
export default function TermTable({ title, rows, variant, compact = false, embedded = false, top, onRowPress, onRowsScroll }: Props) {
  const { language, t } = useLanguage();
  const { width, height } = useWindowDimensions();
  const cardWidth = Math.max(1, Math.min(345, width - 32));
  const cardTop = top ?? (compact ? 390 : 90);
  const cardHeight = compact ? 246 : Math.min(534, Math.max(260, height - cardTop - 110));
  const titleBarStyle = variant === "related" ? styles.relatedTitle : variant === "history" ? styles.historyTitle : styles.resultsTitle;
  return <View style={[styles.card, liquidGlassLight, embedded ? styles.embeddedCard : { width: cardWidth, left: (width - cardWidth) / 2, top: cardTop, height: cardHeight }, embedded && { width: cardWidth, height: cardHeight }]}>
    <View style={[styles.titleBar, titleBarStyle]}>{variant === "history" && <History color="#FFF" size={20}/>}<Text style={styles.title}>{title}</Text></View>
    <View style={styles.headers}><Text style={styles.header}>{t("term")}</Text><Text style={styles.header}>{t("category")}</Text></View>
    <ScrollView style={styles.rows} contentContainerStyle={rows.length === 0 ? styles.emptyContainer : undefined} showsVerticalScrollIndicator={false} nestedScrollEnabled onScroll={(event) => onRowsScroll?.(event.nativeEvent.contentOffset.y)} scrollEventThrottle={16}>
      {rows.length === 0 ? <Text style={styles.empty}>{t("noResults")}</Text> : rows.map((row, index) => { const term = typeof row === "string" ? row : row.term; const catalogEntry = typeof row === "string" ? wordCatalog.find((word) => word.term.toLowerCase() === term.toLowerCase()) : undefined; const category = typeof row === "string" ? categoryLabels[catalogEntry?.category ?? "Back-end"][language] : categoryLabels[row.category][language]; return <View key={`${term}-${index}`} style={styles.row}><Text style={styles.cell}>{term}</Text><Text style={styles.cell}>{category}</Text><TouchableOpacity accessibilityRole="button" accessibilityLabel={`${t("openTerm")}: ${term}`} hitSlop={6} style={styles.action} onPress={() => onRowPress?.(term)}><ArrowUpRight color="#FFF" size={14}/></TouchableOpacity></View>; })}
    </ScrollView>
  </View>;
}
const styles = StyleSheet.create({ card: { position: "absolute", backgroundColor: "#F6F1F3E8", borderRadius: 23, overflow: "hidden" }, embeddedCard: { position: "relative", alignSelf: "center", left: undefined, top: undefined, marginTop: 30 }, titleBar: { minHeight: 50, flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", paddingHorizontal: 15, paddingVertical: 12 }, relatedTitle: { backgroundColor: "#39284B", justifyContent: "flex-start" }, historyTitle: { backgroundColor: "#39284B" }, resultsTitle: { backgroundColor: "#39284B", justifyContent: "flex-start" }, title: { color: "#FFF", fontFamily: "MontserratBold", fontSize: 16, letterSpacing: 0.15, flexShrink: 1 }, headers: { height: 30, backgroundColor: "#E8DCE1", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, alignItems: "center" }, header: { color: "#39284B", fontFamily: "MontserratSemibold", fontSize: 11, letterSpacing: 0.3 }, rows: { flex: 1, minHeight: 0 }, emptyContainer: { flexGrow: 1 }, row: { minHeight: 50, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#39284B16" }, cell: { flex: 1, minWidth: 0, color: "#29212D", fontFamily: "MontserratRegular", fontSize: 12 }, empty: { color: "#39284B", fontFamily: "MontserratRegular", fontSize: 14, textAlign: "center", marginTop: 28 }, action: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#B9684D", borderWidth: 1, borderColor: "#D99478", alignItems: "center", justifyContent: "center" } });
