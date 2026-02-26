export type MockUser = {
    userData: {
        id: number
        username: string
        fullName: string
        avatar: string
    }
    email: string
    password: string
}

export const MOCK_USERS: MockUser[] = [
    {
        userData: {
            id: 1,
            username: 'john_doe',
            fullName: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?u=1',
        },
        email: 'user@gmail.com',
        password: 'user123',
    },
    {
        userData: {
            id: 2,
            username: 'jane_smith',
            fullName: 'Jane Smith',
            avatar: 'https://i.pravatar.cc/150?u=2',
        },
        email: 'jane@gmail.com',
        password: 'jane123',
    },
    {
        userData: {
            id: 3,
            username: 'alex_admin',
            fullName: 'Alex Johnson',
            avatar: 'https://i.pravatar.cc/150?u=3',
        },
        email: 'john@gmail.com',
        password: 'john123',
    },
]
