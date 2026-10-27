import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, height: "100%", minHeight: 0, overflow: "hidden", backgroundColor: "#242432" },
  back: { position: "absolute", left: 12, zIndex: 2 },
  scroll: { flex: 1, minHeight: 0 },
  scrollContent: { paddingTop: 78, paddingBottom: 28 },
  card: { marginHorizontal: 21, padding: 24, borderRadius: 24 },
  title: { color: "#39284B", fontFamily: "MontserratBold", fontSize: 22, lineHeight: 28, textAlign: "center", marginBottom: 20 },
  statGrid: { flexDirection: "row", gap: 8, marginBottom: 24 },
  stat: { flex: 1, minHeight: 76, borderRadius: 16, backgroundColor: "#39284B", borderWidth: 1, borderColor: "#6D547E", alignItems: "center", justifyContent: "center", paddingHorizontal: 6 },
  statValue: { color: "#FFF", fontFamily: "MontserratBold", fontSize: 20 },
  statLabel: { color: "#FFF", fontFamily: "MontserratRegular", fontSize: 10, textAlign: "center", marginTop: 3 },
  sectionTitle: { color: "#39284B", fontFamily: "MontserratBold", fontSize: 16, marginTop: 16, marginBottom: 8 },
  line: { minHeight: 36, borderTopWidth: 1, borderTopColor: "#B9684D30", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  lineLabel: { color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 13, flexShrink: 1 },
  lineValue: { color: "#39284B", fontFamily: "MontserratBold", fontSize: 13, marginLeft: 12 },
  empty: { color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 13, lineHeight: 20, marginTop: 4 },
});
