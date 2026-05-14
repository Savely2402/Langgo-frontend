import { DictionaryType, type BaseDictionary } from '../model/types'
import type { GetDictionariesResponse } from '../api/types'

export const mapDictionaries = (
    response: GetDictionariesResponse,
): BaseDictionary[] => {
    return response.dictionaries.map((dict) => {
        return {
            id: dict.id,
            name: dict.name,
            langFrom: dict.langFrom,
            langTo: dict.langTo,
            wordsAmount: dict.wordsCount,
            type: DictionaryType[dict.scope],
        }
    })
}
