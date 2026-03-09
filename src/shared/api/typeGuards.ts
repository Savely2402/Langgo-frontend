import * as z from 'zod'
import type { SerializedError } from '@reduxjs/toolkit'

/**
 * Схема в соответствии с типом FetchBaseQueryError
 */
const RtkErrorSchema = z.union([
    z.object({
        status: z.number(),
        data: z.object({
            message: z.string(),
        }),
    }),
    z.object({
        status: z.string(),
        data: z.unknown().optional(), // data опциональная, так как это системная ошибка
        error: z.string(),
        originalStatus: z.number().optional(),
    }),
])

type RtkError = z.infer<typeof RtkErrorSchema>

export function isRtkQueryError(error: unknown): error is RtkError {
    return RtkErrorSchema.safeParse(error).success
}

export function isSerializedError(error: unknown): error is SerializedError {
    return (
        typeof error === 'object' &&
        error !== null &&
        ['name', 'message', 'stack', 'code'].some(
            (key) =>
                key in error &&
                typeof (error as Record<string, unknown>)[key] === 'string',
        )
    )
}
