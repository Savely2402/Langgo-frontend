import type { BaseDictionary } from '../model/types'

export type UploadDictionaryResponse = Omit<BaseDictionary, 'content'>

export type UploadDictionaryRequest = { body: FormData }
