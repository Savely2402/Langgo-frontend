import type { UserResponseDTO } from '../api/types'

export type MockUser = {
    userData: Omit<UserResponseDTO, 'email'>
    email: string
    password: string
}

export const MOCK_USERS: MockUser[] = [
    {
        userData: {
            id: 1,
            username: 'john_doe',
            fullname: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?u=1',
            learningLanguage: 'EN',
            nativeLanguage: 'RU',
            rating: 0,
        },
        email: 'user@gmail.com',
        password: 'user123',
    },
    {
        userData: {
            id: 2,
            username: 'jane_smith',
            fullname: 'Jane Smith',
            avatar: 'https://i.pravatar.cc/150?u=2',
            learningLanguage: 'EN',
            nativeLanguage: 'RU',
            rating: 0,
        },
        email: 'jane@gmail.com',
        password: 'jane123',
    },
    {
        userData: {
            id: 3,
            username: 'alex_admin',
            fullname: 'Alex Johnson',
            avatar: 'https://i.pravatar.cc/150?u=3',
            learningLanguage: 'EN',
            nativeLanguage: 'RU',
            rating: 0,
        },
        email: 'alex@gmail.com',
        password: 'alex123',
    },
]
