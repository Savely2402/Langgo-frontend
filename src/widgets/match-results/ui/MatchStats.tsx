interface MatchStatsProps {
    stats: {
        rounds: number
        averageTime: string
        accuracy: string
    }
}

export const MatchStats = ({ stats }: MatchStatsProps) => {
    return (
        <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-6">
            <div className="mb-5 text-center text-[10px] font-black tracking-[0.15em] text-slate-400 uppercase">
                Статистика матча
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="btn-3d flex flex-col items-center justify-center rounded-2xl bg-primary py-4 text-white shadow-lg shadow-[#10B981]/30">
                    <span className="text-2xl leading-none font-black">
                        {stats.rounds}
                    </span>
                    <span className="mt-1.5 text-[9px] font-bold tracking-wider uppercase opacity-90">
                        Раундов
                    </span>
                </div>

                <div className="btn-3d flex flex-col items-center justify-center rounded-2xl bg-[#F59E0B] py-4 text-white shadow-lg shadow-[#F59E0B]/30">
                    <span className="text-2xl leading-none font-black">
                        {stats.averageTime}
                    </span>
                    <span className="mt-1.5 text-[9px] font-bold tracking-wider uppercase opacity-90">
                        Ср. время
                    </span>
                </div>

                <div className="btn-3d flex flex-col items-center justify-center rounded-2xl bg-[#06B6D4] py-4 text-white shadow-lg shadow-[#06B6D4]/30">
                    <span className="text-2xl leading-none font-black">
                        {stats.accuracy}
                    </span>
                    <span className="mt-1.5 text-[9px] font-bold tracking-wider uppercase opacity-90">
                        Точность
                    </span>
                </div>
            </div>
        </div>
    )
}
