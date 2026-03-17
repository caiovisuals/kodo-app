import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"

export default function Login() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        if (!email || !password) {
            return
        }
    }

    return (
        <View className="flex-1 items-center justify-center p-6 gap-4">
            <View className="flex flex-col w-full">
                <Text className="text-slate-600">Bem-vindo(a) de volta!</Text>
                <Text className="text-3xl font-bold">Login</Text>
            </View>
            <View className="w-full gap-4">
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
                <TextInput
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
                <Pressable
                    onPress={handleLogin}
                    className="w-full bg-black rounded-xl py-3 items-center"
                >
                    <Text className="text-white font-bold">Entrar</Text>
                </Pressable>
            </View>
            <View className="flex flex-row gap-2">
                <Text>Ainda não tem uma conta?</Text>
                <Pressable onPress={() => router.push("/register")}>
                    <Text>Criar</Text>
                </Pressable>
            </View>
        </View>
    )
}