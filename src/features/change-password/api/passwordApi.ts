import { baseApi } from '@/shared/api'
import type { ChangePasswordRequest } from './types'

const profileApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation<void, ChangePasswordRequest>({
            query: (body) => ({
                url: '/user/change-password',
                method: 'POST',
                body,
            }),
        }),
    }),
})

export const { useChangePasswordMutation } = profileApi
