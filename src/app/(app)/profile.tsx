import { useRef } from "react"
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native"
import Svg from "react-native-svg"

export default function Profile() {
    const scaleEdit = useRef(new Animated.Value(1)).current
    const scaleShare = useRef(new Animated.Value(1)).current

    const animateIn = (scale: Animated.Value) => {
        Animated.spring(scale, {
            toValue: 0.97,
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
        <ScrollView showsVerticalScrollIndicator={false} className="px-6 py-6 lg:py-8 lg:px-8 xl:py-16">
            <View className="bg-[#505050] w-full h-[120] rounded-2xl">

            </View>
            <View className="flex flex-col items-center justify-center gap-3 -mt-[60]">
                <Image className="bg-black" style={{ width: 100, height: 100, borderRadius: 60 }} />
                <View className="flex flex-col items-center justify-center">
                    <Text className="font-semibold text-lg leading-tight">@caiotes</Text>
                    <Text className="font-bold text-2xl leading-tight">Caio Oliveira</Text>
                </View>
            </View>
            <View className="w-full flex flex-row items-center justify-center gap-2 mt-[25]">
                <Animated.View style={{ transform: [{ scale: scaleEdit  }] }}>
                    <Pressable onPressIn={() => animateIn(scaleEdit)} onPressOut={() => animateOut(scaleEdit)} className="w-full px-6 py-2 rounded-xl bg-slate-400">
                        <Text className="font-semibold">
                            Editar
                        </Text>
                    </Pressable>
                </Animated.View>
                <Animated.View style={{ transform: [{ scale: scaleShare }] }}>
                    <Pressable onPressIn={() => animateIn(scaleShare)} onPressOut={() => animateOut(scaleShare)} className="w-full flex flex-row gap-2 items-center px-4 py-2 rounded-xl bg-slate-400">
                        <Svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v13"/><path d="m16 6-4-4-4 4"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        </Svg>
                        <Text className="font-semibold">
                            Compartilhar Perfil
                        </Text>
                    </Pressable>
                </Animated.View>
            </View>
        </ScrollView>
    )
}