import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import { RequestsPopover } from '@/features/friends/manage-requests'
import { Button } from '@/shared/ui/Button'
import { Header } from '@/shared/ui/Header'
import { GameSetupForm } from '@/widgets/game-setup-form'

export const GameSetupPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <Header
                leftSlot={
                    <Button variant={'ghost'} onClick={() => navigate(-1)}>
                        <ArrowLeft />
                        Назад
                    </Button>
                }
                rightSlot={<RequestsPopover />}
            />

            <div className="mx-auto max-w-[640px] px-4">
                <h1 className="my-8 text-4xl font-black">Создание лобби</h1>

                <GameSetupForm />
            </div>
        </>
    )
}
