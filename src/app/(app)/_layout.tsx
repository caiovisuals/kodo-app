import DonwBar from "@/components/DonwBar"
import Header from "@/components/Header"
import { useAuth } from "@/contexts/AuthContext"
import { Redirect, Slot } from "expo-router"
import { ActivityIndicator, View } from "react-native"

export default function AppLayout() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (!user) {
        return <Redirect href="/" />
    }

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