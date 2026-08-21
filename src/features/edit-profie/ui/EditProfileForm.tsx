import { useState, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Lock, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { UserAvatar, useUser } from '@/entities/user'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import {
    useUploadAvatarMutation,
    useLazyGetAvatarUrlQuery,
    useUpdateProfileMutation,
} from '../api/profileApi'

const profileSchema = z.object({
    username: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
    fullName: z
        .string()
        .min(2, 'Полное имя должно содержать минимум 2 символа'),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export const ProfileForm = () => {
    const { user, refetch } = useUser()

    const [avatarUrl, setAvatarUrl] = useState<string | null>(
        user?.avatarUrl ?? '',
    )
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation()
    const [getAvatarUrl] = useLazyGetAvatarUrlQuery()
    const [updateProfile, { isLoading: isUpdating }] =
        useUpdateProfileMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        values: {
            username: user?.username ?? '',
            fullName: user?.fullname ?? '',
        },
    })

    if (!user) {
        return null
    }

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0]
        if (!file) return

        try {
            const formData = new FormData()
            formData.append('file', file)

            const uploadResponse = await uploadAvatar({
                userId: String(user.id),
                formData,
            }).unwrap()

            const stringKey = uploadResponse.avatarKey
            const urlResponse = await getAvatarUrl(stringKey).unwrap()

            setAvatarUrl(urlResponse.url)
        } catch (error) {
            console.error(error)
            toast.error('Ошибка при загрузке аватара')
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            await updateProfile({
                email: user.email,
                username: data.username,
                fullName: data.fullName,
                avatar: avatarUrl || '',
                learningLanguage: user.learningLanguage,
                nativeLanguage: user.nativeLanguage,
            }).unwrap()

            refetch()

            toast.success('Профиль успешно обновлен!')
        } catch (error) {
            refetch()
            console.error(error)
            // toast.error('Ошибка при сохранении профиля')
        }
    }

    const isSubmitting = isUploading || isUpdating

    return (
        <div className="mx-auto w-full rounded-[2rem] bg-white p-8 shadow-sm">
            <div className="mb-8 flex justify-start">
                <div className="relative size-28">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                    />

                    <div className="flex">
                        {isUploading ? (
                            <Loader2 className="size-8 animate-spin text-emerald-500" />
                        ) : (
                            <UserAvatar
                                className="size-28"
                                avatarUrl={avatarUrl ?? ''}
                                username={user.username}
                            />
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border-2 border-white bg-primary text-white transition-transform hover:scale-105 hover:bg-emerald-600 active:scale-95 disabled:pointer-events-none disabled:opacity-70"
                        aria-label="Изменить аватар"
                    >
                        <Pencil
                            size={14}
                            fill="currentColor"
                            className="text-white"
                        />
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Поле Username */}
                <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Никнейм
                    </label>
                    <div className="relative">
                        <input
                            {...register('username')}
                            disabled={isSubmitting}
                            className={cn(
                                'h-14 w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 text-lg font-bold text-slate-900 transition-all outline-none focus:border-ring focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:opacity-70',
                                errors.username &&
                                    'border-red-400 focus:border-red-400 focus:ring-red-100',
                            )}
                        />
                    </div>
                    {errors.username && (
                        <span className="text-sm font-medium text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                </div>

                {/* Новое поле Full Name */}
                <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Полное Имя
                    </label>
                    <div className="relative">
                        <input
                            {...register('fullName')}
                            disabled={isSubmitting}
                            placeholder="Иван Иванов"
                            className={cn(
                                'h-14 w-full rounded-2xl border-2 border-transparent bg-slate-50 px-5 text-lg font-bold text-slate-900 transition-all outline-none focus:border-ring focus:bg-white focus:ring-4 focus:ring-emerald-100 disabled:opacity-70',
                                errors.fullName &&
                                    'border-red-400 focus:border-red-400 focus:ring-red-100',
                            )}
                        />
                    </div>
                    {errors.fullName && (
                        <span className="text-sm font-medium text-red-500">
                            {errors.fullName.message}
                        </span>
                    )}
                </div>

                {/* Поле Почты (Read-only) */}
                <div className="space-y-2">
                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                        Почта
                    </label>
                    <div className="flex h-14 w-full items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-5 text-slate-500">
                        <Lock size={18} className="mr-3 opacity-60" />
                        <span className="text-lg font-medium">
                            {user.email}
                        </span>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-3d"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 size-5 animate-spin" />
                                Сохранение...
                            </>
                        ) : (
                            'Сохранить'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
