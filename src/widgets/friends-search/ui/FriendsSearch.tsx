import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router'
import {
    UserCard,
    useGetUserFriendsQuery,
    useSearchUsersQuery,
    useUser,
} from '@/entities/user'
import { SendFriendRequestButton } from '@/features/send-friend-request'
import { routes } from '@/shared/config'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/shared/ui/InputGroup'

export const FriendsSearch = () => {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const { user } = useUser()

    const searchQuery = searchValue.trim()
    const hasSearch = searchQuery.length > 0

    const {
        data: foundUsers = [],
        isFetching,
        isError,
    } = useSearchUsersQuery(searchQuery, {
        skip: !hasSearch,
    })

    const { data: friends = [] } = useGetUserFriendsQuery(user?.id ?? 0, {
        skip: !user,
    })

    const searchResults = foundUsers.filter(
        (foundUser) => foundUser.id !== user?.id,
    )

    const isUserFriend = (userId: number) => {
        return friends.some((friend) => friend.id === userId)
    }

    return (
        <div className="relative z-30 mb-4">
            <InputGroup className="bg-white">
                <InputGroupAddon>
                    <Search className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                    value={searchValue}
                    placeholder="Найти друга по username"
                    onChange={(event) => setSearchValue(event.target.value)}
                />
            </InputGroup>

            {hasSearch && (
                <div className="absolute top-full right-0 left-0 z-30 mt-3 max-h-[420px] overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
                    {isFetching ? (
                        <div className="rounded-[24px] border border-dashed border-slate-200 p-6 text-center text-sm font-semibold text-slate-400">
                            Ищем пользователей...
                        </div>
                    ) : isError ? (
                        <div className="rounded-[24px] border border-dashed border-red-200 bg-red-50 p-6 text-center text-sm font-semibold text-red-400">
                            Не удалось выполнить поиск
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {searchResults.map((foundUser) => (
                                <UserCard
                                    key={foundUser.id}
                                    user={foundUser}
                                    className="shadow-none hover:bg-slate-50"
                                    onClick={() =>
                                        navigate(
                                            routes.profile(
                                                String(foundUser.id),
                                            ),
                                        )
                                    }
                                    actionsSlot={
                                        <SendFriendRequestButton
                                            userId={foundUser.id}
                                            username={foundUser.username}
                                            isFriend={isUserFriend(
                                                foundUser.id,
                                            )}
                                        />
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[24px] border border-dashed border-slate-200 p-6 text-center text-sm font-semibold text-slate-400">
                            Ничего не найдено
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
