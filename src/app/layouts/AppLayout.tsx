import { AppHeader } from '@/widgets/app-header'
import { Outlet } from 'react-router'

export const AppLayout = () => {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    )
}
