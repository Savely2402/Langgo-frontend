import { useNavigate } from 'react-router'
import { UserCard, type UserProfile } from '@/entities/user'
import {
    InviteFriendToBattleButton,
    type FriendBattleInviteStatus,
} from '@/features/invite-friend-to-battle'
import { routes } from '@/shared/config'

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

export const FriendsList = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-3">
            {mockFriends.map((friend) => (
                <UserCard
                    key={friend.id}
                    user={friend}
                    onClick={() => navigate(routes.profile(String(friend.id)))}
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
    )
}
