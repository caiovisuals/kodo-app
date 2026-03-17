import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"

export default function DonwBar() {
    const router = useRouter()

    return (
        <View className="flex flex-row items-center justify-between gap-2">
            <Pressable
                onPress={() => router.push("/profile")}
                className="px-3 py-2 rounded-lg bg-slate-200"
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                </svg>
            </Pressable>
            <Pressable
                onPress={() => router.push("/profile")}
                className="px-3 py-2 rounded-lg bg-slate-200"
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                </svg>
            </Pressable>
            <Pressable
                onPress={() => router.push("/profile")}
                className="px-3 py-2 rounded-lg bg-slate-200"
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                </svg>
            </Pressable>
            <Pressable
                onPress={() => router.push("/profile")}
                className="px-3 py-2 rounded-lg bg-slate-200"
            >
                <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/>
                </svg>
            </Pressable>
        </View>
    )
}