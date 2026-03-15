import { Outlet } from 'react-router'
import { Toaster } from '@/shared/ui/Toaster'
import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'

export const AppLayout = () => {
    return (
        <>
            <AppHeader rightSlot={<HeaderProfile />} />
            <Outlet />
            <Toaster position="top-center" />
        </>
    )
}
