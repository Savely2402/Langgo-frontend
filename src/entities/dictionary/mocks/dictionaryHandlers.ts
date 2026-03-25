import { delay, http, HttpResponse } from 'msw'
import { sendBadAuthorization } from '@/shared/mocks/mswHelpers'
import { CUSTOM_DICTIONARIES } from './dictionaryMocks'
import type { UploadDictionaryRequest } from '../api/types'

export const dictionaryHandlers = [
    http.get('/api/dictionaries/me', ({ cookies }) => {
        if (cookies.accessToken) {
            const userDictionaries = CUSTOM_DICTIONARIES.filter(
                (dictionary) =>
                    dictionary.ownerId === Number(cookies.accessToken),
            )

            return HttpResponse.json(userDictionaries)
        }

        return sendBadAuthorization('Токен не найден')
    }),
    http.post<never, UploadDictionaryRequest, object>(
        '/api/dictionaries/upload',
        async ({ request }) => {
            const data = await request.formData()
            const file = data.get('file')

            if (!file) {
                return HttpResponse.json(
                    { error: 'Документ не загружен' },
                    { status: 400 },
                )
            }

            await delay(3000)

            return HttpResponse.json(
                CUSTOM_DICTIONARIES[
                    Math.round(Math.random() * (CUSTOM_DICTIONARIES.length - 1))
                ],
            )
        },
    ),
    http.delete<{ id: string }, null, object>(
        '/api/dictionaries/:id',
        async ({ params }) => {
            return HttpResponse.json(
                { message: `Словарь с id: ${params.id} успешно удален` },
                { status: 200 },
            )
        },
    ),
]
