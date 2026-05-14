import {
    selectGameSettings,
    selectGameWinnerId,
    selectUserScore,
} from '@/entities/game'
import { selectPlayersForGame } from '@/entities/player'
import { useUser } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/store'
import type { MatchResult } from '../config/matchResultConfig'

export const useMatchResults = () => {
    const { user } = useUser()
    const winnerId = useAppSelector(selectGameWinnerId)
    const [, opponent] = useAppSelector(selectPlayersForGame)

    const myScore =
        useAppSelector((state) => selectUserScore(state, user?.id)) ?? 0
    const opponentScore =
        useAppSelector((state) => selectUserScore(state, opponent?.id)) ?? 0

    const gameSettings = useAppSelector(selectGameSettings)
    const ratingChange = 45
    const stats = {
        rounds: 11,
        averageTime: '1.4 с',
        accuracy: '71%',
    }

    if (!user || !opponent) return null

    const result: MatchResult =
        user.id === winnerId
            ? 'win'
            : opponent.id === winnerId
              ? 'lose'
              : 'draw'

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
