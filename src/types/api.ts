// Entidades
export interface User {
    id: string
    name: string
    email: string
    username: string | null
    bio: string | null
    avatar: string | null
    createdAt: string
}

// Auth
export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface AuthResponse {
    user: User
    token: string
}

// Profile
export interface UpdateProfileRequest {
    name?: string
    username?: string
    bio?: string
}

export interface UpdateProfileResponse {
    user: User
}

export interface UploadAvatarResponse {
    avatarUrl: string
}

// Erros
export interface ApiErrorResponse {
    error: string
    details?: string
}