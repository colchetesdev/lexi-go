import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        height:"100%",
        overflow: "hidden",
        minHeight: 0,
        backgroundColor: "#c28054",
    },
    content: { flex: 1, paddingTop: 34, paddingHorizontal: 21 },
    today: { color: "#FFF", fontFamily: "MontserratBold", fontSize: 28, lineHeight: 35 },
    word: { color: "#39284B", fontFamily: "MontserratBold", fontSize: 34, lineHeight: 40 },
    soundRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 14 },
    seeMore: { height: 40, width: 111, borderRadius: 20, borderWidth: 1, borderColor: "#FFFFFF55", backgroundColor: "#FFFFFF33", flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center" },
    seeMoreText: { fontFamily: "MontserratRegular", fontSize: 13, color: "#1E1E1E" },
    progressTrack: { height: 10, borderRadius: 5, backgroundColor: "#FFFFFF66", borderWidth: 1, borderColor: "#FFFFFF99", marginTop: 10 },
    progressFill: { width: "43%", height: "100%", borderRadius: 5, backgroundColor: "#1E1E1E" },
    progressLabel: { fontFamily: "MontserratRegular", color: "#1E1E1E", fontSize: 11, marginTop: 3 },
});
