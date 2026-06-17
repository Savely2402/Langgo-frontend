import type { LanguageCode } from '@/shared/config'

export interface UserDTO {
    id: number
    email: string
    username: string
    fullName: string
    avatar: string
    learningLanguage: string
    nativeLanguage: string
    rating: number
}

export interface UserProfileDto {
    id: number
    username: string
    fullName: string
    avatarUrl?: string
    learningLanguage: LanguageCode
    nativeLanguage: LanguageCode
}

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: UserDTO
}
