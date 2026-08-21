import { useCountdown } from '@/shared/lib/hooks'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/shared/ui/Card'
import { RESULT_CONFIG } from '../config/roundResultConfig'
import { useRoundResults } from '../lib/useRoundResults'
import { AnswerReview } from './AnswerReview'
import { FastestTime } from './FastestTime'
import { RoundStartTimer } from './RoundStartTimer'
import { ScoreBoard } from './ScoreBoard'

const TOTAL_MS = 5000

export const RoundResultsWidget = () => {
    const data = useRoundResults()
    const { secondsLeft, rawMs } = useCountdown(data?.startTime ?? null)

    if (!data) return null

    const config = RESULT_CONFIG[data.result]

    return (
        <Card className="h-full w-full max-w-[420px]">
            <CardHeader className="pt-8 pb-2 text-center">
                <CardTitle
                    className={`text-4xl font-black tracking-wide whitespace-pre-line uppercase ${config.primaryColor}`}
                >
                    {config.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center pb-10">
                <ScoreBoard
                    user={data.user}
                    opponent={data.opponent}
                    myScore={data.myScore ?? 0}
                    opponentScore={data.opponentScore ?? 0}
                    result={data.result}
                    config={config}
                />

                <AnswerReview
                    question={data.currentQuestion ?? ''}
                    correctAnswer={data.correctAnswer ?? ''}
                    userAnswer={data.userAnswer}
                    config={config}
                />

                {data.winnerResponseTime && data.result !== 'draw' && (
                    <FastestTime
                        time={data.winnerResponseTime}
                        result={data.result}
                        config={config}
                    />
                )}
            </CardContent>

            <CardFooter>
                <RoundStartTimer
                    secondsLeft={secondsLeft}
                    rawMs={rawMs}
                    totalMs={TOTAL_MS}
                />
            </CardFooter>
        </Card>
    )
}
