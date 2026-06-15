import { useUser } from '@/entities/user'
import { FormTabsList } from '@/shared/ui/FormTabsList'
import { Tabs, TabsContent } from '@/shared/ui/Tabs'
import { AppHeader } from '@/widgets/app-header'
import { FriendRequestsList } from '@/widgets/friend-requests-list'
import { FriendsList } from '@/widgets/friends-list'
import { HeaderProfile } from '@/widgets/header-profile'

export const FriendsPage = () => {
    const { user } = useUser()

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
                <Tabs defaultValue="friends">
                    <FormTabsList
                        items={[
                            {
                                value: 'friends',
                                label: <>Мои друзья</>,
                            },
                            {
                                value: 'requests',
                                label: <>Заявки</>,
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
