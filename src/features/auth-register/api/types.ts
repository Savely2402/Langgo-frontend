import type { AuthLanguageCode } from '@/shared/config'

export interface RequestRegisterBody {
    fullname: string
    username: string
    email: string
    password: string
    learningLanguage: AuthLanguageCode
    nativeLanguage: AuthLanguageCode
}
