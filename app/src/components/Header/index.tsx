import {View, Text} from "react-native"
import {styles} from "./styles"
import { BookType } from "lucide-react-native"
export default function Header(){
    return(
        <View style={styles.container}>
            <BookType/>
            <Text style={styles.title}>LexiGo</Text>
        </View>
    )
}