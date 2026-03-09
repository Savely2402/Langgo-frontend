import { HttpResponse } from 'msw'
import { type MockUser } from './userMocks'
import type { AuthResponseDTO } from '../api/types'

export function sendUserData(user: MockUser) {
    const response = HttpResponse.json<AuthResponseDTO>(
        {
            user: {
                ...user.userData,
                email: user.email,
            },
        },
        {
            status: 200,
        },
    )

    document.cookie = `accessToken=${user.userData.id}; Path=/; Max-Age=3600`
    document.cookie = `refreshToken=${user.userData.id}; Path=/; Max-Age=3600`

    return response
}
