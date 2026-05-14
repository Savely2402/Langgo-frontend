import type { BaseDictionary } from '../model/types'

export interface GetDictionariesResponse {
    dictionaries: {
        id: number
        name: string
        langFrom: string
        langTo: string
        description: string
        scope: 0 | 1
        wordsCount: number
    }[]
}

export type UploadDictionaryResponse = Omit<BaseDictionary, 'content'>

export type UploadDictionaryRequest = { body: FormData }
