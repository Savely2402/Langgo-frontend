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

export interface AuthResponse {
    accessToken: string
    refreshToken: string
    user: UserDTO
}
