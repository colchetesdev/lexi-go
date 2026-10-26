import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { useEffect } from "react";
import Routes from "@routes/Routes";
import { LanguageProvider, useLanguage } from "./src/context/LanguageContext";

function AppContent() {
  const { loading } = useLanguage();
  useEffect(() => {
    if (Platform.OS !== "web") return;

    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");
    const elements = [html, body, root].filter(Boolean) as HTMLElement[];
    const previous = elements.map((element) => ({
      element,
      height: element.style.height,
      minHeight: element.style.minHeight,
      overflow: element.style.overflow,
      margin: element.style.margin,
    }));

    elements.forEach((element) => {
      element.style.height = "100%";
      element.style.minHeight = "0";
      element.style.overflow = "hidden";
      element.style.margin = "0";
    });

    return () => previous.forEach(({ element, height, minHeight, overflow, margin }) => {
      element.style.height = height;
      element.style.minHeight = minHeight;
      element.style.overflow = overflow;
      element.style.margin = margin;
    });
  }, []);
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
