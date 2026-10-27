import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        height:"100%",
        overflow: "hidden",
        minHeight: 0,
        backgroundColor: "#242432",
    },
    content: { flex: 1, minHeight: 0 },
    contentContainer: { paddingTop: 38, paddingHorizontal: 22, paddingBottom: 112 },
    today: { color: "#F5E9E5", fontFamily: "MontserratSemibold", fontSize: 17, lineHeight: 24, letterSpacing: 0.2 },
    word: { color: "#F0B18F", fontFamily: "MontserratBold", fontSize: 36, lineHeight: 44, letterSpacing: 0.25 },
    soundRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
    soundButton: { backgroundColor: "#F6F1F3D9", borderColor: "#FFFFFFD9" },
    seeMore: { height: 42, width: 116, borderRadius: 21, borderWidth: 1, borderColor: "#FFFFFFC7", backgroundColor: "#F6F1F3D9", flexDirection: "row", gap: 9, alignItems: "center", justifyContent: "center" },
    seeMoreText: { fontFamily: "MontserratRegular", fontSize: 13, color: "#1E1E1E" },
    progressTrack: { height: 9, borderRadius: 5, backgroundColor: "#241A2E80", borderWidth: 1, borderColor: "#FFFFFF38", marginTop: 13, overflow: "hidden" },
    progressFill: { height: "100%", borderRadius: 5, backgroundColor: "#E6A17F" },
    progressLabel: { fontFamily: "MontserratRegular", color: "#F4EAE7", fontSize: 11, marginTop: 6 },
    quickActions: { flexDirection: "row", gap: 10, marginTop: 17 },
    quickAction: { flex: 1, minHeight: 44, borderRadius: 17, borderWidth: 1, borderColor: "#FFFFFFB8", backgroundColor: "#F6F1F3D9", flexDirection: "row", gap: 7, alignItems: "center", justifyContent: "center", paddingHorizontal: 10 },
    quickActionText: { fontFamily: "MontserratSemibold", fontSize: 12, color: "#39284B", flexShrink: 1 },
});
