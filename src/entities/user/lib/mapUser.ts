import type { LanguageCode } from '@/shared/config'
import type { UserDTO, UserProfileDto } from '../api/types'
import type { User, UserProfile } from '../model/types'

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

export const mapUserProfileDtoToUserProfile = (
    response: UserProfileDto,
): UserProfile => {
    console.log(response)

    return {
        id: response.id ?? response.userId ?? 0,
        username: response.username,
        fullname: response.fullName,
        avatarUrl: response.avatarUrl,
        learningLanguage: (response.learningLanguage ?? 'En') as LanguageCode,
        nativeLanguage: (response.nativeLanguage ?? 'Ru') as LanguageCode,
        rating: 0,
    }
}

export const mapUserProfileDtosToUserProfiles = (
    response: UserProfileDto[],
): UserProfile[] => {
    return response.map(mapUserProfileDtoToUserProfile)
}
