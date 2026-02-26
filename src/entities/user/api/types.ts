export type UserDTO = {
    id: number
    username: string
    avatar: string
    email: string
}

export type AuthResponseDTO = {
    user: UserDTO
}
