import { useState, useEffect, useCallback } from 'react'
import confetti from 'canvas-confetti'
import {
    selectRoundStatus,
    selectLastRoundWinnerId,
    selectUserAnswerResult,
} from '@/entities/game/model/selectors'
import { setUserAnswer } from '@/entities/game/model/slice'
import { useAppSelector, useAppDispatch } from '@/shared/lib/store'

export type FormStatus = 'idle' | 'checking' | 'error' | 'success' | 'loser'

export const useAnswerSubmission = (userId: string | number | undefined) => {
    const dispatch = useAppDispatch()
    const roundStatus = useAppSelector(selectRoundStatus)
    const winnerId = useAppSelector(selectLastRoundWinnerId)
    const isCorrect = useAppSelector((state) =>
        selectUserAnswerResult(state, userId),
    )

    const [currentAnswer, setCurrentAnswer] = useState<string | null>(null)
    const [localStatus, setLocalStatus] = useState<
        'idle' | 'checking' | 'error'
    >('idle')

    let formStatus: FormStatus = localStatus
    if (roundStatus === 'revealing') {
        formStatus = winnerId === userId ? 'success' : 'loser'
    }
    useEffect(() => {
        if (roundStatus === 'revealing' && winnerId === userId) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.8 },
                colors: ['#10B981', '#34D399', '#059669'],
            })
        }
    }, [roundStatus, winnerId, userId])

    useEffect(() => {
        if (localStatus === 'checking' && isCorrect === false) {
            const timer = setTimeout(() => {
                setLocalStatus('error')
            }, 300)

            return () => clearTimeout(timer)
        }
    }, [isCorrect, localStatus])

    useEffect(() => {
        if (localStatus === 'error') {
            const timer = setTimeout(() => {
                setLocalStatus('idle')
                setCurrentAnswer(null)
            }, 500)

            return () => clearTimeout(timer)
        }
    }, [localStatus])

    const submitAnswer = useCallback(
        (answer: string) => {
            if (
                formStatus === 'checking' ||
                formStatus === 'error' ||
                roundStatus === 'revealing' ||
                !answer.trim()
            )
                return

            setCurrentAnswer(answer)
            setLocalStatus('checking')
            dispatch(setUserAnswer(answer))
        },
        [formStatus, roundStatus, dispatch],
    )

    return {
        formStatus,
        currentAnswer,
        submitAnswer,
    }
}
