import { useGetMeQuery } from '../api/userApi'

export const useUser = () => {
    const { data: user, isError, isLoading } = useGetMeQuery()

    return {
        user,
        isError,
        isLoading,
    }
}
