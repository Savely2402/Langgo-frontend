import { HttpResponse } from 'msw'
import { MOCK_USER } from './userMocks'
import type { AuthResponseDTO } from '../api/types'

export function sendUserData() {
    const response = HttpResponse.json<AuthResponseDTO>(
        {
            user: {
                ...MOCK_USER.userData,
                email: MOCK_USER.email,
            },
        },
        {
            status: 200,
        },
    )

    document.cookie = 'accessToken=123; Path=/; Max-Age=3600'
    document.cookie = 'refreshToken=12345; Path=/; Max-Age=3600'

    return response
}
