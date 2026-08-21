import { useNavigate } from 'react-router'
import { UserCard, useGetIncomingFriendRequestsQuery } from '@/entities/user'
import { FriendRequestActions } from '@/features/respond-friend-request'
import { routes } from '@/shared/config'
import { Spinner } from '@/shared/ui/Spinner'

export const FriendRequestsList = () => {
    const navigate = useNavigate()
    const {
        data: requests = [],
        isLoading,
        isFetching,
        isError,
    } = useGetIncomingFriendRequestsQuery()

    if (isLoading || isFetching) {
        return (
            <div className="flex items-center justify-center gap-2 rounded-[28px] border border-dashed border-slate-200 bg-white p-8 text-sm font-semibold text-slate-400">
                <Spinner className="size-4" />
                Загружаем заявки
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-[28px] border border-dashed border-destructive/30 bg-destructive/5 p-8 text-center text-sm font-semibold text-destructive">
                Не удалось загрузить заявки
            </div>
        )
    }

    if (requests.length === 0) {
        return (
            <div className="rounded-[28px] border border-dashed border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-400">
                Новых заявок нет
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            {requests.map((request) => (
                <UserCard
                    key={request.id}
                    user={request}
                    onClick={() => navigate(routes.profile(String(request.id)))}
                    actionsSlot={
                        <FriendRequestActions
                            requestId={request.id}
                            friendUsername={request.username}
                        />
                    }
                />
            ))}
        </div>
    )
}
