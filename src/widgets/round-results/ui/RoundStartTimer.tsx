import { cn } from '@/shared/lib/classNames'
import { getTimerStatus, TIMER_COLORS } from '@/shared/lib/utils/timer'
import { TimerProgress } from '@/shared/ui/Progress'

interface MatchStartTimerProps {
    secondsLeft: number | null
    rawMs: number | null
    totalMs: number
}

export const RoundStartTimer = ({
    secondsLeft,
    rawMs,
    totalMs,
}: MatchStartTimerProps) => {
    if (!secondsLeft || !rawMs) return null

    const timerStatus = getTimerStatus(rawMs, totalMs)

    return (
        <div className="flex w-full flex-col items-center">
            <div className="mb-4 flex items-center gap-[11px]">
                <span className="text-[14px] font-bold tracking-widest text-slate-400 uppercase">
                    СЛЕДУЮЩИЙ РАУНД
                </span>

                <div className="flex items-center justify-center overflow-hidden">
                    <span
                        key={secondsLeft}
                        className={cn(
                            'animate-in text-[18px] leading-none font-black duration-300 fade-in slide-in-from-top-8 sm:text-[18px]',
                            TIMER_COLORS.text[timerStatus],
                        )}
                    >
                        {secondsLeft > 0 ? secondsLeft : 'GO'}
                    </span>
                </div>
            </div>

            <TimerProgress
                timeLeftMs={rawMs}
                totalMs={totalMs}
                className="w-full"
            />
        </div>
    )
}
