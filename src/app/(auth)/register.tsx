import { useRouter } from "expo-router"
import { useRef, useState } from "react"
import { Animated, Pressable, Text, TextInput, View } from "react-native"

export default function Register() {
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

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleNext = () => {
        if (!name || !email || !password) {
            return
        }
    }

    return (
        <View className="flex-1 items-center justify-center p-6 gap-4">
            <View className="flex flex-col w-full">
                <Text className="text-slate-600">Passo 1 de 2</Text>
                <Text className="text-3xl font-bold">Registrar</Text>
            </View>
            <View className="w-full gap-4">
                <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    className="w-full border-slate-300 rounded-xl px-4 py-3" style={{ borderWidth: 2, borderBottomWidth: 4 }}
                />
                <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full border-slate-300 rounded-xl px-4 py-3" style={{ borderWidth: 2, borderBottomWidth: 4 }}
                />
                <TextInput
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    className="w-full border-slate-300 rounded-xl px-4 py-3" style={{ borderWidth: 2, borderBottomWidth: 4 }}
                />
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Pressable
                        onPress={handleNext}
                        onPressIn={handlePressIn} onPressOut={handlePressOut}
                        className="w-full rounded-xl items-center bg-slate-600" style={{ borderWidth: 2, borderBottomWidth: 6 }}
                        >
                        <View className="w-full px-4 py-3 rounded-xl">
                            <Text className="text-white text-center text-base">Criar</Text>
                        </View>
                    </Pressable>
                </Animated.View>
            </View>
            <View className="flex flex-row gap-1">
                <Text>Já tem uma conta?</Text>
                <Pressable onPress={() => router.push("/login")}>
                    <Text className="font-bold">Entrar</Text>
                </Pressable>
            </View>
        </View>
    )
}