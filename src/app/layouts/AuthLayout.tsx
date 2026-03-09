import { Outlet } from 'react-router'
import { AppHeader } from '@/widgets/app-header'

export const AuthLayout = () => {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    )
}
