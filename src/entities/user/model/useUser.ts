import { useGetMeQuery } from '../api/userApi'

export const useUser = () => {
    const { data: user, isError, isLoading, refetch } = useGetMeQuery()

    return {
        user,
        isError,
        isLoading,
        refetch,
    }
}
