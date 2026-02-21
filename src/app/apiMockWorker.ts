import { setupWorker } from 'msw/browser'
import { userHandlers } from '@/entities/user/testing'
import { authHandlers } from '@/features/auth/testing'

export const worker = setupWorker(...userHandlers, ...authHandlers)
