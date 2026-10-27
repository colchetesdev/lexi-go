import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 64,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#FFFFFF24",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontFamily: "MontserratBold",
    fontSize: 22,
    letterSpacing: 0.3,
    color: "#FFF",
    marginLeft: 8,
  },
  button: {
    minHeight: 32,
    justifyContent: "center",
    borderRadius: 14,
    paddingHorizontal: 4,
    backgroundColor: "#FFFFFF20",
    borderWidth: 1,
    borderColor: "#FFFFFF3D",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  infoButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#FFFFFF20",
    borderWidth: 1,
    borderColor: "#FFFFFF3D",
  },
  buttonText: {
    fontFamily: "MontserratSemibold",
    fontSize: 12,
    color: "#FFF",
    letterSpacing: 0.35,
    marginHorizontal: 8,
  },
  buttonTextActive: {
    color: "#FFF3F3",
  },
});
