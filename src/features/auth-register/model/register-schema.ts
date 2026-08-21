import * as z from 'zod'
import { languageCodeSchema } from '@/shared/config'

export const registerFormSchema = z
    .object({
        fullname: z.string().min(1, 'Введите имя'),
        username: z.string().min(1, 'Введите имя пользователя'),
        email: z.email('Некорректный формат почты').min(1, 'Введите почту'),
        password: z.string().min(1, 'Введите пароль'),
        confirmPassword: z.string().min(1, 'Подтвердите пароль'),
        langFrom: languageCodeSchema,
        langTo: languageCodeSchema,
    })
    .superRefine(({ password, confirmPassword, langFrom, langTo }, ctx) => {
        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Пароли должны совпадать',
            })
        }

        if (langFrom && langTo && langFrom === langTo) {
            ctx.addIssue({
                code: 'custom',
                path: ['langTo'],
                message: 'Языки не должны совпадать',
            })
        }
    })
    .required()

export type RegisterFormInput = z.input<typeof registerFormSchema>
export type RegisterFormSchema = z.output<typeof registerFormSchema>
