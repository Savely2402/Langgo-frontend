import { http } from 'msw'
import { sendBadAuthorization } from '@/shared/mocks/mswHelpers'
import { sendUserData } from './mswHelpers'
import { MOCK_USERS } from './userMocks'

export const userHandlers = [
    http.get('/api/auth/me', ({ cookies }) => {
        if (cookies.accessToken) {
            const user = MOCK_USERS.find(
                (user) => user.userData.id === Number(cookies.accessToken),
            )
            if (user) {
                return sendUserData(user)
            }
        }

        return sendBadAuthorization('Токен истек или отсутствует')
    }),
    http.get('/api/auth/refresh', ({ cookies }) => {
        if (cookies.refreshToken) {
            const user = MOCK_USERS.find(
                (user) => user.userData.id === Number(cookies.refreshToken),
            )
            if (user) {
                return sendUserData(user)
            }
        }

        return sendBadAuthorization('Токен истек или отсутствует')
    }),
]
