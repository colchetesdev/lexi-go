import { NavigationProp } from "@react-navigation/native";
import { RotateCcw, Search, Dices } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { RootStackParamList } from "../../types/navigation";

type Route = "home" | "history";
type Props = { navigation: NavigationProp<RootStackParamList>; active: Route };
export default function BottomNav({ navigation, active }: Props) {
  const { width, height } = useWindowDimensions();
  const navWidth = Math.min(282, width - 24);
  const circleSize = Math.min(52, Math.max(44, (navWidth - 34) / 3));
  return <View style={[styles.container, { width: navWidth, bottom: Math.max(12, Math.min(20, height * 0.025)) }]}>
    <TouchableOpacity style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]} onPress={() => navigation.goBack()}><RotateCcw color="#1E1E1E" size={22}/></TouchableOpacity>
    <TouchableOpacity style={[styles.circle, active === "home" && styles.active, { width: circleSize + 4, height: circleSize + 4, borderRadius: (circleSize + 4) / 2 }]} onPress={() => navigation.navigate("Search")}><Search color="#FFF" size={23}/></TouchableOpacity>
    <TouchableOpacity style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]} onPress={() => navigation.navigate("History")}><Dices color="#FFF" size={22}/></TouchableOpacity>
  </View>;
}
const styles = StyleSheet.create({ container: { position: "absolute", bottom: 20, alignSelf: "center", height: 64, borderRadius: 24, backgroundColor: "#E3E3E31A", borderWidth: 1, borderColor: "#FFFFFF1A", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", shadowColor: "#000", shadowOpacity: .25, shadowRadius: 4, shadowOffset: { width: 0, height: 4 } }, circle: { alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF1A", borderWidth: 1, borderColor: "#FFFFFF1A" }, active: { backgroundColor: "#39284B", borderWidth: 0 } });
