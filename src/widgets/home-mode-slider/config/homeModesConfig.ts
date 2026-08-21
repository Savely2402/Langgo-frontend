import { BookOpen, Users, type LucideIcon } from 'lucide-react'

export type HomeModeId = 'solo' | 'ranked' | 'custom'

export type HomeMode = {
    id: HomeModeId
    title: string
    description: string
    activeCtaLabel: string
    guestCtaLabel: string
    accentClassName: string
    iconClassName: string
    buttonClassName: string
    icon: LucideIcon
    requiresAuth: boolean
}

export const HOME_MODES: HomeMode[] = [
    {
        id: 'custom',
        title: 'Своя игра',
        description:
            'Играйте вместе с друзьями с любыми словарями и своими правилами.',
        activeCtaLabel: 'СОЗДАТЬ',
        guestCtaLabel: 'ТРЕБУЕТСЯ ВХОД',
        accentClassName:
            'from-slate-100 via-white to-zinc-50 text-slate-700 ring-slate-200/80',
        iconClassName: 'bg-slate-100 text-slate-600',
        buttonClassName: 'bg-primary text-white ',
        icon: Users,
        requiresAuth: true,
    },
    {
        id: 'solo',
        title: 'Одиночная игра',
        description:
            'Тренируйте словарный запас в своём темпе. Идеально для разминки перед рейтинговыми матчами.',
        activeCtaLabel: 'СОЗДАТЬ',
        guestCtaLabel: 'ТРЕБУЕТСЯ ВХОД',
        accentClassName:
            'from-sky-100 via-white to-blue-50 text-sky-700 ring-sky-200/80',
        iconClassName: 'bg-sky-100 text-sky-600',
        buttonClassName:
            'border-sky-200/90 bg-white text-sky-700 hover:bg-sky-50',
        icon: BookOpen,
        requiresAuth: true,
    },
]

export const RANKED_MODE_INDEX = HOME_MODES.findIndex(
    (mode) => mode.id === 'ranked',
)
