import type { LanguageCode } from '@/shared/config'

export type User = {
    id: number
    username: string
    fullname: string
    avatarUrl?: string
    email: string
    learningLanguage: LanguageCode
    nativeLanguage: LanguageCode
    rating: number
}
