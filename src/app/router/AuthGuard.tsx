import React from 'react'
import { Navigate } from 'react-router'
import { useGetMeQuery } from '@/entities/user'

type AuthGuardProps = { children: React.ReactNode }

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { data: user } = useGetMeQuery(undefined, {
        selectFromResult: ({ data }) => ({ data }), // subscribe to data only to avoid rerenders
    })

    if (user) {
        return <Navigate to={'/'} />
    }
    return children
}
