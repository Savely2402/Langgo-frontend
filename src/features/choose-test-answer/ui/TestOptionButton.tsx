import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'

export type TestOptionStatus =
    | 'idle'
    | 'selected'
    | 'error'
    | 'correct'
    | 'disabled'

interface TestOptionButtonProps {
    text: string
    status?: TestOptionStatus
    onClick?: () => void
    className?: string
}

export const TestOptionButton = ({
    text,
    status = 'idle',
    onClick,
    className,
}: TestOptionButtonProps) => {
    return (
        <Button
            type="button"
            variant="ghost"
            onClick={onClick}
            disabled={status !== 'idle'}
            className={cn(
                'group flex h-auto w-full items-center justify-between rounded-2xl border-2 bg-white p-5 transition-all duration-200 hover:bg-white',
                status === 'idle' &&
                    'border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md',
                status === 'selected' &&
                    'border-emerald-400 bg-emerald-50/30 hover:bg-emerald-50/30',
                status === 'error' &&
                    'animate-shake border-red-400 bg-red-50 hover:bg-red-50',
                status === 'correct' &&
                    'border-emerald-500 bg-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:bg-emerald-100',
                status === 'disabled' &&
                    'border-slate-100 opacity-50 grayscale hover:bg-white disabled:opacity-50',
                className,
            )}
        >
            <span
                className={cn(
                    'text-left text-lg font-bold tracking-wide whitespace-normal transition-colors',
                    status === 'idle' || status === 'disabled'
                        ? 'text-slate-700'
                        : '',
                    status === 'selected' || status === 'correct'
                        ? 'text-slate-900'
                        : '',
                    status === 'error' ? 'text-red-700' : '',
                )}
            >
                {text}
            </span>
            <div
                className={cn(
                    'flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    status === 'idle' || status === 'disabled'
                        ? 'border-slate-200 group-hover:border-slate-300'
                        : '',
                    status === 'selected' || status === 'correct'
                        ? 'border-emerald-500 bg-emerald-50'
                        : '',
                    status === 'error' ? 'border-red-500 bg-red-50' : '',
                )}
            >
                {(status === 'selected' || status === 'correct') && (
                    <div className="size-2.5 rounded-full bg-emerald-500" />
                )}
                {status === 'error' && (
                    <div className="size-2.5 rounded-full bg-red-500" />
                )}
            </div>
        </Button>
    )
}
