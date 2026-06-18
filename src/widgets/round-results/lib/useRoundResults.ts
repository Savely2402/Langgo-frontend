import {
    selectCorrectAnswer,
    selectCurrentQuestion,
    selectLastRoundWinnerId,
    selectNextRoundStartTime,
    selectUserAnswer,
    selectUserScore,
    selectWinnerResponseTime,
    selectPlayersForGame,
} from '@/entities/game'
import { useUser } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/store'
import type { RoundResult } from '../config/roundResultConfig'

export const useRoundResults = () => {
    const { user } = useUser()
    const winnerId = useAppSelector(selectLastRoundWinnerId)
    const [, opponent] = useAppSelector((state) =>
        selectPlayersForGame(state, user?.id),
    )

    const myScore = useAppSelector((state) => selectUserScore(state, user?.id))
    const opponentScore = useAppSelector((state) =>
        selectUserScore(state, opponent?.id),
    )

    const currentQuestion = useAppSelector(selectCurrentQuestion)
    const userAnswer = useAppSelector(selectUserAnswer)
    const correctAnswer = useAppSelector(selectCorrectAnswer)
    const winnerResponseTime = useAppSelector(selectWinnerResponseTime)
    const startTime = useAppSelector(selectNextRoundStartTime)

    if (!user || !opponent) return null

    const result: RoundResult =
        user.id === winnerId
            ? 'win'
            : opponent.id === winnerId
              ? 'lose'
              : 'draw'

    return {
        user,
        opponent,
        result,
        myScore,
        opponentScore,
        currentQuestion,
        userAnswer,
        correctAnswer,
        winnerResponseTime,
        startTime,
    }
}
