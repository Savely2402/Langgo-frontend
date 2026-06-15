import { UserCard, useUser, type UserProfile } from '@/entities/user'
import {
    InviteFriendToBattleButton,
    type FriendBattleInviteStatus,
} from '@/features/invite-friend-to-battle'
import { FormTabsList } from '@/shared/ui/FormTabsList'
import { Tabs, TabsContent } from '@/shared/ui/Tabs'
import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'

type MockFriend = UserProfile & {
    status: FriendBattleInviteStatus
}

const mockFriends: MockFriend[] = [
    {
        id: 2,
        username: 'word_wizard',
        fullname: 'Word Wizard',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wizard',
        nativeLanguage: 'Ru',
        learningLanguage: 'En',
        rating: 1840,
        status: 'online',
    },
    {
        id: 3,
        username: 'grammar_runner',
        fullname: 'Grammar Runner',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=runner',
        nativeLanguage: 'En',
        learningLanguage: 'Ru',
        rating: 1510,
        status: 'inGame',
    },
    {
        id: 4,
        username: 'quiet_polyglot',
        fullname: 'Quiet Polyglot',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=polyglot',
        nativeLanguage: 'Ru',
        learningLanguage: 'En',
        rating: 1280,
        status: 'offline',
    },
]

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
                        <div className="flex flex-col gap-3">
                            {mockFriends.map((friend) => (
                                <UserCard
                                    key={friend.id}
                                    user={friend}
                                    actionsSlot={
                                        <InviteFriendToBattleButton
                                            friendId={friend.id}
                                            friendUsername={friend.username}
                                            status={friend.status}
                                        />
                                    }
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="requests" className="mt-4">
                        <div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-400">
                            Заявки в друзья появятся здесь позже
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
