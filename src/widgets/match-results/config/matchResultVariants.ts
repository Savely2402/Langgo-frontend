import { cva } from 'class-variance-authority'

export const matchResultTitleVariants = cva(
    'text-2xl font-black tracking-wide uppercase',
    {
        variants: {
            result: {
                win: 'text-primary',
                lose: 'text-rose-500',
                draw: 'text-slate-500',
                completed: 'text-primary',
            },
        },
    },
)

export const matchResultAvatarRingVariants = cva('ring-4 ring-offset-2', {
    variants: {
        result: {
            win: 'ring-primary',
            lose: 'ring-rose-500',
            draw: 'ring-slate-400',
            completed: 'ring-primary',
        },
    },
})

export const matchResultRatingBadgeVariants = cva(
    'mt-4 flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 text-[11px] font-black',
    {
        variants: {
            result: {
                win: 'border-ring/20 bg-[#10B981]/5 text-primary',
                lose: 'border-rose-500/20 bg-rose-500/5 text-rose-500',
                draw: 'border-slate-500/20 bg-slate-500/5 text-slate-500',
                completed: 'border-ring/20 bg-[#10B981]/5 text-primary',
            },
        },
    },
)

export const matchResultButtonVariants = cva('btn-3d mt-8 h-[50px] w-full', {
    variants: {
        result: {
            win: 'bg-primary hover:shadow-[#10B981]/30',
            lose: 'bg-rose-500 hover:bg-rose-600 hover:shadow-rose-500/30',
            draw: 'bg-slate-500 hover:bg-slate-600 hover:shadow-slate-500/30',
            completed: 'bg-primary hover:shadow-[#10B981]/30',
        },
    },
})
