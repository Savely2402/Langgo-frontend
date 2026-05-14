import { cn } from '@/shared/lib/classNames'
import { getTimerStatus, TIMER_COLORS } from '@/shared/lib/utils/timer'
import { TimerProgress } from '@/shared/ui/Progress'

interface MatchStartTimerProps {
    secondsLeft: number
    rawMs: number
    totalMs: number
}

export const MatchStartTimer = ({
    secondsLeft,
    rawMs,
    totalMs,
}: MatchStartTimerProps) => {
    const timerStatus = getTimerStatus(rawMs, totalMs)

    return (
        <div className="flex flex-col items-center">
            <span className="mb-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                Начало через
            </span>

            <div className="mb-4 flex h-24 items-center justify-center overflow-hidden">
                <span
                    key={secondsLeft}
                    className={cn(
                        'animate-in text-7xl leading-none font-black duration-300 fade-in slide-in-from-top-8 sm:text-8xl',
                        TIMER_COLORS.text[timerStatus],
                    )}
                >
                    {secondsLeft > 0 ? secondsLeft : 'GO'}
                </span>
            </div>

            <TimerProgress
                timeLeftMs={rawMs}
                totalMs={totalMs}
                className="w-48"
            />
        </div>
    )
}
