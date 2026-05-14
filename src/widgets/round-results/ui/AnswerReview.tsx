import { ArrowRight } from 'lucide-react'
import type { ResultConfig } from '../config/roundResultConfig'

interface AnswerReviewProps {
    question: string
    correctAnswer: string
    userAnswer?: string | null
    config: ResultConfig
}

export const AnswerReview = ({
    question,
    correctAnswer,
    userAnswer,
    config,
}: AnswerReviewProps) => {
    return (
        <>
            <div className="mb-4 flex items-center justify-center gap-4">
                <div className="rounded-4xl bg-slate-100 px-6 py-3 text-lg font-black text-slate-600">
                    {question}
                </div>

                <ArrowRight className="size-5 text-slate-400" />

                <div
                    className={`rounded-4xl px-6 py-3 text-lg font-black shadow-sm ${config.bgColor} ${config.primaryColor}`}
                >
                    {correctAnswer}
                </div>
            </div>

            {userAnswer && (
                <div
                    className={`mb-10 rounded-full border-2 border-dashed px-6 py-2.5 text-sm font-medium text-slate-500 ${config.borderColor}`}
                >
                    Твой ответ:{' '}
                    <span className={`font-bold ${config.primaryColor}`}>
                        {userAnswer}
                    </span>
                </div>
            )}
        </>
    )
}
