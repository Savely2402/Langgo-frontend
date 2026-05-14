export const DictionaryType = {
    0: 'custom',
    1: 'system',
} as const

export interface DictionaryContent {
    id: number
    original: string
    translation: string
    example?: string
}

export interface BaseDictionary {
    id: number
    name: string
    wordsAmount: number
    langFrom: string
    langTo: string
    type: (typeof DictionaryType)[keyof typeof DictionaryType]
}

export interface SystemDictionary extends BaseDictionary {
    type: (typeof DictionaryType)['1']
    difficulty: number
}

export interface CustomDictionary extends BaseDictionary {
    type: (typeof DictionaryType)['0']
    ownerId: number
}

export type Dictionary = SystemDictionary | CustomDictionary
