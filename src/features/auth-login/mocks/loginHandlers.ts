import { delay, http } from 'msw'
import { sendUserData, MOCK_USERS } from '@/entities/user/testing'
import { sendBadAuthorization } from '@/shared/mocks/mswHelpers'
import type { RequestLoginBody } from '../api/types'

export const loginHandlers = [
    http.post<object, RequestLoginBody>(
        '/api/auth/login',
        async ({ request }) => {
            const loginFormData = await request.clone().json()

            await delay(500)

            const user = MOCK_USERS.find(
                (user) =>
                    user.email === loginFormData.email &&
                    user.password === loginFormData.password,
            )

            if (user) {
                return sendUserData(user)
            }

            return sendBadAuthorization('Неверный логин или пароль')
        },
    ),
]
