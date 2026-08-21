export type RoundResult = 'win' | 'lose' | 'draw'

export const RESULT_CONFIG = {
    win: {
        title: 'Победа в\nраунде',
        primaryColor: 'text-[#22C55E]',
        bgColor: 'bg-[#F0FDF4]',
        borderColor: 'border-[#DCFCE7]',
        barColor: 'bg-[#22C55E]',
    },
    lose: {
        title: 'Поражение в\nраунде',
        primaryColor: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-100',
        barColor: 'bg-red-500',
    },
    draw: {
        title: 'Ничья',
        primaryColor: 'text-slate-500',
        bgColor: 'bg-slate-50',
        borderColor: 'border-slate-200',
        barColor: 'bg-slate-400',
    },
} as const

export type ResultConfig = (typeof RESULT_CONFIG)[RoundResult]
