import { ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header from "@components/Header";
import BottomNav from "@components/BottomNav";
import TermTable from "@components/TermTable";
import { styles } from "./styles";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "History">;
export default function History({ navigation }: Props){
    return <ImageBackground source={require("@assets/background.png")} resizeMode="cover" style={styles.container}><Header/><TermTable title="History" rows={["Endpoint", "Endpoint", "Endpoint"]}/><BottomNav navigation={navigation} active="history"/></ImageBackground>;
}
