import { AUTH_TAG, baseApi, isRtkQueryError } from '@/shared/api'
import {
    mapAuthResponseToUser,
    mapUserProfileDtoToUserProfile,
} from '../lib/mapUser'
import type { User, UserProfile } from '../model/types'

export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<User | null, void>({
            query: () => ({
                url: 'user/profile',
                method: 'GET',
            }),
            providesTags: (result) => (result ? [AUTH_TAG] : []),
            transformResponse: mapAuthResponseToUser,
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                } catch (err) {
                    if (isRtkQueryError(err)) {
                        const status = Number(err.status)

                        if (status === 401) {
                            dispatch(
                                userApi.util.upsertQueryData(
                                    'getMe',
                                    undefined,
                                    null,
                                ),
                            )
                        }
                    }
                }
            },
        }),
        getUserById: build.query<UserProfile, string | number>({
            query: (id) => ({
                url: `user/${id}`,
                method: 'GET',
            }),
            transformResponse: mapUserProfileDtoToUserProfile,
        }),
    }),
})

export const {
    useLazyGetMeQuery,
    useGetMeQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
} = userApi
