import { http, HttpResponse } from 'msw'

export const logoutHandlers = [
    http.post('/api/auth/logout', () => {
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
