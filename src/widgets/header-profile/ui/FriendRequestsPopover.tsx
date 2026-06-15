import { Bell } from 'lucide-react'
import { UserAvatar, type UserProfile, useUser } from '@/entities/user'
import { FriendRequestActions } from '@/features/respond-friend-request'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/ui/DropDownMenu'

type MockFriendRequest = UserProfile & {
    requestId: number
}

const mockFriendRequests: MockFriendRequest[] = [
    {
        id: 5,
        requestId: 101,
        username: 'syntax_samurai',
        fullname: 'София',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=samurai',
        nativeLanguage: 'En',
        learningLanguage: 'Ru',
        rating: 1720,
    },
    {
        id: 6,
        requestId: 102,
        username: 'vocab_nomad',
        fullname: 'Никита',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nomad',
        nativeLanguage: 'Ru',
        learningLanguage: 'En',
        rating: 1395,
    },
]

export const FriendRequestsPopover = () => {
    const { user } = useUser()
    const requestsCount = mockFriendRequests.length

    if (!user) {
        return null
    }

    return (
        <DropdownMenu>
            <Button
                variant="outline"
                className={cn(
                    'btn-3d-sm relative text-secondary-foreground hover:text-primary',
                    'has-[>svg]:p-2 data-[state=open]:text-primary min-[450px]:has-[>svg]:p-3',
                )}
                aria-label="Заявки в друзья"
                asChild
            >
                <DropdownMenuTrigger>
                    <Bell className="size-5 sm:size-6" />
                    {requestsCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-destructive text-[10px] leading-none font-black text-white">
                            {requestsCount}
                        </span>
                    )}
                </DropdownMenuTrigger>
            </Button>

            <DropdownMenuContent
                align="end"
                className="w-[340px] rounded-[28px] p-3 sm:w-[380px]"
                onCloseAutoFocus={(event) => event.preventDefault()}
            >
                <div className="mb-3 flex items-center justify-between px-2">
                    <h2 className="font-luckiest text-xl tracking-wide">
                        Заявки в друзья
                    </h2>
                    {requestsCount > 0 && (
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-black text-primary">
                            {requestsCount}
                        </span>
                    )}
                </div>

                {requestsCount > 0 ? (
                    <div className="flex max-h-[360px] flex-col gap-2 overflow-y-auto">
                        {mockFriendRequests.map((request) => (
                            <div
                                key={request.requestId}
                                className="flex items-center gap-3 rounded-[22px] border border-slate-100 bg-white p-3 shadow-xs"
                            >
                                <UserAvatar
                                    avatarUrl={request.avatarUrl}
                                    username={request.username}
                                    className="size-11"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-black text-slate-900">
                                        {request.username}
                                    </p>
                                    <p className="truncate text-xs font-semibold text-slate-400">
                                        {request.fullname}
                                    </p>
                                </div>
                                <FriendRequestActions
                                    requestId={request.requestId}
                                    friendUsername={request.username}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[22px] border border-dashed border-slate-200 p-6 text-center text-sm font-semibold text-slate-400">
                        Новых заявок нет
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
