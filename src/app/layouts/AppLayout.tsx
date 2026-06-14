import { Outlet } from 'react-router'
import { Toaster } from '@/shared/ui/Toaster'

export const AppLayout = () => {
    return (
        <div className="mx-auto min-h-dvh px-4">
            <Outlet />
            <Toaster position="top-center" />
        </div>
    )
}
