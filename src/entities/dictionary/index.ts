export type {
    CustomDictionary,
    SystemDictionary,
    Dictionary,
    DictionaryContent,
    BaseDictionary,
} from './model/types'
export {
    useDeleteDictionaryMutation,
    useGetUserDictionariesQuery,
    useUploadDictionaryMutation,
} from './api/dictionaryApi'
export { DictionaryCard } from './ui/DictionaryCard'
