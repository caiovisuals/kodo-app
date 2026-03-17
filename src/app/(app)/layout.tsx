import DonwBar from "@/components/DonwBar"
import Header from "@/components/Header"
import { Slot } from "expo-router"
import { View } from "react-native"

export default function AppLayout() {
    return (
        <View className="flex-1">
            <Header />
            <View className="flex-1">
                <Slot />
            </View>
            <DonwBar />
        </View>
    )
}