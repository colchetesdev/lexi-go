import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Routes from "@routes/Routes"
import { LanguageProvider } from "./src/context/LanguageContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemibold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </LanguageProvider>
  );
}
