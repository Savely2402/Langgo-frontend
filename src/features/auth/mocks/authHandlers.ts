import { http, HttpResponse } from 'msw'
import { sendUserData, MOCK_USER } from '@/entities/user/testing'
import { sendBadAuthorization } from '@/shared/api'
import type { RequestLoginBody } from '../api/types'

export const authHandlers = [
    http.post<object, RequestLoginBody>(
        '/api/auth/login',
        async ({ request }) => {
            const loginFormData = await request.clone().json()

            if (
                loginFormData.email === MOCK_USER.email &&
                loginFormData.password === MOCK_USER.password
            ) {
                return sendUserData()
            }

            return sendBadAuthorization('Неверный логин или пароль')
        },
    ),
    http.get('/api/auth/refresh', ({ cookies }) => {
        if (cookies.refreshToken) {
            return sendUserData()
        }

        return sendBadAuthorization('Токен истек или отстутвует')
    }),
    http.get('/api/auth/logout', () => {
        document.cookie = 'accessToken=; Path=/; Max-Age=0'
        document.cookie = 'refreshToken=; Path=/; Max-Age=0'

        return HttpResponse.json(
            {
                message: 'Successful Logout',
            },
            {
                status: 200,
            },
        )
    }),
]
