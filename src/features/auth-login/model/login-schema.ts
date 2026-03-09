import * as z from 'zod'

export const loginFormSchema = z
    .object({
        email: z.email('Must be a valid email').min(1, 'Email is required'),
        password: z.string().min(1, 'Password is required'),
    })
    .required()

export type LoginFormSchema = z.infer<typeof loginFormSchema>
