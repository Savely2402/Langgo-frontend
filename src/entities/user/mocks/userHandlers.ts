import { http } from 'msw'
import { sendBadAuthorization } from '@/shared/api'
import { sendUserData } from './mswHelpers'

export const userHandlers = [
    http.get('/api/auth/me', ({ cookies }) => {
        if (cookies.accessToken) {
            return sendUserData()
        }

        return sendBadAuthorization('Токен истек или отстутвует')
    }),
]
