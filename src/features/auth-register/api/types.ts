import type { LanguageCode } from '@/shared/config'

export interface RequestRegisterBody {
    fullname: string
    username: string
    email: string
    password: string
    learningLanguage: LanguageCode
    nativeLanguage: LanguageCode
}
