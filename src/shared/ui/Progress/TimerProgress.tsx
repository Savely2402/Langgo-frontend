import { cn } from '../../lib/classNames'
import { getTimerStatus, TIMER_COLORS } from '../../lib/utils' // Импортируем
import { Progress } from './Progress'

interface TimerProgressProps {
    timeLeftMs: number
    totalMs: number
    className?: string
}

export const TimerProgress = ({
    timeLeftMs,
    totalMs,
    className,
}: TimerProgressProps) => {
    const safeTotal = Math.max(totalMs, 1)
    const percentage = Math.max(
        0,
        Math.min(100, (timeLeftMs / safeTotal) * 100),
    )

    // Получаем статус
    const status = getTimerStatus(timeLeftMs, totalMs)

    return (
        <Progress
            value={percentage}
            className={cn(
                'h-1.5 w-full bg-slate-200',
                '[&>div]:transition-colors [&>div]:duration-1000 [&>div]:ease-in-out',
                TIMER_COLORS.bg[status],
                className,
            )}
        />
    )
}
