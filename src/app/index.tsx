import { useRouter } from "expo-router"
import { useRef } from "react"
import { Animated, Pressable, Text, View } from "react-native"

export default function Index() {
    const router = useRouter()

    const scaleRegister = useRef(new Animated.Value(1)).current
    const scaleLogin = useRef(new Animated.Value(1)).current

    const animateIn = (scale: Animated.Value) => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
            speed: 50,
            bounciness: 0,
        }).start()
    }

    const animateOut = (scale: Animated.Value) => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 50,
            bounciness: 4,
        }).start()
    }

    return (
        <View className="flex-1 flex-col justify-between gap-2 px-6 py-6 lg:py-8 lg:px-8 xl:py-16">
            <View className="flex-1 items-center justify-center">
                <Text className="text-5xl font-bold">KODO APP</Text>
            </View>
            <View className="w-full flex flex-col xl:flex-row gap-2">
                <Animated.View style={{ transform: [{ scale: scaleLogin  }] }} className="w-full xl:w-[50%]">
                    <Pressable onPressIn={() => animateIn(scaleLogin)} onPressOut={() => animateOut(scaleLogin)} onPress={() => router.push("/register")} style={{ borderWidth: 2, borderBottomWidth: 6 }} className="rounded-xl bg-slate-600 border-slate-800">
                        <View className="px-4 py-3 rounded-xl bg-slate-600">
                            <Text className="text-white text-center text-base">
                                Dar o primeiro passo
                            </Text>
                        </View>
                    </Pressable>
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: scaleRegister }] }} className="w-full xl:w-[50%]">
                    <Pressable onPressIn={() => animateIn(scaleRegister)} onPressOut={() => animateOut(scaleRegister)} onPress={() => router.push("/login")} style={{borderWidth: 2, borderBottomWidth: 6 }} className="rounded-xl bg-white border-slate-700">
                        <View className="px-4 py-3 rounded-xl bg-white">
                            <Text className="text-black text-center text-base">
                                Eu já tenho conta
                            </Text>
                        </View>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    )
}