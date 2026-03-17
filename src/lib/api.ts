import { ApiErrorResponse } from "@/types/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TOKEN_KEY = "@kodo:token"

// Troque pela URL do seu Next.js em produção
const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000"

// Token 
export async function getToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY)
}

export async function saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(TOKEN_KEY, token)
}

export async function clearToken(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY)
}

// Client
type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

interface RequestOptions {
    method?: HttpMethod
    body?: unknown
    /** Quando true não injeta o Authorization header (ex: login/register) */
    public?: boolean
}

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message)
        this.name = "ApiError"
    }
}

export async function apiFetch<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = "GET", body, public: isPublic = false } = options

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    }

    if (!isPublic) {
        const token = await getToken()
        if (token) {
            headers["Authorization"] = `Bearer ${token}`
        }
    }

    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        const err: ApiErrorResponse = await response.json().catch(() => ({
            error: "Erro inesperado.",
        }))
        throw new ApiError(response.status, err.error)
    }

    if (response.status === 204) {
        return undefined as T
    }

    return response.json() as Promise<T>
}