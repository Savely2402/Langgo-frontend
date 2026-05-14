import type { Player } from '../model/types'

export const MOCK_PLAYERS: Player[] = [
    {
        id: 1,
        username: 'john_doe',
        isHost: true,
        status: 'ready',
        avatarUrl: 'https://i.pravatar.cc/150?u=1',
        countryCode: 'en',
        rating: 25,
    },
    {
        id: 2,
        username: 'jane_smith',
        isHost: false,
        status: 'waiting',
        avatarUrl: 'https://i.pravatar.cc/150?u=2',
        countryCode: 'en',
        rating: 45,
    },
]
