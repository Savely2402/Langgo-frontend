import { baseApi } from '@/shared/api'
import type { UploadDictionaryRequest, UploadDictionaryResponse } from './types'
import type { CustomDictionary } from '../model/types'

export const dictionaryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDictionaries: build.query<CustomDictionary[], void>({
            query: () => 'dictionaries/me',
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
