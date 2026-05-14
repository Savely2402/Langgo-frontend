import { Zap } from 'lucide-react'
import type { RoundResult, ResultConfig } from '../config/roundResultConfig'

interface FastestTimeProps {
    time: number | string
    result: RoundResult
    config: ResultConfig
}

export const FastestTime = ({ time, result, config }: FastestTimeProps) => {
    return (
        <div className="flex w-full justify-center">
            <div
                className={`flex w-[220px] flex-col items-start rounded-[32px] p-6 ${config.bgColor}`}
            >
                <span
                    className={`mb-2 text-[11px] font-black tracking-widest uppercase ${config.primaryColor}`}
                >
                    {result === 'win' ? 'Твое время' : 'Соперник'}
                </span>

                <span className="mb-4 text-5xl font-black text-slate-800">
                    {time}
                    <span className="text-3xl">с</span>
                </span>

                <div
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black tracking-wider text-white uppercase shadow-sm ${config.barColor}`}
                >
                    <Zap className="size-3.5 fill-current" />
                    Быстрый ответ
                </div>
            </div>
        </div>
    )
}
