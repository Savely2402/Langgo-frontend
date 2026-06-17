import {
    useGetIncomingFriendRequestsQuery,
    useGetUserFriendsQuery,
    useUser,
} from '@/entities/user'
import { FormTabsList } from '@/shared/ui/FormTabsList'
import { Tabs, TabsContent } from '@/shared/ui/Tabs'
import { AppHeader } from '@/widgets/app-header'
import { FriendRequestsList } from '@/widgets/friend-requests-list'
import { FriendsList } from '@/widgets/friends-list'
import { FriendsSearch } from '@/widgets/friends-search'
import { HeaderProfile } from '@/widgets/header-profile'

const renderTabLabel = (label: string, count: number) => (
    <span className="flex items-center gap-2">
        {label}
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-black text-primary">
            {count}
        </span>
    </span>
)

export const FriendsPage = () => {
    const { user } = useUser()
    const { data: friends = [] } = useGetUserFriendsQuery(user?.id ?? 0, {
        skip: !user,
    })
    const { data: friendRequests = [] } = useGetIncomingFriendRequestsQuery(
        undefined,
        {
            skip: !user,
        },
    )

    if (!user) return null

    return (
        <div>
            <AppHeader rightSlot={<HeaderProfile />} />
            <div className="mx-auto max-w-[640px] px-4">
                <div className="flex items-center justify-between">
                    <h1 className="my-8 font-luckiest text-3xl sm:text-4xl">
                        Мои друзья
                    </h1>
                </div>
                <FriendsSearch />
                <Tabs defaultValue="friends">
                    <FormTabsList
                        items={[
                            {
                                value: 'friends',
                                label: renderTabLabel(
                                    'Мои друзья',
                                    friends.length,
                                ),
                            },
                            {
                                value: 'requests',
                                label: renderTabLabel(
                                    'Заявки',
                                    friendRequests.length,
                                ),
                            },
                        ]}
                    />

                    <TabsContent value="friends" className="mt-4">
                        <FriendsList />
                    </TabsContent>

                    <TabsContent value="requests" className="mt-4">
                        <FriendRequestsList />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
