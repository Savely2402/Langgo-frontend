import type { LanguageCode } from '@/shared/config'
import type { BaseDictionary, DictionaryType } from '../model/types'

export interface GetDictionariesResponse {
    dictionaries: {
        id: number
        name: string
        langFrom: LanguageCode
        langTo: LanguageCode
        description: string
        scope: (typeof DictionaryType)[keyof typeof DictionaryType]
        wordsCount: number
    }[]
}

type WordDto = {
    original: string
    translation: string
    example: string
    difficulty: 0
}

export interface CreateDictionaryRequest {
    name: string
    langFrom: LanguageCode
    langTo: LanguageCode
    description: string
    isPublic: boolean
    wordsWithTranslations: WordDto[]
}

export type UploadDictionaryResponse = Omit<BaseDictionary, 'content'>

export type UploadDictionaryRequest = { body: FormData }
