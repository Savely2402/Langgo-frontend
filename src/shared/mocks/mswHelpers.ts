import { HttpResponse } from 'msw'

export function sendBadAuthorization(message: string) {
    return HttpResponse.json(
        {
            message,
        },
        {
            status: 401,
        },
    )
}
