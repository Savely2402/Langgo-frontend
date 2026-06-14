import { Zap } from 'lucide-react'
import type { Player } from '@/entities/game'
import type { User } from '@/entities/user'
import { UserAvatar } from '@/entities/user/ui/UserAvatar'
import { cn } from '@/shared/lib/classNames'
import {
    matchResultAvatarRingVariants,
    matchResultRatingBadgeVariants,
} from '../config/matchResultVariants'
import type { MatchResultType } from '../config/matchResultConfig'

interface MatchScoreBoardProps {
    user: User
    opponent?: Player
    myScore: number
    opponentScore: number
    result: MatchResultType
    ratingChange: number
    ratingPrefix: '+' | '-' | ''
}

export const MatchScoreBoard = ({
    user,
    opponent,
    myScore,
    opponentScore,
    result,
    ratingChange,
    ratingPrefix,
}: MatchScoreBoardProps) => {
    const displayedRatingChange = result === 'draw' ? 0 : Math.abs(ratingChange)
    const isUserHighlighted = result === 'win' || result === 'completed'
    const isOpponentHighlighted = result === 'lose'

    return (
        <div className="mb-8 flex items-start justify-between px-2">
            <div
                className={cn(
                    'flex flex-col items-center transition-all',
                    result === 'lose' && 'opacity-60 grayscale-[40]',
                )}
            >
                <UserAvatar
                    username={user.username}
                    avatarUrl={user.avatarUrl}
                    className={cn(
                        'size-[72px] rounded-full',
                        isUserHighlighted
                            ? matchResultAvatarRingVariants({ result })
                            : 'border-4 border-slate-100 bg-slate-50',
                    )}
                />
                <span className="mt-3 text-sm font-bold text-slate-800">
                    {user.username}
                </span>
            </div>

            <div className="flex flex-col items-center pt-2">
                <div className="text-[56px] font-black tracking-tighter text-slate-800">
                    {myScore} <span className="text-slate-700">:</span>{' '}
                    {opponentScore}
                </div>
                <span className="mt-1.5 text-[9px] font-black tracking-[0.2em] text-slate-400 uppercase">
                    Финальный счет
                </span>

                <div className={matchResultRatingBadgeVariants({ result })}>
                    <Zap className="size-3.5 fill-current" />
                    {ratingPrefix}
                    {displayedRatingChange} ОЧКОВ РЕЙТИНГА
                </div>
            </div>

            <div
                className={cn(
                    'flex flex-col items-center transition-all',
                    result === 'win' && 'opacity-60 grayscale-40',
                    !opponent && 'invisible',
                )}
            >
                <UserAvatar
                    username={opponent?.username ?? ''}
                    avatarUrl={
                        // 'https://img.magnific.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740&q=80'
                        opponent?.avatarUrl
                    }
                    className={cn(
                        'size-[72px] rounded-full',
                        isOpponentHighlighted
                            ? matchResultAvatarRingVariants({ result })
                            : 'border-4 border-slate-100 bg-slate-50',
                    )}
                />
                <span className="mt-3 text-sm font-semibold text-slate-500">
                    {opponent?.username}
                </span>
            </div>
        </div>
    )
}
