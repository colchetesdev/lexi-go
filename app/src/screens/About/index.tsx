import { ScrollView, Text, View } from "react-native";
import { ArrowLeft, BookOpenText, CheckCircle2, Target } from "lucide-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import GlassButton from "@components/GlassButton";
import AppBackground from "@components/AppBackground";
import Header from "@components/Header";
import { useLanguage } from "../../context/LanguageContext";
import { RootStackParamList } from "../../types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";
import { liquidGlassLight } from "../../styles/glass";

type Props = NativeStackScreenProps<RootStackParamList, "About">;

export default function About({ navigation }: Props) {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const goBack = () => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home");

  return <AppBackground style={styles.container}>
    <Header />
    <GlassButton accessibilityLabel={t("goBack")} size={48} onPress={goBack} style={[styles.back, { top: 64 + insets.top + 16 }]}><ArrowLeft color="#FFF" size={24}/></GlassButton>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.card, liquidGlassLight]}>
      <View style={styles.icon}><BookOpenText color="#FFF" size={26}/></View>
      <Text style={styles.title}>{t("aboutTitle")}</Text>
      <Text style={styles.description}>{t("aboutDescription")}</Text>
      <View style={styles.divider}/>
      <Text style={styles.sectionTitle}>{t("aboutProjectTitle")}</Text>
      <Text style={styles.description}>{t("aboutProjectText")}</Text>
      <View style={styles.divider}/>
      <Text style={styles.sectionTitle}>{t("aboutUtilityTitle")}</Text>
      <View style={styles.item}><CheckCircle2 color="#B9684D" size={20}/><Text style={styles.itemText}>{t("aboutUtilityOne")}</Text></View>
      <View style={styles.item}><CheckCircle2 color="#B9684D" size={20}/><Text style={styles.itemText}>{t("aboutUtilityTwo")}</Text></View>
      <View style={styles.item}><CheckCircle2 color="#B9684D" size={20}/><Text style={styles.itemText}>{t("aboutUtilityThree")}</Text></View>
      <View style={styles.divider}/>
      <Text style={styles.sectionTitle}>{t("aboutLearningTitle")}</Text>
      <Text style={styles.description}>{t("aboutLearningText")}</Text>
      <View style={styles.divider}/>
      <Text style={styles.sectionTitle}>{t("aboutDevelopmentTitle")}</Text>
      <Text style={styles.description}>{t("aboutDevelopmentText")}</Text>
      <View style={styles.divider}/>
      <Text style={styles.sectionTitle}>{t("aboutCollaboratorsTitle")}</Text>
      <Text style={styles.description}>{t("aboutCollaboratorsText")}</Text>
      <View style={styles.divider}/>
      <View style={styles.audienceHeader}><Target color="#B9684D" size={20}/><Text style={styles.sectionTitle}>{t("aboutAudienceTitle")}</Text></View>
      <Text style={styles.description}>{t("aboutAudience")}</Text>
      </View>
    </ScrollView>
  </AppBackground>;
}
