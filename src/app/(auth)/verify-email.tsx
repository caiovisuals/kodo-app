import { useRouter } from "expo-router"
import { useState } from "react"
import { Pressable, Text, TextInput, View } from "react-native"

export default function VerifyEmail() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")

    const handleRegister = () => {

    }

    return (
        <View className="flex-1 items-center justify-center gap-4 px-6 py-6 lg:py-8 lg:px-8 xl:py-16">
            <View className="flex flex-col w-full">
                <Text className="text-slate-600">Passo 2 de 2</Text>
                <Text className="text-3xl font-bold">Validar seu E-mail</Text>
            </View>
            <View className="w-full gap-4">
                <TextInput
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full border-2 border-slate-300 rounded-xl px-4 py-3"
                />
                <TextInput
                    placeholder="0000000"
                    secureTextEntry
                    value={code}
                    onChangeText={setCode}
                    className="w-full border-2 border-slate-300 rounded-xl px-4 py-3"
                />
                <Pressable
                    onPress={handleRegister}
                    className="w-full bg-black rounded-xl py-3 items-center"
                >
                    <Text className="text-white font-bold">Criar</Text>
                </Pressable>
            </View>
        </View>
    )
}