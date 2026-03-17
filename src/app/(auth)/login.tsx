import ShowPassword from "@/components/auth/ShowPassword"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "expo-router"
import { useRef, useState } from "react"
import { Animated, Pressable, Text, TextInput, View } from "react-native"

export default function Login() {
    const { signIn } = useAuth()
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

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Preencha todos os campos.")
            return
        }
 
        setError("")
        setIsLoading(true)
 
        try {
            await signIn(email, password)
            router.replace("/home")
        } catch (err: any) {
            setError(err.message ?? "Erro ao fazer login.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View className="flex-1 items-center justify-center gap-4 px-6 py-6 lg:py-8 lg:px-8 xl:py-16">
            <View className="flex flex-col w-full">
                <Text className="text-slate-600">Bem-vindo(a) de volta!</Text>
                <Text className="text-3xl font-bold">Login</Text>
            </View>
            <View className="w-full gap-4">
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full border-slate-300 rounded-xl px-4 py-3" style={{ borderWidth: 2, borderBottomWidth: 4 }}
                />
                <View className="relative gap-4">
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        className="w-full border-slate-300 rounded-xl px-4 py-3" style={{ borderWidth: 2, borderBottomWidth: 4 }}
                    />
                    <ShowPassword show={showPassword} setShow={setShowPassword} />
                </View>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Pressable
                        onPress={handleLogin}
                        onPressIn={handlePressIn} 
                        onPressOut={handlePressOut}
                        className="w-full rounded-xl items-center bg-slate-600" style={{ borderWidth: 2, borderBottomWidth: 6 }}
                    >
                        <View className="w-full px-4 py-3 rounded-xl">
                            <Text className="text-white text-center text-base">Entrar</Text>
                        </View>
                    </Pressable>
                </Animated.View>
            </View>
            <View className="flex flex-row gap-1">
                <Text>Ainda não tem uma conta?</Text>
                <Pressable onPress={() => router.push("/register")}>
                    <Text className="font-bold">Criar</Text>
                </Pressable>
            </View>
        </View>
    )
}