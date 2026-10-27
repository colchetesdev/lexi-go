import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotateCcw, Search, Dices } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { RootStackParamList } from "../../types/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { liquidGlass } from "../../styles/glass";

type Route = "home" | "history";
type Props = { navigation: NativeStackNavigationProp<RootStackParamList, keyof RootStackParamList>; active: Route };
export default function BottomNav({ navigation, active }: Props) {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const navWidth = Math.max(0, Math.min(282, width - 24));
  const circleSize = Math.min(52, Math.max(44, (navWidth - 34) / 3));
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate("Home");
  };
  return <View style={[styles.container, liquidGlass, { width: navWidth, bottom: Math.max(12, insets.bottom + 12, Math.min(20, height * 0.025)) }]}>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("previousScreen")} hitSlop={8} style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]} onPress={goBack}><RotateCcw color="#FFF" size={22}/></TouchableOpacity>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("openSearch")} accessibilityState={{ selected: active === "home" }} hitSlop={8} style={[styles.circle, active === "home" && styles.active, { width: circleSize + 4, height: circleSize + 4, borderRadius: (circleSize + 4) / 2 }]} onPress={() => navigation.push("Search")}><Search color="#FFF" size={23}/></TouchableOpacity>
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("openHistory")} accessibilityState={{ selected: active === "history" }} hitSlop={8} style={[styles.circle, active === "history" && styles.active, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]} onPress={() => navigation.navigate("History")}><Dices color="#FFF" size={22}/></TouchableOpacity>
  </View>;
}
const styles = StyleSheet.create({ container: { position: "absolute", bottom: 20, alignSelf: "center", height: 70, borderRadius: 26, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }, circle: { alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF18", borderWidth: 1, borderColor: "#FFFFFF38" }, active: { backgroundColor: "#B9684D", borderColor: "#E5A184", borderWidth: 1 } });
