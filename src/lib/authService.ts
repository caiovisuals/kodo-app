import AsyncStorage from "@react-native-async-storage/async-storage"

const USERS_KEY = "@kodo:users"
const SESSION_KEY = "@kodo:session"

export interface User {
    id: string
    name: string
    email: string
    createdAt: string
}

interface StoredUser extends User {
    password: string
}

async function getStoredUsers(): Promise<StoredUser[]> {
    const raw = await AsyncStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
}

async function saveStoredUsers(users: StoredUser[]): Promise<void> {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export async function register(
    name: string,
    email: string,
    password: string
): Promise<User> {
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
        email: email.toLowerCase(),
        password,
        createdAt: new Date().toISOString(),
    }

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

async function saveSession(user: StoredUser): Promise<void> {
    const { password: _pw, ...publicUser } = user
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(publicUser))
}