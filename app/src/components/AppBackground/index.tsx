import { ReactNode, useId } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, RadialGradient, Rect, Stop } from "react-native-svg";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function AppBackground({ children, style }: Props) {
  const gradientId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  return (
    <View style={[styles.container, style]}>
      <Svg pointerEvents="none" width="100%" height="100%" viewBox="0 0 1000 1800" preserveAspectRatio="xMidYMid slice" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id={`${gradientId}-base`} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#8D503D" />
            <Stop offset="42%" stopColor="#5B4357" />
            <Stop offset="100%" stopColor="#242432" />
          </LinearGradient>
          <RadialGradient id={`${gradientId}-amber`} cx="8%" cy="8%" rx="82%" ry="45%" gradientUnits="objectBoundingBox">
            <Stop offset="0%" stopColor="#F2AE79" stopOpacity="0.22" />
            <Stop offset="55%" stopColor="#D98763" stopOpacity="0.08" />
            <Stop offset="100%" stopColor="#D98763" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id={`${gradientId}-violet`} cx="82%" cy="44%" rx="76%" ry="55%" gradientUnits="objectBoundingBox">
            <Stop offset="0%" stopColor="#A58DBF" stopOpacity="0.3" />
            <Stop offset="58%" stopColor="#79658F" stopOpacity="0.12" />
            <Stop offset="100%" stopColor="#79658F" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id={`${gradientId}-rose`} cx="22%" cy="78%" rx="74%" ry="52%" gradientUnits="objectBoundingBox">
            <Stop offset="0%" stopColor="#B86E61" stopOpacity="0.22" />
            <Stop offset="100%" stopColor="#B86E61" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="1000" height="1800" fill={`url(#${gradientId}-base)`} />
        <Rect width="1000" height="1800" fill={`url(#${gradientId}-amber)`} />
        <Rect width="1000" height="1800" fill={`url(#${gradientId}-violet)`} />
        <Rect width="1000" height="1800" fill={`url(#${gradientId}-rose)`} />
        <Circle cx="870" cy="260" r="250" fill="none" stroke="#FFFFFF" strokeOpacity="0.045" strokeWidth="1.5" />
        <Circle cx="870" cy="260" r="330" fill="none" stroke="#FFFFFF" strokeOpacity="0.025" strokeWidth="1.5" />
        <Ellipse cx="-40" cy="1420" rx="430" ry="250" fill="none" stroke="#F5D1B2" strokeOpacity="0.04" strokeWidth="1.5" />
        <Path d="M-80 1040 C180 930 355 1110 590 1010 C760 938 860 900 1080 990" fill="none" stroke="#FFFFFF" strokeOpacity="0.035" strokeWidth="2" />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 0, overflow: "hidden", backgroundColor: "#242432" },
});
