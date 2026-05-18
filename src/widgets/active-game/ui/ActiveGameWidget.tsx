import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react'
import {
    selectCurrentQuestion,
    selectCurrentRound,
    selectRoundEndTime,
    selectRoundStatus,
    selectRoundType,
    setRoundStatus,
} from '@/entities/game'
import { ChooseTestAnswerForm } from '@/features/choose-test-answer'
import { SendManualAnswerForm } from '@/features/send-manual-answer/'
import { cn } from '@/shared/lib/classNames'
import { useCountdown } from '@/shared/lib/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import { TimerProgress } from '@/shared/ui/Progress'

export const ActiveGameWidget = () => {
    const dispatch = useAppDispatch()

    const currentQuestion = useAppSelector(selectCurrentQuestion)

    const roundType = useAppSelector(selectRoundType)

    const currentRound = useAppSelector(selectCurrentRound)
    const roundStatus = useAppSelector(selectRoundStatus)

    const roundEndTime = useAppSelector(selectRoundEndTime)

    const { secondsLeft, rawMs } = useCountdown(roundEndTime)
    const [totalMs] = useState(() => rawMs)

    const [isFadingOut, setIsFadingOut] = useState(false)

    useEffect(() => {
        if (roundStatus === 'revealing') {
            const timer1 = setTimeout(() => setIsFadingOut(true), 1500)
            const timer2 = setTimeout(() => {
                console.log('Inter fucking mission')

                dispatch(setRoundStatus('intermission'))

                setIsFadingOut(false)
            }, 1500)

            return () => {
                clearTimeout(timer1)
                clearTimeout(timer2)
            }
        }
    }, [roundStatus, dispatch, currentRound])

    return (
        <div
            className={cn(
                'mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-8 transition-opacity duration-500',
                isFadingOut ? 'opacity-0' : 'opacity-100',
            )}
        >
            <div className="mb-16 flex w-full flex-col items-center text-center">
                <div className="mb-6 w-full max-w-lg">
                    <div className="mb-2 flex items-end justify-between">
                        <div className="flex flex-col text-[10px] leading-tight font-black tracking-wider text-[#52B79A] uppercase">
                            <span>Осталось</span>
                            <span>Времени</span>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-[#38BDF8] px-2.5 py-0.5 text-sm font-bold text-white shadow-sm">
                            <Timer className="size-4" />
                            <span>{secondsLeft ?? 0} с</span>
                        </div>
                    </div>

                    <TimerProgress
                        timeLeftMs={rawMs ?? 0}
                        totalMs={totalMs ?? 1}
                        className="rounded-full"
                    />
                </div>

                <div className="flex w-full items-center justify-center rounded-2xl bg-white px-10 py-6 shadow-md">
                    <h2 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
                        {currentQuestion || '...'}
                    </h2>
                </div>
            </div>

            <div className="flex w-full justify-center">
                {roundType === 'manual' && currentQuestion && (
                    <SendManualAnswerForm key={currentQuestion} />
                )}

                {roundType === 'test' && currentQuestion && (
                    <ChooseTestAnswerForm key={currentQuestion} />
                )}
            </div>
        </div>
    )
}
