import { Platform } from "react-native";

export const liquidGlass = {
  backgroundColor: "#FFFFFF30",
  borderWidth: 1,
  borderColor: "#FFFFFF72",
  shadowColor: "#160D20",
  shadowOpacity: 0.24,
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 10 },
  elevation: 6,
  ...(Platform.OS === "web" ? {
    backdropFilter: "blur(20px) saturate(145%)",
    WebkitBackdropFilter: "blur(20px) saturate(145%)",
  } : {}),
} as any;

export const liquidGlassLight = {
  ...liquidGlass,
  backgroundColor: "#F6F1F3D9",
  borderColor: "#FFFFFFD9",
  shadowOpacity: 0.2,
  elevation: 5,
};
