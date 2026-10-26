import {View, Text, TouchableOpacity} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {styles} from "./styles"
import { BookOpenText, Info } from "lucide-react-native"
import { useLanguage } from "../../context/LanguageContext";
import { RootStackParamList } from "../../types/navigation";

export default function Header(){
    const { language, handleLanguage } = useLanguage();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return(
        <View style={styles.container}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go to home" style={styles.textContainer} onPress={() => navigation.navigate("Home")}>
                <BookOpenText color="#FFF" size={20} strokeWidth={2.2}/>
                <Text style={styles.title}>LexiGo</Text>
            </TouchableOpacity>
            <View style={styles.actions}>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="About LexiGo" style={styles.infoButton} activeOpacity={0.75} onPress={() => navigation.navigate("About")}>
                    <Info color="#1E1E1E" size={18}/>
                </TouchableOpacity>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="Change language" style={styles.button} activeOpacity={0.3} onPress={handleLanguage}>
                    <Text style={[styles.buttonText, language === "pt" && styles.buttonTextActive]}>
                    {language === "en" ? "EN-US" : "PT-BR"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
