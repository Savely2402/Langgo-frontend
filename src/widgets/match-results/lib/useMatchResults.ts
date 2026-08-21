import {
    selectGameSettings,
    selectUserScore,
    selectPlayersForGame,
} from '@/entities/game'
import { useUser } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/store'
import type { MatchResultType } from '../config/matchResultConfig'

export const useMatchResults = () => {
    const { user } = useUser()
    // const winnerId = useAppSelector(selectGameWinnerId)
    const [, opponent] = useAppSelector((state) =>
        selectPlayersForGame(state, user?.id),
    )

    const myScore =
        useAppSelector((state) => selectUserScore(state, user?.id)) ?? 0
    const opponentScore =
        useAppSelector((state) => selectUserScore(state, opponent?.id)) ?? 0

    const gameSettings = useAppSelector(selectGameSettings)
    const ratingChange = 45

    let result: MatchResultType

    if (!user) return null
    if (!opponent) {
        result = 'completed'
    } else {
        result =
            myScore > opponentScore
                ? 'win'
                : opponentScore > myScore
                  ? 'lose'
                  : 'draw'
    }

    const stats = {
        rounds: result === 'win' ? 2 : 1,
        averageTime: '1.4 с',
        accuracy: '71%',
    }

    return {
        user,
        opponent,
        myScore,
        opponentScore,
        result,
        gameSettings,
        stats,
        ratingChange,
    }
}
