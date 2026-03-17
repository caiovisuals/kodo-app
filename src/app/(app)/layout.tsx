import { default as DonwBar, default as Header } from "@/components/Header"
import { Slot } from "expo-router"
import { View } from "react-native"

export default function AppLayout() {
    return (
        <View className="flex flex-col">
            <Header />
            <Slot />
            <DonwBar />
        </View>
    )
}