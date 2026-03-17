import { AuthProvider } from "@/contexts/AuthContext"
import { Slot } from "expo-router"
import "./global.css"

export default function RootLayout() {
    return (
        <AuthProvider>
            <Slot/>
        </AuthProvider>
    )
}