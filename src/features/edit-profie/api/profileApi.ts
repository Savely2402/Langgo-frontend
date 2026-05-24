import { baseApi } from '@/shared/api/baseApi' // Твой базовый инстанс RTK Query
import type { UpdateProfileRequest } from './types'

export const profileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        uploadAvatar: build.mutation<
            { avatarKey: string },
            { userId: string; formData: FormData }
        >({
            query: ({ userId, formData }) => ({
                url: `/user/${userId}/avatar`,
                method: 'POST',
                body: formData,
            }),
        }),

        getAvatarUrl: build.query<{ url: string }, string>({
            query: (key) => ({
                url: '/users/avatar-url',
                params: { key },
            }),
        }),

        updateProfile: build.mutation<void, UpdateProfileRequest>({
            query: (body) => ({
                url: '/user/profile',
                method: 'PATCH',
                body,
            }),
        }),
    }),
})

export const {
    useUploadAvatarMutation,
    useLazyGetAvatarUrlQuery,
    useUpdateProfileMutation,
} = profileApi
