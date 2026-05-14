import { baseApi } from '@/shared/api'
import { mapDictionaries } from '../lib/mapDictionaries'
import type { UploadDictionaryRequest, UploadDictionaryResponse } from './types'
import type { BaseDictionary } from '../model/types'

export const dictionaryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDictionaries: build.query<BaseDictionary[], number>({
            query: (userId) => `user/${userId}/dictionaries`,
            transformResponse: mapDictionaries,
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
} = dictionaryApi
