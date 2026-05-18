import { useParams } from 'react-router'
import { selectGameStatus } from '@/entities/game/model/selectors'
import { useAppSelector } from '@/shared/lib/store'
import { ActiveGameWidget } from '@/widgets/active-game'
import { GameHeaderWidget } from '@/widgets/game-header'
import { GameLobbyWidget } from '@/widgets/game-lobby'
import { MatchFoundOverlay } from '@/widgets/match-found'
import { MatchResultsWidget } from '@/widgets/match-results'
import { RoundResultsWidget } from '@/widgets/round-results'
import { useGameConnection } from '../lib/useGameConnection'

export const MatchRoomPage = () => {
    const { roomId } = useParams()

    useGameConnection(roomId)

    const gameStatus = useAppSelector(selectGameStatus)

    if (gameStatus === 'idle') {
        return <GameLobbyWidget />
    }

    if (gameStatus === 'starting') {
        console.log('Hello')

        return (
            <>
                <MatchFoundOverlay />
            </>
        )
    }
    if (gameStatus === 'playing' || gameStatus === 'revealing') {
        return (
            <>
                <GameHeaderWidget />
                <ActiveGameWidget />
            </>
        )
    }

    if (gameStatus === 'intermission') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <RoundResultsWidget />
            </div>
        )
    }

    if (gameStatus === 'finished') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <MatchResultsWidget />
            </div>
        )
    }

    return null
}
