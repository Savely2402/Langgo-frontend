import { Check, Lock } from 'lucide-react'
import { cn } from '@/shared/lib/classNames'

type BaseModeCardProps = {
    isActive: boolean
    onClick: () => void
    isLocked?: boolean
    icon: React.ReactNode
    title: string
    subtitle: string
    activeColorClass: string
    rightSlot?: React.ReactNode // Для ELO
}

export const BaseModeCard = ({
    isActive,
    onClick,
    isLocked = false,
    icon,
    title,
    subtitle,
    activeColorClass,
    rightSlot,
}: BaseModeCardProps) => {
    const showAsActive = isActive && !isLocked

    return (
        <button
            onClick={onClick}
            className={cn(
                'w-full shrink-0 rounded-[28px] border-2 p-4 text-left transition-all duration-200',
                showAsActive
                    ? 'border-b-[6px] border-slate-200 bg-white opacity-100 shadow-sm'
                    : 'border-transparent bg-slate-100/50 opacity-60 hover:bg-slate-100 hover:opacity-100',
                // Если режим под замком, можно сделать его чуть более прозрачным
                isLocked && 'opacity-50 grayscale-[30%]',
            )}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            'flex size-12 items-center justify-center rounded-2xl transition-colors',
                            showAsActive
                                ? activeColorClass
                                : 'bg-slate-200 text-slate-400',
                        )}
                    >
                        {icon}
                    </div>

                    <div>
                        <h3
                            className={cn(
                                'font-black transition-colors',
                                showAsActive
                                    ? 'text-slate-800'
                                    : 'text-slate-500',
                            )}
                        >
                            {title}
                        </h3>
                        <p className="text-xs font-bold text-slate-500">
                            {subtitle}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Если заблокировано — показываем ТОЛЬКО замок */}
                    {isLocked ? (
                        <div className="flex size-10 items-center justify-center rounded-full bg-slate-200/50 text-slate-400">
                            <Lock className="size-5" />
                        </div>
                    ) : (
                        /* Иначе обычная логика: ELO + Галочка */
                        <>
                            {rightSlot && (
                                <div
                                    className={cn(
                                        'transition-opacity',
                                        isActive
                                            ? 'opacity-100'
                                            : 'hidden opacity-0 min-[400px]:block',
                                    )}
                                >
                                    {rightSlot}
                                </div>
                            )}
                            <div
                                className={cn(
                                    'flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out',
                                    isActive
                                        ? 'scale-100 bg-primary text-primary-foreground opacity-100'
                                        : 'scale-50 bg-transparent text-transparent opacity-0',
                                )}
                            >
                                <Check className="size-5" strokeWidth={3} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </button>
    )
}
