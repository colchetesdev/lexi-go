import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Volume2, Search } from "lucide-react-native";
import Header from "@components/Header";
import BottomNav from "@components/BottomNav";
import GlassButton from "@components/GlassButton";
import TermTable from "@components/TermTable";
import { styles } from "./styles";
import { RootStackParamList } from "../../types/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { getDailyWord } from "../../data/dailyWords";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;
export default function Home({ navigation }: Props) {
  const { t } = useLanguage();
  const dailyWord = getDailyWord();
  const openDailyWord = () => navigation.push("Word", { term: dailyWord.term });
  return <ImageBackground source={require("@assets/background.png")} resizeMode="cover" style={styles.container}>
    <Header />
    <View style={styles.content}><Text style={styles.today}>{t("todayWordIs")}</Text><Text style={styles.word}>{dailyWord.term}</Text>
      <View style={styles.soundRow}><GlassButton size={40}><Volume2 color="#39284B" size={22}/></GlassButton><TouchableOpacity accessibilityRole="button" accessibilityLabel={t("seeMore")} activeOpacity={0.75} style={styles.seeMore} onPress={openDailyWord}><Text style={styles.seeMoreText}>{t("seeMore")}</Text><Search color="#1E1E1E" size={18}/></TouchableOpacity></View>
      <View style={styles.progressTrack}><View style={styles.progressFill}/></View><Text style={styles.progressLabel}>{t("discovered")}</Text>
      <TermTable title={t("relatedWords")} variant="related" rows={dailyWord.relatedTerms} compact onRowPress={(term) => navigation.navigate("Word", { term })} />
    </View><BottomNav navigation={navigation} active="home" />
  </ImageBackground>;
}
