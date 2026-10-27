import { ReactNode, useRef } from "react";
import { Animated, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { liquidGlass } from "../../styles/glass";

type Props = { children: ReactNode; size?: number; onPress?: () => void; accessibilityLabel?: string; style?: StyleProp<ViewStyle> };
export default function GlassButton({ children, size = 40, onPress, accessibilityLabel, style }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const animateScale = (toValue: number) => Animated.spring(scale, { toValue, useNativeDriver: true, speed: 30, bounciness: 4 }).start();
  return <TouchableOpacity accessibilityRole="button" accessibilityLabel={accessibilityLabel} hitSlop={8} onPress={onPress} onPressIn={() => animateScale(0.94)} onPressOut={() => animateScale(1)} style={[styles.button, liquidGlass, { width: size, height: size, borderRadius: size / 2, transform: [{ scale }] }, style]}>{children}</TouchableOpacity>;
}
const styles = StyleSheet.create({ button: { alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF22", borderWidth: 1, borderColor: "#FFFFFF55", shadowColor: "#000", shadowOpacity: .15, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } } });
