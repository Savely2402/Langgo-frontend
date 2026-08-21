import { ArrowRight, Lock, Swords, Trophy } from 'lucide-react'
import { Link } from 'react-router'
import { FindMatchButton } from '@/features/find-match'
import { routes } from '@/shared/config'
import { cn } from '@/shared/lib/classNames'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/shared/ui/Card'
import type { HomeMode } from '../config/homeModesConfig'

interface HomeModeCardProps {
    mode: HomeMode
    isActive: boolean
    isAuthenticated: boolean
    onActivate: () => void
    onOpenAuthDialog: () => void
}

export const HomeModeCard = ({
    mode,
    isActive,
    isAuthenticated,
    onActivate,
    onOpenAuthDialog,
}: HomeModeCardProps) => {
    const Icon = mode.icon
    const isLocked = mode.requiresAuth && !isAuthenticated
    const isGuestCustomMode = mode.id === 'custom' && !isAuthenticated
    const isInteractiveCard = !isActive || isLocked

    const handleCardClick = () => {
        if (!isActive) {
            onActivate()
            return
        }

        if (isLocked) {
            onOpenAuthDialog()
        }
    }

    const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleCardClick()
        }
    }

    const handleSideButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.stopPropagation()
        onActivate()
    }

    const renderAction = () => {
        if (!isActive) {
            return (
                <Button
                    type="button"
                    variant={mode.id === 'ranked' ? 'default' : 'outline'}
                    className={cn(
                        'btn-3d h-12 w-full rounded-4xl text-sm font-bold tracking-[0.12em]',
                        mode.id === 'ranked'
                            ? 'bg-primary/90 text-white hover:bg-primary'
                            : mode.buttonClassName,
                    )}
                    onClick={handleSideButtonClick}
                >
                    {isLocked && <Lock className="size-4" />}
                    <span className="font-luckiest">
                        {isLocked
                            ? mode.guestCtaLabel
                            : isGuestCustomMode
                              ? mode.guestCtaLabel
                              : mode.activeCtaLabel}
                    </span>
                </Button>
            )
        }

        if (isLocked) {
            return (
                <Button
                    type="button"
                    className="btn-3d h-[60px] w-full rounded-[24px] bg-slate-900 text-base tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] hover:bg-slate-800"
                    onClick={(event) => {
                        event.stopPropagation()
                        onOpenAuthDialog()
                    }}
                >
                    <Lock className="size-5" />
                    <span>{mode.guestCtaLabel}</span>
                </Button>
            )
        }

        if (mode.id === 'ranked') {
            return (
                <FindMatchButton className="h-[60px] w-full rounded-[24px] text-base tracking-[0.14em]">
                    <Swords className="size-5" />
                    <span className="font-luckiest">{mode.activeCtaLabel}</span>
                </FindMatchButton>
            )
        }

        return (
            <Button
                asChild
                className={cn(
                    'btn-3d h-[60px] w-full rounded-[24px] text-base tracking-[0.14em] shadow-[0_18px_40px_rgba(15,23,42,0.12)]',
                    mode.buttonClassName,
                )}
            >
                <Link to={isGuestCustomMode ? routes.login : routes.gameSetup}>
                    <span className="font-luckiest">
                        {isGuestCustomMode
                            ? mode.guestCtaLabel
                            : mode.activeCtaLabel}
                    </span>
                    <ArrowRight className="size-5" />
                </Link>
            </Button>
        )
    }

    return (
        <div
            className={cn(
                'flex h-full items-center transition-all duration-500 ease-out',
                isActive ? 'scale-100 opacity-100' : 'scale-[0.84] opacity-72',
                isInteractiveCard && 'cursor-pointer',
            )}
            role={isInteractiveCard ? 'button' : undefined}
            tabIndex={isInteractiveCard ? 0 : undefined}
            onClick={isInteractiveCard ? handleCardClick : undefined}
            onKeyDown={isInteractiveCard ? handleCardKeyDown : undefined}
        >
            <Card
                className={cn(
                    'relative w-full overflow-hidden border-white/70 bg-white/85 py-0 shadow-[0_26px_60px_rgba(148,163,184,0.18)] backdrop-blur-xl transition-all duration-500',
                    isActive
                        ? 'min-h-[440px] gap-0 rounded-[42px] ring-1 md:min-h-[500px]'
                        : 'min-h-80 gap-0 rounded-[34px] ring-1 md:min-h-[360px]',
                    mode.accentClassName,
                )}
            >
                <div className="bg-linear-to-b-to-br pointer-events-none absolute inset-0 opacity-90" />
                <div className="pointer-events-none absolute -top-14 right-[-16%] h-40 w-40 rounded-full bg-white/65 blur-3xl" />
                <div className="pointer-events-none absolute bottom-[-28%] left-[-18%] h-44 w-44 rounded-full bg-white/60 blur-3xl" />
                {mode.id === 'ranked' && (
                    <div className="pointer-events-none absolute right-[-22px] -bottom-8 h-36 w-36 rounded-[36px] border-14 border-slate-100/80 opacity-85" />
                )}

                <CardHeader
                    className={cn(
                        'relative px-6 pt-6',
                        isActive ? 'pb-5 md:px-8 md:pt-8' : 'pb-4',
                    )}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div
                            className={cn(
                                'inline-flex items-center justify-center rounded-[22px]',
                                mode.iconClassName,
                                isActive ? 'size-16 md:size-18' : 'size-14',
                            )}
                        >
                            <Icon
                                className={cn(
                                    isActive ? 'size-8 md:size-9' : 'size-7',
                                )}
                            />
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            {mode.id === 'ranked' && (
                                <>
                                    <Badge className="rounded-full bg-[#FF7A45] px-3 py-1 text-[11px] font-black tracking-[0.16em] text-white uppercase">
                                        Competitive
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        className="rounded-full bg-white/80 px-3 py-1 text-sm font-black text-slate-700 shadow-sm"
                                    >
                                        <Trophy className="size-3.5 text-amber-500" />
                                        1,450 ELO
                                    </Badge>
                                </>
                            )}
                            {isLocked && mode.id !== 'ranked' && (
                                <Badge
                                    variant="secondary"
                                    className="rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-black tracking-[0.12em] text-white uppercase"
                                >
                                    <Lock className="size-3.5" />
                                    Нужен вход
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <CardTitle
                            className={cn(
                                'max-w-[12ch] font-black text-slate-800',
                                isActive
                                    ? 'text-[34px] leading-[1.05] md:text-[42px]'
                                    : 'text-[28px] leading-[1.1]',
                            )}
                        >
                            {mode.title}
                        </CardTitle>
                        <CardDescription
                            className={cn(
                                'max-w-[26ch] text-balance text-slate-500',
                                isActive
                                    ? 'text-base leading-7 md:text-[18px]'
                                    : 'text-sm leading-6',
                            )}
                        >
                            {mode.description}
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="relative flex-1 px-6 md:px-8">
                    {isLocked && isActive && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 ring-1 ring-amber-200/80">
                            <Lock className="size-4" />
                            Войдите, чтобы открыть режим
                        </div>
                    )}
                </CardContent>

                <CardFooter
                    className={cn(
                        'relative px-6 pb-6 md:px-8 md:pb-8',
                        isActive ? 'pt-2' : 'pt-0',
                    )}
                >
                    {renderAction()}
                </CardFooter>
            </Card>
        </div>
    )
}
