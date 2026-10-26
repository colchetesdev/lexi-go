import { ReactNode } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type Props = { children: ReactNode; size?: number; onPress?: () => void; accessibilityLabel?: string; style?: StyleProp<ViewStyle> };
export default function GlassButton({ children, size = 40, onPress, accessibilityLabel, style }: Props) {
  return <TouchableOpacity accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} style={[styles.button, { width: size, height: size, borderRadius: size / 2 }, style]}>{children}</TouchableOpacity>;
}
const styles = StyleSheet.create({ button: { alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF22", borderWidth: 1, borderColor: "#FFFFFF55", shadowColor: "#000", shadowOpacity: .15, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } } });
