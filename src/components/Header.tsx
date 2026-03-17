import { useRouter } from "expo-router"
import { Text, View } from "react-native"

export default function Header() {
    const router = useRouter()

    return (
        <View className="flex flex-row items-center justify-between bordero-b-2 border-slate-800">
            <Text className="text-4xl font-bold">KODO</Text>
        </View>
    )
}