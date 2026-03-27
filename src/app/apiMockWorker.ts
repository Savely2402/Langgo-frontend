import { setupWorker } from 'msw/browser'
import { dictionaryHandlers } from '@/entities/dictionary/testing'
import { userHandlers } from '@/entities/user/testing'
import { loginHandlers } from '@/features/auth-login/testing'
import { logoutHandlers } from '@/features/auth-logout/testing'

export const worker = setupWorker(
    ...userHandlers,
    ...loginHandlers,
    ...logoutHandlers,
    ...dictionaryHandlers,
)
