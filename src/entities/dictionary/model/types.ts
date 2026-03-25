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
    languagePair: {
        langFrom: string
        langTo: string
    }
    content: DictionaryContent[]
}

export interface SystemDictionary extends BaseDictionary {
    type: 'system'
    difficulty: number
}

export interface CustomDictionary extends BaseDictionary {
    type: 'custom'
    ownerId: number
}

export type Dictionary = SystemDictionary | CustomDictionary
