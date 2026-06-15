import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Key, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { useChangePasswordMutation } from '../api/passwordApi'

// Схема валидации
const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Введите текущий пароль'),
        newPassword: z
            .string()
            .min(6, 'Пароль должен быть не менее 6 символов'),
        confirmPassword: z.string().min(1, 'Подтвердите новый пароль'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'], // Ошибка повесится на это поле
    })

type PasswordFormValues = z.infer<typeof passwordSchema>

export const ChangePasswordForm = () => {
    // Состояние для отображения текста пароля (глазик)
    const [showPassword, setShowPassword] = useState(false)

    const [changePassword, { isLoading }] = useChangePasswordMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (data: PasswordFormValues) => {
        try {
            // Отправляем на бэкенд только то, что он просит (без confirmPassword)
            await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            }).unwrap()

            toast.success('Пароль успешно изменен!')
            reset() // Очищаем форму после успеха
        } catch (error) {
            console.error(error)
            toast.error(
                'Ошибка при изменении пароля. Проверьте текущий пароль.',
            )
        }
    }

    return (
        <div className="mx-auto w-full rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
            {/* Заголовок */}
            <div className="mb-8 flex items-center gap-3">
                <Key className="text-[#10B981]" size={24} strokeWidth={2.5} />
                <h2 className="text-2xl font-black text-[#111827]">
                    Безопасность
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Текущий пароль */}
                <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Текущий пароль
                    </label>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        disabled={isLoading}
                        {...register('currentPassword')}
                        className={cn(
                            'h-14 rounded-2xl border-2 border-transparent bg-slate-50 px-5 text-base transition-all focus-visible:border-emerald-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-100',
                            errors.currentPassword &&
                                'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100',
                        )}
                    />
                    {errors.currentPassword && (
                        <span className="text-sm font-medium text-red-500">
                            {errors.currentPassword.message}
                        </span>
                    )}
                </div>

                {/* Новый пароль */}
                <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Новый пароль
                    </label>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Введите новый пароль"
                        disabled={isLoading}
                        {...register('newPassword')}
                        className={cn(
                            'h-14 rounded-2xl border-2 border-transparent bg-slate-50 px-5 text-base transition-all focus-visible:border-emerald-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-100',
                            errors.newPassword &&
                                'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100',
                        )}
                    />
                    {errors.newPassword && (
                        <span className="text-sm font-medium text-red-500">
                            {errors.newPassword.message}
                        </span>
                    )}
                </div>

                {/* Подтверждение пароля */}
                <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Подтверждение
                    </label>
                    <div className="relative">
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Повторите пароль"
                            disabled={isLoading}
                            {...register('confirmPassword')}
                            className={cn(
                                'h-14 w-full rounded-2xl border-2 border-transparent bg-slate-50 pr-12 pl-5 text-base transition-all focus-visible:border-emerald-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-100',
                                errors.confirmPassword &&
                                    'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-100',
                            )}
                        />
                        {/* Кнопка Глазик */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 focus:outline-none"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-sm font-medium text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </div>

                {/* Кнопка отправки */}
                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        // Используем кастомные стили для соответствия макету (светлый фон, темный текст)
                        className="flex h-14 w-full items-center justify-center rounded-2xl border-2 border-slate-100 bg-slate-50 text-base font-black tracking-wide text-slate-900 transition-all hover:bg-slate-100 active:scale-95 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <Loader2 className="size-6 animate-spin" />
                        ) : (
                            'ОБНОВИТЬ ПАРОЛЬ'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
