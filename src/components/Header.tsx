import { useRouter } from "expo-router"
import { Text, View } from "react-native"

export default function Header() {
    const router = useRouter()

    return (
        <View className="flex flex-row items-center justify-between border-b-2 border-slate-400">
            <Text className="text-4xl font-bold">KODO</Text>
        </View>
    )
}