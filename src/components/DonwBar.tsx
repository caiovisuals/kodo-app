import { useRouter } from "expo-router"
import { useRef } from "react"
import { Animated, Pressable, View } from "react-native"
import Svg from "react-native-svg"

export default function DonwBar() {
    const router = useRouter()

    const scaleHome = useRef(new Animated.Value(1)).current
    const scaleProfile = useRef(new Animated.Value(1)).current

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
        <View className="flex flex-row items-center justify-between gap-2 border-t-2 border-slate-400 px-3 py-3">
            <Animated.View style={{ transform: [{ scale: scaleHome  }] }}>
                <Pressable onPressIn={() => animateIn(scaleHome)} onPressOut={() => animateOut(scaleHome)} onPress={() => router.push("/home")}>
                    <Svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    </Svg>
                </Pressable>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: scaleProfile  }] }}>
                <Pressable onPressIn={() => animateIn(scaleProfile)} onPressOut={() => animateOut(scaleProfile)} onPress={() => router.push("/profile")}>
                    <Svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                    </Svg>
                </Pressable>
            </Animated.View>
        </View>
    )
}