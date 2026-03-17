import { useRouter } from "expo-router"
import { useRef } from "react"
import { Animated, Pressable, Text, View } from "react-native"

export default function Index() {
    const router = useRouter()

    const scale = useRef(new Animated.Value(1)).current

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
            speed: 50,
            bounciness: 0,
        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start()
    }

    return (
        <View className="flex-1 flex-col justify-between gap-2 p-6">
            <View className="flex-1 items-center justify-center">
                <Text className="text-5xl font-bold">KODO APP</Text>
            </View>
            <View className="w-full flex flex-col xl:flex-row gap-2">
                <Pressable onPress={() => router.push("/register")} style={{ borderWidth: 2, borderBottomWidth: 6 }} className="w-full xl:w-[50%] rounded-xl bg-slate-600 border-slate-800">
                    <View className="px-4 py-3 rounded-xl bg-slate-600">
                        <Text className="text-white text-center text-base">
                            Dar o primeiro passo
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={() => router.push("/login")} style={{borderWidth: 2, borderBottomWidth: 6 }} className="w-full xl:w-[50%] rounded-xl bg-white border-slate-700">
                    <View className="px-4 py-3 rounded-xl bg-white">
                        <Text className="text-black text-center text-base">
                            Eu já tenho conta
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}