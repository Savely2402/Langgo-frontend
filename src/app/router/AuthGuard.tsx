import { Navigate } from 'react-router'
import { useGetMeQuery } from '@/entities/user'

type AuthGuardProps = { children: React.ReactNode }

export function AuthGuard({ children }: AuthGuardProps) {
    const { data: user } = useGetMeQuery()

    if (user) {
        return <Navigate to={'/'} />
    }

    return children
}
