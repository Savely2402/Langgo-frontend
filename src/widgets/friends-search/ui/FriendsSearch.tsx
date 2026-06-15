import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router'
import { UserCard, type UserProfile } from '@/entities/user'
import { SendFriendRequestButton } from '@/features/send-friend-request'
import { routes } from '@/shared/config'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/shared/ui/InputGroup'

type MockSearchUser = UserProfile & {
    isFriend: boolean
}

const mockSearchUsers: MockSearchUser[] = [
    {
        id: 2,
        username: 'word_wizard',
        fullname: 'Word Wizard',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wizard',
        nativeLanguage: 'Ru',
        learningLanguage: 'En',
        rating: 1840,
        isFriend: true,
    },
    {
        id: 3,
        username: 'grammar_runner',
        fullname: 'Grammar Runner',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=runner',
        nativeLanguage: 'En',
        learningLanguage: 'Ru',
        rating: 1510,
        isFriend: true,
    },
    {
        id: 7,
        username: 'tense_tactician',
        fullname: 'Tense Tactician',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tactician',
        nativeLanguage: 'En',
        learningLanguage: 'Ru',
        rating: 1645,
        isFriend: false,
    },
    {
        id: 8,
        username: 'phrase_hunter',
        fullname: 'Phrase Hunter',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hunter',
        nativeLanguage: 'Ru',
        learningLanguage: 'En',
        rating: 1475,
        isFriend: false,
    },
    {
        id: 9,
        username: 'accent_alchemist',
        fullname: 'Accent Alchemist',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alchemist',
        nativeLanguage: 'En',
        learningLanguage: 'Ru',
        rating: 1910,
        isFriend: false,
    },
]

export const FriendsSearch = () => {
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const normalizedSearch = searchValue.trim().toLowerCase()
    const hasSearch = normalizedSearch.length > 0
    const foundUsers = hasSearch
        ? mockSearchUsers.filter((user) =>
              user.username.toLowerCase().includes(normalizedSearch),
          )
        : []

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
                    {foundUsers.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {foundUsers.map((user) => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    className="shadow-none"
                                    onClick={() =>
                                        navigate(
                                            routes.profile(String(user.id)),
                                        )
                                    }
                                    actionsSlot={
                                        <SendFriendRequestButton
                                            userId={user.id}
                                            username={user.username}
                                            isFriend={user.isFriend}
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
