import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Volume2, Search } from "lucide-react-native";
import Header from "@components/Header";
import BottomNav from "@components/BottomNav";
import GlassButton from "@components/GlassButton";
import TermTable from "@components/TermTable";
import { styles } from "./styles";
import { RootStackParamList } from "../../types/navigation";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;
export default function Home({ navigation }: Props) {
  return <ImageBackground source={require("@assets/background.png")} resizeMode="cover" style={styles.container}>
    <Header />
    <View style={styles.content}><Text style={styles.today}>Today, the word is</Text><Text style={styles.word}>API</Text>
      <View style={styles.soundRow}><GlassButton size={40}><Volume2 color="#39284B" size={22}/></GlassButton><TouchableOpacity style={styles.seeMore} onPress={() => navigation.navigate("Word")}><Text style={styles.seeMoreText}>See more</Text><Search color="#1E1E1E" size={18}/></TouchableOpacity></View>
      <View style={styles.progressTrack}><View style={styles.progressFill}/></View><Text style={styles.progressLabel}>99 of 156 discovered</Text>
      <TermTable title="Related words" rows={["Endpoint", "Backend", "Devops"]} compact />
    </View><BottomNav navigation={navigation} active="home" />
  </ImageBackground>;
}
