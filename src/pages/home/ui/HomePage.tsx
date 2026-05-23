import { useState } from 'react'
import { BookOpen, Play, Users } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useUser } from '@/entities/user'
import { AuthRequiredDialog } from '@/features/auth-required-dialog'
import { FindMatchButton } from '@/features/find-match'
import { routes } from '@/shared/config'
import { Button } from '@/shared/ui/Button'
import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'
import { BaseModeCard } from './BaseModeCard'
import { RankedModeCard } from './RankedModeCard'

export type ModeId = 'ranked' | 'solo' | 'custom'

export const HomePage = () => {
    const { user } = useUser()
    const navigate = useNavigate()

    const [isActive, setIsActive] = useState<ModeId>(user ? 'ranked' : 'solo')
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)

    const handleModeClick = (mode: ModeId, requiresAuth: boolean) => {
        if (requiresAuth && !user) {
            setIsAuthDialogOpen(true)
            return
        }
        setIsActive(mode)
    }

    return (
        <div className="flex h-dvh flex-col overflow-hidden">
            <AppHeader rightSlot={<HeaderProfile />} />
            <main className="flex flex-1 flex-col justify-center gap-6">
                <h1 className="font-luckiest text-3xl tracking-wide sm:text-4xl">
                    Выберите режим
                </h1>
                <RankedModeCard
                    isActive={isActive === 'ranked'}
                    isLocked={!user}
                    onClick={() => handleModeClick('ranked', true)}
                />

                <BaseModeCard
                    isActive={isActive === 'solo'}
                    isLocked={false}
                    onClick={() => handleModeClick('solo', false)}
                    icon={<BookOpen className="size-6" />}
                    title="Одиночная игра"
                    subtitle="Тренировка в своем темпе"
                    activeColorClass="bg-sky-100 text-sky-600"
                />

                <BaseModeCard
                    isActive={isActive === 'custom'}
                    isLocked={!user}
                    onClick={() => handleModeClick('custom', true)}
                    icon={<Users className="size-6" />}
                    title="Своя игра"
                    subtitle="Игра с друзьями"
                    activeColorClass="bg-purple-100 text-purple-600"
                />
            </main>
            <div className="flex flex-col items-center justify-end pb-10">
                {isActive === 'ranked' ? (
                    <FindMatchButton className="h-13 w-full" />
                ) : (
                    <Button
                        className="btn-3d h-14 w-full text-lg font-black"
                        onClick={() => navigate(routes.gameSetup)}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Play className="size-5" />
                            <span className="font-luckiest font-normal tracking-widest">
                                {isActive === 'solo'
                                    ? 'Начать игру'
                                    : 'Создать комнату'}
                            </span>
                        </div>
                    </Button>
                )}
            </div>
            <AuthRequiredDialog
                open={isAuthDialogOpen}
                onOpenChange={setIsAuthDialogOpen}
            />
        </div>
    )
}
