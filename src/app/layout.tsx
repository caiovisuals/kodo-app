import { Geologica_400Regular, Geologica_700Bold, useFonts } from "@expo-google-fonts/geologica"
import { Slot } from "expo-router"
import "./global.css"

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Geologica_400Regular,
        Geologica_700Bold,
    })

    if (!fontsLoaded) return null

    return (
        <Slot/>
    )
}