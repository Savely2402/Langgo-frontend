import { baseApi, DICTIONARY_TAG } from '@/shared/api'
import { mapDictionaries } from '../lib/mapDictionaries'
import type {
    CreateDictionaryRequest,
    UploadDictionaryRequest,
    UploadDictionaryResponse,
} from './types'
import type { BaseDictionary } from '../model/types'

export const dictionaryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDictionaries: build.query<BaseDictionary[], number>({
            query: () => `dictionaries`,
            transformResponse: mapDictionaries,
            providesTags: [DICTIONARY_TAG],
        }),
        getUserDictionaries: build.query<BaseDictionary[], number>({
            query: (userId) => `user/${userId}/dictionaries`,
            transformResponse: mapDictionaries,
            providesTags: [DICTIONARY_TAG],
        }),
        createDictionary: build.mutation<void, CreateDictionaryRequest>({
            query: (body) => ({
                url: `dictionary`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [DICTIONARY_TAG],
        }),
        deleteDictionary: build.mutation<void, number>({
            query: (id) => ({
                url: `dictionaries/${id}`,
                method: 'DELETE',
            }),
        }),
        uploadDictionary: build.mutation<
            UploadDictionaryResponse,
            UploadDictionaryRequest
        >({
            query: ({ body }) => ({
                url: 'dictionaries/upload',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const {
    useGetUserDictionariesQuery,
    useDeleteDictionaryMutation,
    useUploadDictionaryMutation,
    useCreateDictionaryMutation,
    useGetDictionariesQuery,
} = dictionaryApi
