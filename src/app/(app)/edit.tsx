import { useRouter } from "expo-router"
import { useRef, useState } from "react"
import { Animated, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native"

export default function EditProfile() {
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

    const [name, setName] = useState("Caio Oliveira")
    const [username, setUsername] = useState("caiotes")
    const [bio, setBio] = useState("")

    const handleSave = () => {
        router.back()
    }

    return (
        <ScrollView className="flex-1 px-6 py-6 lg:py-8 lg:px-8 xl:py-16">
            <Text className="text-2xl font-bold mb-5">
                Editar Perfil
            </Text>

            <View className="items-center mb-6">
                <Image
                    style={{ width: 100, height: 100, borderRadius: 60 }}
                    className="bg-black"
                />
                <Pressable className="mt-4">
                    <Text className="font-semibold">
                        Alterar foto
                    </Text>
                </Pressable>
            </View>

            <View className="mb-4">
                <Text className="mb-1 font-semibold">Nome</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    className="w-full border-slate-300 rounded-xl px-4 py-3" style={{ borderWidth: 2, borderBottomWidth: 4 }}
                />
            </View>

            <View className="mb-4">
                <Text className="mb-1 font-semibold">Username</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    className="w-full border-slate-300 rounded-xl px-4 py-3" style={{ borderWidth: 2, borderBottomWidth: 4 }}
                />
            </View>

            <View className="mb-6">
                <Text className="mb-1 font-semibold">Bio</Text>
                <TextInput
                    value={bio}
                    onChangeText={setBio}
                    multiline
                    numberOfLines={4}
                    className="w-full border-slate-300 rounded-xl px-4 py-3" style={{ borderWidth: 2, borderBottomWidth: 4 }}
                />
            </View>

            <Animated.View style={{ transform: [{ scale }] }} className="mt-6">
                <Pressable
                    onPress={handleSave}
                    onPressIn={handlePressIn} 
                    onPressOut={handlePressOut}
                    className="bg-black py-3 rounded-xl items-center"
                >
                    <Text className="text-white font-semibold">
                        Salvar alterações
                    </Text>
                </Pressable>
            </Animated.View>
        </ScrollView>
    )
}