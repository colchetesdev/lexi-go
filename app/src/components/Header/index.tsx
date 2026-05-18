import {View, Text, TouchableOpacity} from "react-native"
import {styles} from "./styles"
import { BookType } from "lucide-react-native"
import { useLanguage } from "../../context/LanguageContext";

export default function Header(){
    const { language, handleLanguage } = useLanguage();

    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <BookType color={"#FFF"}/>
                <Text style={styles.title}>LexiGo</Text>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.3} onPress={handleLanguage}>
                <Text style={[styles.buttonText, language === "pt" ? {color: "#FFF3F3"} : ""]}>
                {language === "en" ? "EN-US" : "PT-BR"}
                </Text>
            </TouchableOpacity>
        </View>
    )
}