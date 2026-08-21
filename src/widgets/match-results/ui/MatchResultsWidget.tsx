import { RotateCcw } from 'lucide-react'
import { Link } from 'react-router'
import { routes } from '@/shared/config'
import { Button } from '@/shared/ui/Button'
import { MATCH_RESULT_META } from '../config/matchResultConfig'
import {
    matchResultButtonVariants,
    matchResultTitleVariants,
} from '../config/matchResultVariants'
import { useMatchResults } from '../lib/useMatchResults'
import { MatchScoreBoard } from './MatchScoreBoard'
import { MatchStats } from './MatchStats'

export const MatchResultsWidget = () => {
    const data = useMatchResults()
    if (!data) return null

    const meta = MATCH_RESULT_META[data.result]
    const { dictionaryName, langFrom, langTo } = data.gameSettings || {}

    return (
        <div className="mx-auto w-full max-w-[440px] rounded-[32px] bg-white p-8 shadow-xl shadow-slate-200/50">
            <div className="mb-8 text-center">
                <h2
                    className={matchResultTitleVariants({
                        result: data.result,
                    })}
                >
                    {meta.title}
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
                ratingPrefix={meta.ratingPrefix}
            />

            <MatchStats stats={data.stats} />

            <Button
                asChild
                className={matchResultButtonVariants({ result: data.result })}
            >
                <Link to={routes.home}>
                    <RotateCcw className="size-5 stroke-[2.5]" />В лобби
                </Link>
            </Button>
        </div>
    )
}
