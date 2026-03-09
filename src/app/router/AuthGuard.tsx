import React from 'react'
import { Navigate } from 'react-router'
import { useUser } from '@/entities/user'

type AuthGuardProps = { children: React.ReactNode }

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { user } = useUser()

    if (user) {
        return <Navigate to={'/'} />
    }
    return children
}
