import { Outlet } from 'react-router'
import { Toaster } from '@/shared/ui/Toaster'

export const AppLayout = () => {
    return (
        <div className="min-h-dvh">
            <Outlet />
            <Toaster position="top-center" />
        </div>
    )
}
