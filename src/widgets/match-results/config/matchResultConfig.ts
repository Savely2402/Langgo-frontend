export type MatchResult = 'win' | 'lose' | 'draw'

export const RESULT_CONFIG = {
    win: {
        title: 'Победа в матче 🏆',
        titleColor: 'text-[#10B981]',
        ringColor: 'ring-[#10B981]',
        ratingPrefix: '+',
        ratingBg: 'bg-[#10B981]/5',
        ratingBorder: 'border-[#10B981]/20',
        ratingText: 'text-[#10B981]',
        buttonBg: 'bg-[#10B981]',
        buttonHover: 'hover:bg-[#059669]',
        buttonShadow: 'hover:shadow-[#10B981]/30',
    },
    lose: {
        title: 'Поражение 😔',
        titleColor: 'text-rose-500',
        ringColor: 'ring-rose-500',
        ratingPrefix: '-',
        ratingBg: 'bg-rose-500/5',
        ratingBorder: 'border-rose-500/20',
        ratingText: 'text-rose-500',
        buttonBg: 'bg-rose-500',
        buttonHover: 'hover:bg-rose-600',
        buttonShadow: 'hover:shadow-rose-500/30',
    },
    draw: {
        title: 'Ничья 🤝',
        titleColor: 'text-slate-500',
        ringColor: 'ring-slate-400',
        ratingPrefix: '',
        ratingBg: 'bg-slate-500/5',
        ratingBorder: 'border-slate-500/20',
        ratingText: 'text-slate-500',
        buttonBg: 'bg-slate-500',
        buttonHover: 'hover:bg-slate-600',
        buttonShadow: 'hover:shadow-slate-500/30',
    },
} as const

export type ResultConfig = (typeof RESULT_CONFIG)[MatchResult]
