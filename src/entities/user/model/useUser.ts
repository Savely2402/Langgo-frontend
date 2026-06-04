import { useGetMeQuery } from '../api/userApi'

export const useUser = () => {
    const { data: user, isError, isLoading, refetch } = useGetMeQuery()

    console.log(user)

    return {
        user,
        isError,
        isLoading,
        refetch,
    }
}
