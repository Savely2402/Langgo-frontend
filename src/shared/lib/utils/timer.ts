export type TimerStatus = 'safe' | 'warning' | 'critical'

export const getTimerStatus = (
    timeLeftMs: number,
    totalMs: number,
): TimerStatus => {
    const safeTotal = Math.max(totalMs, 1)
    const percentage = Math.max(
        0,
        Math.min(100, (timeLeftMs / safeTotal) * 100),
    )

    if (percentage <= 20) return 'critical'
    if (percentage <= 50) return 'warning'
    return 'safe'
}

// Выносим всю палитру таймеров в единую константу
export const TIMER_COLORS = {
    bg: {
        safe: '[&>div]:bg-emerald-500',
        warning: '[&>div]:bg-amber-400',
        critical: '[&>div]:bg-red-500',
    },
    text: {
        safe: 'text-emerald-500',
        warning: 'text-amber-400',
        critical: 'text-red-500',
    },
    border: {
        safe: 'border-emerald-500',
        warning: 'border-amber-400',
        critical: 'border-red-500',
    },
} as const // as const гарантирует строгую типизацию ключей
