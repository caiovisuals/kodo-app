import {
    UpdateProfileRequest,
    UpdateProfileResponse,
    UploadAvatarResponse,
    User,
} from "@/types/api"
import { apiFetch } from "./api"

// Get 
export async function getProfile(): Promise<User> {
    return apiFetch<User>("/api/profile")
}

// Update
export async function updateProfile(
    data: UpdateProfileRequest
): Promise<User> {
    const { user } = await apiFetch<UpdateProfileResponse>("/api/profile", {
        method: "PATCH",
        body: data,
    })
    return user
}

// Avatar
export async function uploadAvatar(
    uri: string,
    mimeType = "image/jpeg"
): Promise<string> {
    const fileName = uri.split("/").pop() ?? "avatar.jpg"

    const formData = new FormData()
    // React Native aceita esse formato no FormData
    formData.append("avatar", {
        uri,
        type: mimeType,
        name: fileName,
    } as unknown as Blob)

    // uploadAvatar usa fetch diretamente pois o body é FormData (não JSON)
    const { getToken } = await import("./api")
    const token = await getToken()

    const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000"

    const response = await fetch(`${BASE_URL}/api/profile/avatar`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
    })

    if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Erro ao enviar avatar." }))
        throw new Error(err.error)
    }

    const { avatarUrl } = (await response.json()) as UploadAvatarResponse
    return avatarUrl
}