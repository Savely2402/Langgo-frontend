import type { UserResponseDTO } from '../api/types'
import type { User } from '../model/types'

export const mapAuthResponseToUser = (response: UserResponseDTO): User => {
    return {
        id: response.id,
        username: response.username,
        fullname: response.fullname,
        avatarUrl: response.avatar,
        email: response.email,
        learningLanguage: response.learningLanguage,
        nativeLanguage: response.nativeLanguage,
        rating: response.rating,
    }
}
