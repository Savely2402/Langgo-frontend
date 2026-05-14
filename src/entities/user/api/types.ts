export interface UserResponseDTO {
    id: number
    email: string
    username: string
    fullname: string
    avatar: string
    learningLanguage: string
    nativeLanguage: string
    rating: number
}

export interface AuthResponseDto {
    accessToken: string
    refreshToken: string
    user: UserResponseDTO
}
