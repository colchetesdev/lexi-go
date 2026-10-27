import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "@screens/Home"
import History from "@screens/History"
import Word from "@screens/Word"
import Search from "@screens/Search"
import { RootStackParamList } from "../types/navigation";
import About from "@screens/About";
import Review from "@screens/Review";
import Statistics from "@screens/Statistics";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function Routes(){
    return(
        <Stack.Navigator initialRouteName="Home" screenOptions={{"headerShown": false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="History" component={History}/>
            <Stack.Screen name="Word" component={Word}/>
            <Stack.Screen name="Search" component={Search} options={{ animation: "none", contentStyle: { backgroundColor: "transparent" } }}/>
            <Stack.Screen name="About" component={About}/>
            <Stack.Screen name="Review" component={Review}/>
            <Stack.Screen name="Statistics" component={Statistics}/>
        </Stack.Navigator>
    )
}
