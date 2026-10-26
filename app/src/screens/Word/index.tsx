import { ImageBackground, Text, View } from "react-native";
import { ArrowLeft, Check, Volume2 } from "lucide-react-native";
import Header from "@components/Header";
import GlassButton from "@components/GlassButton";
import { styles } from "./styles";

export default function Word() { return <ImageBackground source={require("@assets/background.png")} resizeMode="cover" style={styles.container}><Header/><GlassButton size={48} style={styles.back}><ArrowLeft color="#FFF" size={24}/></GlassButton><View style={styles.hero}><Text style={styles.word}>API</Text><View style={styles.pronunciation}><Text style={styles.phonetic}>/ˌeɪ.piˈaɪ/</Text><GlassButton size={48}><Volume2 color="#FFF" size={24}/></GlassButton></View></View><View style={styles.card}><Text style={styles.cardTitle}>Definition</Text><View style={styles.cardBody}><Text style={styles.definition}>A set of rules that allows programs to communicate with each other.</Text><Text style={styles.exampleTitle}>Example:</Text><Text style={styles.definition}>The weather app uses a public API to fetch forecast data.</Text><View style={styles.check}><Check color="#FFF" size={24}/></View><Text style={styles.meta}>Category: Back-end</Text><Text style={styles.meta}>Difficulty: Beginner</Text></View></View></ImageBackground>; }
