import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import Routes from "@routes/Routes";
import { LanguageProvider, useLanguage } from "./src/context/LanguageContext";

function AppContent() {
  const { loading } = useLanguage();
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratSemibold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });
  if (loading) {
    return null;
  }
  if (!fontsLoaded) {
    return null;
  }
  return (
    
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return <LanguageProvider><AppContent /></LanguageProvider>;
}
