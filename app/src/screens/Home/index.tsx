import { ImageBackground, View, Text} from "react-native";
import {styles} from "./styles"
export default function Home(){
    const background = require("@assets/background.png");
    return(
        <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.container} 
        >
        <Text>A</Text>
        </ImageBackground>
    )
}