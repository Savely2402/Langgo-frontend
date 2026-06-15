import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '@/shared/ui/Button'
import { Header } from '@/shared/ui/Header'
import { GameSetupForm } from '@/widgets/game-setup-form'
import { FriendRequestsPopover } from '@/widgets/header-profile'

export const GameSetupPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <Header
                leftSlot={
                    <Button variant="ghost" onClick={() => navigate(-1)}>
                        <ArrowLeft />
                        Назад
                    </Button>
                }
                rightSlot={<FriendRequestsPopover />}
            />

            <div className="mx-auto max-w-[640px] px-4">
                <h1 className="my-8 font-luckiest text-4xl tracking-widest">
                    Создание лобби
                </h1>

                <GameSetupForm />
            </div>
        </>
    )
}
