import {
    Pencil,
    BarChart3,
    Award,
    Trophy,
    Flame,
    MonitorPlay,
} from 'lucide-react'
// import { Button } from '@/shared/ui/Button' // Раскомментируй, если используешь свой UI-kit

export const ProfilePage = () => {
    const mockUser = {
        name: 'Алекс',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', // Заглушка
        isOnline: true,
    }

    const mockStats = {
        elo: 2450,
        wins: 342,
        losses: 128,
        winRate: 72.8,
        winStreak: 12,
        maxStreak: 24,
        totalMatches: 470,
    }

    return (
        <div className="mx-auto w-full max-w-5xl rounded-[2rem] border-2 border-slate-100 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-6">
                    <div className="relative size-32">
                        <div className="flex size-full items-center justify-center overflow-hidden rounded-full border-[6px] border-slate-100 bg-emerald-100">
                            <img
                                src={mockUser.avatarUrl}
                                alt={mockUser.name}
                                className="size-full object-cover"
                            />
                        </div>
                        {mockUser.isOnline && (
                            <div className="absolute right-1 bottom-1 size-7 rounded-full border-4 border-white bg-emerald-500" />
                        )}
                    </div>

                    <h1 className="text-4xl font-black text-slate-900 sm:text-5xl">
                        {mockUser.name}
                    </h1>
                </div>

                <button className="flex items-center gap-2 rounded-xl bg-[#0EA5E9] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-sky-600 active:scale-95 sm:bg-[#10B981] sm:hover:bg-emerald-600">
                    <Pencil size={18} />
                    <span>Изменить</span>
                </button>
            </div>

            <div className="mb-6 flex items-center gap-3">
                <BarChart3
                    className="text-emerald-600"
                    size={28}
                    strokeWidth={3}
                />
                <h2 className="text-2xl font-black text-slate-900">
                    Статистика
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-slate-100 bg-slate-50/50 p-6 text-center transition-shadow hover:shadow-md">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <Award size={28} strokeWidth={2.5} />
                    </div>
                    <span className="mb-2 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                        Текущий рейтинг
                    </span>
                    <span className="text-2xl font-black text-emerald-600">
                        {mockStats.elo.toLocaleString()} ELO
                    </span>
                </div>

                <div className="flex flex-col rounded-3xl border-2 border-slate-100 bg-white p-6 transition-shadow hover:shadow-md">
                    <div className="mb-2 flex items-center gap-2 text-slate-500">
                        <Trophy size={16} strokeWidth={2.5} />
                        <span className="text-[11px] font-bold tracking-widest uppercase">
                            Процент побед
                        </span>
                    </div>
                    <span className="mb-4 text-4xl font-black text-slate-900">
                        {mockStats.winRate}%
                    </span>

                    <div className="mt-auto w-full">
                        <div className="mb-2 flex items-center justify-between text-sm font-bold">
                            <span className="text-emerald-500">
                                {mockStats.wins} W
                            </span>
                            <span className="text-slate-300">/</span>
                            <span className="text-red-400">
                                {mockStats.losses} L
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
                                style={{ width: `${mockStats.winRate}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-slate-100 bg-white p-6 text-center transition-shadow hover:shadow-md">
                    <div className="relative z-10 mb-3 flex size-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                        <Flame size={28} strokeWidth={2.5} />
                    </div>
                    <span className="relative z-10 mb-1 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                        Побед подряд
                    </span>
                    <span className="relative z-10 mb-3 text-4xl font-black text-slate-900">
                        {mockStats.winStreak}
                    </span>
                    <div className="relative z-10 rounded-full border-2 border-slate-100 bg-white px-4 py-1 text-xs font-bold text-slate-500">
                        Рекорд: {mockStats.maxStreak}
                    </div>

                    <Flame
                        className="absolute -right-6 -bottom-6 z-0 text-orange-50 opacity-50"
                        size={120}
                    />
                </div>

                <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-slate-100 bg-slate-50/50 p-6 text-center transition-shadow hover:shadow-md">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                        <MonitorPlay size={28} strokeWidth={2.5} />
                    </div>
                    <span className="mb-2 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                        Total Matches
                    </span>
                    <span className="mb-1 text-4xl font-black text-slate-900">
                        {mockStats.totalMatches}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                        Matches Played
                    </span>
                </div>
            </div>
        </div>
    )
}
