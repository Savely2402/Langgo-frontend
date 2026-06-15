import { useNavigate } from 'react-router'
import { UserCard, type UserProfile } from '@/entities/user'
import { FriendRequestActions } from '@/features/respond-friend-request'
import { routes } from '@/shared/config'

type MockFriendRequest = UserProfile & {
    requestId: number
}

const mockFriendRequests: MockFriendRequest[] = [
    {
        id: 5,
        requestId: 101,
        username: 'syntax_samurai',
        fullname: 'Syntax Samurai',
        avatarUrl:
            'https://api.dicebear.com/10.x/avataaars/svg?eyesVariant=closed,default,happy,side,squint&mouthVariant=concerned,default,disbelief,eating,serious,smile,tongue,twinkle,vomit&seed=pfzzdp6z',
        nativeLanguage: 'En',
        learningLanguage: 'Ru',
        rating: 1720,
    },
    {
        id: 6,
        requestId: 102,
        username: 'vocab_nomad',
        fullname: 'Vocab Nomad',
        avatarUrl:
            'https://api.dicebear.com/10.x/avataaars/svg?eyesVariant=closed,default,happy,side,squint&mouthVariant=concerned,default,disbelief,eating,serious,smile,tongue,twinkle,vomit&seed=spxr99e8',
        nativeLanguage: 'Ru',
        learningLanguage: 'En',
        rating: 1395,
    },
]

export const FriendRequestsList = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-3">
            {mockFriendRequests.map((request) => (
                <UserCard
                    key={request.requestId}
                    user={request}
                    onClick={() => navigate(routes.profile(String(request.id)))}
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
