import { Outlet } from 'react-router'
import { AppHeader } from '@/widgets/app-header'

export const AppLayout = () => {
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    )
}
