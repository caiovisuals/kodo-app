import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Crypto from "expo-crypto"
import * as SecureStore from "expo-secure-store"

const USERS_KEY = "@kodo:users"
const SESSION_KEY = "@kodo:session"
const passwordKey = (userId: string) => `@kodo:pw:${userId}`

export interface User {
    id: string
    name: string
    username: string
    email: string
    avatar?: string
    createdAt: string
}

interface StoredUser extends User {
    password: string
}

async function generateSalt(): Promise<string> {
    const random = await Crypto.getRandomBytesAsync(32)
    return Array.from(random)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
}

async function hashPassword(password: string): Promise<string> {
    const salt = await generateSalt()
    const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        salt + password
    )
    return `${salt}$${hash}`
}

async function verifyPassword(
    password: string,
    stored: string
): Promise<boolean> {
    const [salt, expectedHash] = stored.split("$")
    if (!salt || !expectedHash) return false
 
    const hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        salt + password
    )
    return hash === expectedHash
}

async function getStoredUsers(): Promise<StoredUser[]> {
    const raw = await AsyncStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
}

async function saveStoredUsers(users: StoredUser[]): Promise<void> {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users))
}

async function saveSession(user: User): Promise<void> {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(user))
}

export async function register(
    name: string,
    username: string,
    email: string,
    password: string
): Promise<User> {
    if (!email.includes("@")) throw new Error("E-mail inválido.")

    if (password.length < 6)
        throw new Error("A senha precisa ter pelo menos 6 caracteres.")

    const users = await getStoredUsers()

    const alreadyExists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
    )

    if (alreadyExists) {
        throw new Error("Este e-mail já está cadastrado.")
    }

    const newUser: StoredUser = {
        id: Date.now().toString(),
        name,
        username,
        email: email.toLowerCase(),
        password,
        createdAt: new Date().toISOString(),
    }

    const hashed = await hashPassword(password)
    await SecureStore.setItemAsync(passwordKey(newUser.id), hashed)

    await saveStoredUsers([...users, newUser])
    await saveSession(newUser)

    const { password: _pw, ...publicUser } = newUser

    return publicUser
}

export async function login(email: string, password: string): Promise<User> {
    const users = await getStoredUsers()

    const found = users.find(
        (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
    )

    if (!found) {
        throw new Error("E-mail ou senha incorretos.")
    }

    await saveSession(found)

    const { password: _pw, ...publicUser } = found
    return publicUser
}

export async function logout(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY)
}

export async function getSession(): Promise<User | null> {
    const raw = await AsyncStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
}

export async function updateProfile(
    userId: string,
    data: Partial<Pick<User, "name" | "username" | "avatar">>
): Promise<User> {
    const users = await getStoredUsers()
    const index = users.findIndex((u) => u.id === userId)
    if (index === -1) throw new Error("Usuário não encontrado.")
 
    const updated = { ...users[index], ...data }
    users[index] = updated
 
    await saveStoredUsers(users)
    await saveSession(updated)
    return updated
}

export async function changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
): Promise<void> {
    if (newPassword.length < 8)
        throw new Error("A nova senha precisa ter pelo menos 8 caracteres.")
 
    const storedHash = await SecureStore.getItemAsync(passwordKey(userId))
    if (!storedHash) throw new Error("Usuário não encontrado.")
 
    const valid = await verifyPassword(currentPassword, storedHash)
    if (!valid) throw new Error("Senha atual incorreta.")
 
    const newHash = await hashPassword(newPassword)
    await SecureStore.setItemAsync(passwordKey(userId), newHash)
}

export async function deleteAccount(userId: string): Promise<void> {
    const users = await getStoredUsers()
    const filtered = users.filter((u) => u.id !== userId)
    await saveStoredUsers(filtered)
    await SecureStore.deleteItemAsync(passwordKey(userId))
    await SecureStore.deleteItemAsync(SESSION_KEY)
}
