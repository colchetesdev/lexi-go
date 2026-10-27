import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, height: "100%", minHeight: 0, overflow: "hidden", backgroundColor: "#242432" },
  back: { position: "absolute", top: 80, left: 12 },
  scroll: { flex: 1, minHeight: 0 },
  scrollContent: { paddingTop: 78, paddingBottom: 28 },
  card: { marginHorizontal: 21, padding: 24, borderRadius: 24 },
  icon: { alignSelf: "center", width: 54, height: 54, borderRadius: 27, alignItems: "center", justifyContent: "center", backgroundColor: "#39284B", marginBottom: 14 },
  title: { color: "#39284B", fontFamily: "MontserratBold", fontSize: 22, lineHeight: 28, textAlign: "center" },
  description: { color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 14, lineHeight: 21, textAlign: "left", marginTop: 14 },
  divider: { height: 1, backgroundColor: "#B9684D45", marginVertical: 21 },
  sectionTitle: { color: "#39284B", fontFamily: "MontserratBold", fontSize: 16 },
  item: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginTop: 14 },
  itemText: { flex: 1, color: "#1E1E1E", fontFamily: "MontserratRegular", fontSize: 14, lineHeight: 20 },
  audienceHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
});
