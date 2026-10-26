import { NavigationProp } from "@react-navigation/native";
import { RotateCcw, Search, Dices } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../types/navigation";

type Route = "home" | "history";
type Props = { navigation: NavigationProp<RootStackParamList>; active: Route };
export default function BottomNav({ navigation, active }: Props) {
  return <View style={styles.container}>
    <TouchableOpacity style={styles.circle} onPress={() => navigation.goBack()}><RotateCcw color="#1E1E1E" size={22}/></TouchableOpacity>
    <TouchableOpacity style={[styles.circle, active === "home" && styles.active]} onPress={() => navigation.navigate("Search")}><Search color="#FFF" size={23}/></TouchableOpacity>
    <TouchableOpacity style={styles.circle} onPress={() => navigation.navigate("History")}><Dices color="#FFF" size={22}/></TouchableOpacity>
  </View>;
}
const styles = StyleSheet.create({ container: { position: "absolute", bottom: 20, alignSelf: "center", width: 282, height: 64, borderRadius: 24, backgroundColor: "#E3E3E31A", borderWidth: 1, borderColor: "#FFFFFF1A", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", shadowColor: "#000", shadowOpacity: .25, shadowRadius: 4, shadowOffset: { width: 0, height: 4 } }, circle: { width: 52, height: 52, borderRadius: 28, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF1A", borderWidth: 1, borderColor: "#FFFFFF1A" }, active: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#39284B", borderWidth: 0 } });
