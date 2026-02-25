import { useLazyGetMeQuery } from '../api/userApi'

export const useUser = () => {
    const [getMe, { data: user, isError, isLoading }] = useLazyGetMeQuery()

    return {
        getMe,
        user,
        isError,
        isLoading,
    }
}
