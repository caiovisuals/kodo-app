import { getSession, login, logout, register, User } from "@/lib/authService"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface AuthContextType {
    user: User | null
    isLoading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (name: string, email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getSession()
            .then(setUser)
            .finally(() => setIsLoading(false))
    }, [])

    const signIn = async (email: string, password: string) => {
        const loggedUser = await login(email, password)
        setUser(loggedUser)
    }

    const signUp = async (name: string, email: string, password: string) => {
        const newUser = await register(name, email, password)
        setUser(newUser)
    }

    const signOut = async () => {
        await logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
    return ctx
}