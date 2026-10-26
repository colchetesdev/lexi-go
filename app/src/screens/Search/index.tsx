import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Search as SearchIcon, SlidersHorizontal, X } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "@components/Header";
import BottomNav from "@components/BottomNav";
import TermTable from "@components/TermTable";
import { styles } from "./styles";
import { RootStackParamList } from "../../types/navigation";
type Props = NativeStackScreenProps<RootStackParamList, "Search">;
export default function Search({ navigation }: Props) { return <ImageBackground source={require("@assets/background.png")} resizeMode="cover" style={styles.container}><Header/><View style={styles.searchBox}><TextInput placeholder="Search a word" placeholderTextColor="#E3E3E3" style={styles.input}/><SearchIcon color="#FFF" size={19}/></View><TouchableOpacity style={styles.filter}><Text style={styles.filterText}>Apply filters</Text><SlidersHorizontal color="#FFF" size={20}/></TouchableOpacity><TermTable title="Results" rows={["Endpoint", "Endpoint", "Endpoint"]}/><TouchableOpacity style={styles.close} onPress={() => navigation.navigate("Home")}><X color="#FFF" size={24}/></TouchableOpacity><BottomNav navigation={navigation} active="history"/></ImageBackground>; }
