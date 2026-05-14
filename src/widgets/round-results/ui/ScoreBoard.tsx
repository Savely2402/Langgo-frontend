import { Check } from 'lucide-react'
import type { Player } from '@/entities/player'
import { UserAvatar } from '@/entities/user'
import type { User } from '@/entities/user'
import type { RoundResult, ResultConfig } from '../config/roundResultConfig'

interface ScoreBoardProps {
    user: User
    opponent: Player
    myScore: number
    opponentScore: number
    result: RoundResult
    config: ResultConfig
}

export const ScoreBoard = ({
    user,
    opponent,
    myScore,
    opponentScore,
    result,
    config,
}: ScoreBoardProps) => {
    return (
        <div className="mt-6 mb-10 flex w-full items-center justify-between px-6">
            <div
                className={`flex flex-col items-center transition-all ${result === 'lose' ? 'opacity-60 grayscale-[30]' : ''}`}
            >
                <div className="relative">
                    <UserAvatar
                        username={user.username}
                        className={`size-[84px] rounded-full ${result === 'win' ? 'ring-4 ring-[#22C55E] ring-offset-4' : 'border-4 border-slate-50 bg-slate-100'}`}
                    />
                    {result === 'win' && (
                        <div
                            className={`absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full border-[3px] border-white text-white ${config.barColor}`}
                        >
                            <Check className="size-4 stroke-3" />
                        </div>
                    )}
                </div>
                <span className="mt-4 text-base font-bold text-slate-500">
                    {user.username}
                </span>
            </div>

            <div className="text-[56px] font-black tracking-tighter text-slate-800">
                {myScore} <span className="text-slate-700">:</span>{' '}
                {opponentScore}
            </div>

            <div
                className={`flex flex-col items-center transition-all ${result === 'win' ? 'opacity-60 grayscale-[30]' : ''}`}
            >
                <div className="relative">
                    <UserAvatar
                        username={opponent.username}
                        className={`size-[84px] rounded-full ${result === 'lose' ? 'ring-4 ring-red-500 ring-offset-4' : 'border-4 border-slate-50 bg-slate-100'}`}
                    />
                    {result === 'lose' && (
                        <div
                            className={`absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full border-[3px] border-white text-white ${config.barColor}`}
                        >
                            <Check className="size-4 stroke-3" />
                        </div>
                    )}
                </div>
                <span className="mt-4 text-base font-black text-slate-800">
                    {opponent.username}
                </span>
            </div>
        </div>
    )
}
