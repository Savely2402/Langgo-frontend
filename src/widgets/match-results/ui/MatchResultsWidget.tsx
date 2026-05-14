import { RotateCcw } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { RESULT_CONFIG } from '../config/matchResultConfig'
import { useMatchResults } from '../lib/useMatchResults'
import { MatchScoreBoard } from './MatchScoreBoard'
import { MatchStats } from './MatchStats'

export const MatchResultsWidget = () => {
    const data = useMatchResults()

    if (!data) return null

    const config = RESULT_CONFIG[data.result]
    const { dictionaryName, langFrom, langTo } = data.gameSettings || {}

    return (
        <div className="mx-auto w-full max-w-[440px] rounded-[32px] bg-white p-8 shadow-xl shadow-slate-200/50">
            <div className="mb-8 text-center">
                <h2
                    className={`text-2xl font-black tracking-wide uppercase ${config.titleColor}`}
                >
                    {config.title}
                </h2>
                {dictionaryName && (
                    <p className="mt-1.5 text-xs font-semibold text-slate-500">
                        Словарь «{dictionaryName}» {`${langFrom}-${langTo}`}
                    </p>
                )}
            </div>

            <MatchScoreBoard
                user={data.user}
                opponent={data.opponent}
                myScore={data.myScore}
                opponentScore={data.opponentScore}
                result={data.result}
                ratingChange={data.ratingChange}
                config={config}
            />

            <MatchStats stats={data.stats} />

            <Button
                className={`btn-3d mt-8 h-[50px] w-full ${config.buttonBg} ${config.buttonHover} ${config.buttonShadow}`}
            >
                <RotateCcw className="size-5 stroke-[2.5]" />В лобби
            </Button>
        </div>
    )
}
