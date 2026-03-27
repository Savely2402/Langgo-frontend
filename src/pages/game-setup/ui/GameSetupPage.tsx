import { GameSetupForm } from '@/widgets/game-setup/form'
import { GameSetupHeader } from '@/widgets/game-setup/header'

export const GameSetupPage = () => {
    return (
        <>
            <GameSetupHeader />
            <div className="mx-auto max-w-[640px] px-4">
                <h1 className="my-8 text-4xl font-black">Host Lobby</h1>

                <GameSetupForm />
            </div>
        </>
    )
}
