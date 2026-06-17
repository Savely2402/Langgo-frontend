import { Outlet } from 'react-router'
import { MockBattleInviteLayer } from '@/features/respond-battle-invite'
import { Toaster } from '@/shared/ui/Toaster'
import { NotificationsRealtimeProvider } from '../providers/notifications-realtime'

export const AppLayout = () => {
    return (
        <div className="mx-auto min-h-dvh px-4">
            <Outlet />
            <NotificationsRealtimeProvider />
            <MockBattleInviteLayer />
            <Toaster position="top-center" />
        </div>
    )
}
