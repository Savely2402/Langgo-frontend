import { Outlet } from 'react-router'
import { BattleInviteLayer } from '@/features/respond-battle-invite'
import { Toaster } from '@/shared/ui/Toaster'
import { NotificationsRealtimeProvider } from '../providers/notifications-realtime'

export const AppLayout = () => {
    return (
        <div className="mx-auto min-h-dvh px-4">
            <Outlet />
            <NotificationsRealtimeProvider />
            <BattleInviteLayer />
            <Toaster position="top-center" />
        </div>
    )
}
