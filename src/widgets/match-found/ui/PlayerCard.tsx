import type { Player } from '@/entities/game'
import { UserAvatar } from '@/entities/user'
import { cn } from '@/shared/lib/classNames'

interface PlayerCardProps {
    player: Player
    isMe: boolean
}

export const PlayerCard = ({ player, isMe }: PlayerCardProps) => {
    if (!player) return null

    return (
        <div className="flex flex-col items-center gap-3">
            <div
                className={cn(
                    'rounded-full p-1',
                    isMe ? 'border-2 border-ring' : 'border-2 border-slate-200',
                )}
            >
                <UserAvatar
                    avatarUrl={player.avatarUrl}
                    username={player.username}
                    className="size-24 sm:size-32"
                />
            </div>
            <div className="text-center">
                <div className="text-xl font-bold text-slate-900">
                    {player.username}
                </div>
                <div
                    className={cn(
                        'text-sm font-medium',
                        isMe ? 'text-primary' : 'text-slate-500',
                    )}
                >
                    Рейтинг: {player.rating || 0}
                </div>
            </div>
        </div>
    )
}
