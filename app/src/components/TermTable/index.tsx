import { ArrowUpRight, History } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = { title: string; rows: string[]; compact?: boolean };
export default function TermTable({ title, rows, compact = false }: Props) {
  return <View style={[styles.card, compact && styles.compact]}>
    <View style={styles.titleBar}>{title === "History" && <History color="#FFF" size={20}/>}<Text style={styles.title}>{title}</Text></View>
    <View style={styles.headers}><Text style={styles.header}>Term</Text><Text style={styles.header}>Category</Text></View>
    {rows.map((term, index) => <View key={`${term}-${index}`} style={styles.row}><Text style={styles.cell}>{term}</Text><Text style={styles.cell}>Back-end</Text><TouchableOpacity style={styles.action}><ArrowUpRight color="#FFF" size={14}/></TouchableOpacity></View>)}
  </View>;
}
const styles = StyleSheet.create({ card: { position: "absolute", left: 21, right: 21, top: 90, height: 482, backgroundColor: "#E5E5E5", borderRadius: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: .25, shadowRadius: 6, shadowOffset: { width: 0, height: 8 } }, compact: { top: 255, height: 246 }, titleBar: { height: 48, backgroundColor: "#1E1E1E", flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", padding: 12 }, title: { color: "#FFF", fontFamily: "MontserratBold", fontSize: 16 }, headers: { height: 26, backgroundColor: "#E5E5E5", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, alignItems: "center" }, header: { color: "#39284B", fontFamily: "MontserratSemibold", fontSize: 12 }, row: { minHeight: 48, flexDirection: "row", alignItems: "center", paddingHorizontal: 16 }, cell: { flex: 1, color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 12 }, action: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#1E1E1E", alignItems: "center", justifyContent: "center" } });
