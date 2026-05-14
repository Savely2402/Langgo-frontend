import * as z from 'zod'
import { authLanguageCodes, type AuthLanguageCode } from '@/shared/config'

const authLanguageCodeSchema = z
    .string()
    .superRefine((value, ctx) => {
        if (!value) {
            ctx.addIssue({
                code: 'custom',
                message: 'Language is required',
            })

            return
        }

        if (!authLanguageCodes.includes(value as AuthLanguageCode)) {
            ctx.addIssue({
                code: 'custom',
                message: 'Select a valid language',
            })
        }
    })
    .transform((value) => value as AuthLanguageCode)

export const registerFormSchema = z
    .object({
        fullname: z.string().min(1, 'Full name is required'),
        username: z.string().min(1, 'Username is required'),
        email: z.email('Must be a valid email').min(1, 'Email is required'),
        password: z.string().min(1, 'Password is required'),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
        langFrom: authLanguageCodeSchema,
        langTo: authLanguageCodeSchema,
    })
    .superRefine(({ password, confirmPassword, langFrom, langTo }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Passwords must match',
            })
        }

        if (langFrom && langTo && langFrom === langTo) {
            ctx.addIssue({
                code: 'custom',
                path: ['langTo'],
                message: 'Languages must be different',
            })
        }
    })
    .required()

export type RegisterFormInput = z.input<typeof registerFormSchema>
export type RegisterFormSchema = z.output<typeof registerFormSchema>
