import type { User } from '../model/types'

export type MockUser = {
    userData: Omit<User, 'email'>
    email: string
    password: string
}

export const MOCK_USERS: MockUser[] = [
    {
        userData: {
            id: 1,
            username: 'john_doe',
            fullname: 'John Doe',
            avatarUrl: 'https://i.pravatar.cc/150?u=1',
        },
        email: 'user@gmail.com',
        password: 'user123',
    },
    {
        userData: {
            id: 2,
            username: 'jane_smith',
            fullname: 'Jane Smith',
            avatarUrl: 'https://i.pravatar.cc/150?u=2',
        },
        email: 'jane@gmail.com',
        password: 'jane123',
    },
    {
        userData: {
            id: 3,
            username: 'alex_admin',
            fullname: 'Alex Johnson',
            avatarUrl: 'https://i.pravatar.cc/150?u=3',
        },
        email: 'alex@gmail.com',
        password: 'alex123',
    },
]
