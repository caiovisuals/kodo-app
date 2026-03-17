import { Text, View } from "react-native"

export default function Header() {
    return (
        <View className="flex flex-row items-center justify-between border-b-2 border-slate-400 px-3 py-2">
            <Text className="text-3xl font-bold">KODO</Text>
        </View>
    )
}