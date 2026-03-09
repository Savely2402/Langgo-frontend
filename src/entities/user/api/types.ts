export type UserDTO = {
    id: number
    username: string
    fullname: string
    avatarUrl: string
    email: string
}

export type AuthResponseDTO = {
    user: UserDTO
}
