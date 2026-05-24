import type { LanguageCode } from '@/shared/config'
import type { UserDTO } from '../api/types'
import type { User } from '../model/types'

export const mapAuthResponseToUser = (response: UserDTO): User => {
    return {
        id: response.id,
        username: response.username,
        fullname: response.fullName,
        avatarUrl: response.avatar,
        email: response.email,
        learningLanguage: response.learningLanguage as LanguageCode,
        nativeLanguage: response.nativeLanguage as LanguageCode,
        rating: response.rating,
    }
}
