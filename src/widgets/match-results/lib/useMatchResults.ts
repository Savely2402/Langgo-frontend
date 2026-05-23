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

    // console.log("WINNER ID: ", winnerId)

    const myScore =
        useAppSelector((state) => selectUserScore(state, user?.id)) ?? 0
    const opponentScore =
        useAppSelector((state) => selectUserScore(state, opponent?.id)) ?? 0

    // console.log("My SCORED: ", myScore)

    const gameSettings = useAppSelector(selectGameSettings)
    const ratingChange = 45
    const stats = {
        rounds: 11,
        averageTime: '1.4 с',
        accuracy: '71%',
    }

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
