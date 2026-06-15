import { UserCard, type UserProfile } from '@/entities/user'
import { FriendRequestActions } from '@/features/respond-friend-request'

type MockFriendRequest = UserProfile & {
    requestId: number
}

const mockFriendRequests: MockFriendRequest[] = [
    {
        id: 5,
        requestId: 101,
        username: 'syntax_samurai',
        fullname: 'Syntax Samurai',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=samurai',
        nativeLanguage: 'En',
        learningLanguage: 'Ru',
        rating: 1720,
    },
    {
        id: 6,
        requestId: 102,
        username: 'vocab_nomad',
        fullname: 'Vocab Nomad',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nomad',
        nativeLanguage: 'Ru',
        learningLanguage: 'En',
        rating: 1395,
    },
]

export const FriendRequestsList = () => {
    return (
        <div className="flex flex-col gap-3">
            {mockFriendRequests.map((request) => (
                <UserCard
                    key={request.requestId}
                    user={request}
                    actionsSlot={
                        <FriendRequestActions
                            requestId={request.requestId}
                            friendUsername={request.username}
                        />
                    }
                />
            ))}
        </div>
    )
}
