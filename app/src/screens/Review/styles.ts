import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, height: "100%", minHeight: 0, overflow: "hidden", backgroundColor: "#242432" },
  back: { position: "absolute", left: 12, zIndex: 2 },
  scroll: { flex: 1, minHeight: 0 },
  scrollContent: { paddingTop: 78, paddingBottom: 28 },
  card: { marginHorizontal: 21, padding: 24, borderRadius: 24 },
  title: { color: "#39284B", fontFamily: "MontserratBold", fontSize: 22, lineHeight: 28, textAlign: "center" },
  description: { color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 14, lineHeight: 21, textAlign: "center", marginTop: 10, marginBottom: 18 },
  empty: { color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 14, lineHeight: 21, textAlign: "center", paddingVertical: 24 },
  row: { minHeight: 62, borderTopWidth: 1, borderTopColor: "#B9684D30", flexDirection: "row", alignItems: "center", paddingVertical: 11 },
  rowText: { flex: 1, minWidth: 0 },
  term: { color: "#1E1E1E", fontFamily: "MontserratBold", fontSize: 14 },
  category: { color: "#39284B", fontFamily: "MontserratRegular", fontSize: 12, marginTop: 3 },
  action: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#B9684D", borderWidth: 1, borderColor: "#D99478", alignItems: "center", justifyContent: "center", marginLeft: 10 },
});
