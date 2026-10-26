import { ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "@components/Header";
import BottomNav from "@components/BottomNav";
import TermTable from "@components/TermTable";
import { styles } from "./styles";
import { RootStackParamList } from "../../types/navigation";
import { useLanguage } from "../../context/LanguageContext";

type Props = NativeStackScreenProps<RootStackParamList, "History">;
export default function History({ navigation }: Props){
    const { t } = useLanguage();
    return <ImageBackground source={require("@assets/background.png")} resizeMode="cover" style={styles.container}><Header/><TermTable title={t("history")} variant="history" rows={["Endpoint", "Endpoint", "Endpoint"]} onRowPress={(term) => navigation.navigate("Word", { term })}/><BottomNav navigation={navigation} active="history"/></ImageBackground>;
}
