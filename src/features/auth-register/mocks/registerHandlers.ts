import { delay, http, HttpResponse } from 'msw'
import { MOCK_USERS, sendUserData } from '@/entities/user/testing'
import type { RequestRegisterBody } from '../api/types'

export const registerHandlers = [
    http.post<object, RequestRegisterBody>(
        '/api/auth/register',
        async ({ request }) => {
            const registerFormData = await request.clone().json()

            await delay(500)

            const emailExists = MOCK_USERS.some(
                (user) => user.email === registerFormData.email,
            )

            if (emailExists) {
                return HttpResponse.json(
                    {
                        message: 'User with this email already exists',
                    },
                    {
                        status: 409,
                    },
                )
            }

            const usernameExists = MOCK_USERS.some(
                (user) => user.userData.username === registerFormData.username,
            )

            if (usernameExists) {
                return HttpResponse.json(
                    {
                        message: 'User with this username already exists',
                    },
                    {
                        status: 409,
                    },
                )
            }

            const nextUserId =
                Math.max(...MOCK_USERS.map((user) => user.userData.id)) + 1

            const newUser = {
                userData: {
                    id: nextUserId,
                    username: registerFormData.username,
                    fullname: registerFormData.fullname,
                    avatarUrl: `https://i.pravatar.cc/150?u=${registerFormData.username}`,
                },
                email: registerFormData.email,
                password: registerFormData.password,
            }

            MOCK_USERS.push(newUser)

            return sendUserData(newUser)
        },
    ),
]
