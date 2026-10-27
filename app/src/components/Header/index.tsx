import {View, Text, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {styles} from "./styles"
import { BookOpenText, Info } from "lucide-react-native"
import { useLanguage } from "../../context/LanguageContext";
import { RootStackParamList } from "../../types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { liquidGlass } from "../../styles/glass";

export default function Header(){
    const { language, handleLanguage, t } = useLanguage();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const insets = useSafeAreaInsets();

    return(
        <View style={[styles.container, liquidGlass, { paddingTop: insets.top, height: 64 + insets.top }]}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("goHome")} style={styles.textContainer} onPress={() => navigation.navigate("Home")}>
                <BookOpenText color="#FFF" size={20} strokeWidth={2.2}/>
                <Text style={styles.title}>LexiGo</Text>
            </TouchableOpacity>
            <View style={styles.actions}>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("about")} hitSlop={10} style={styles.infoButton} activeOpacity={0.75} onPress={() => navigation.navigate("About")}>
                    <Info color="#FFF" size={18}/>
                </TouchableOpacity>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel={t("changeLanguage")} accessibilityValue={{ text: language === "en" ? "EN-US" : "PT-BR" }} style={styles.button} activeOpacity={0.3} onPress={handleLanguage}>
                    <Text style={[styles.buttonText, language === "pt" && styles.buttonTextActive]}>
                    {language === "en" ? "EN-US" : "PT-BR"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
