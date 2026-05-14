import { BookOpen, Trophy, Users, type LucideIcon } from 'lucide-react'

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
    {
        id: 'ranked',
        title: 'Игра на рейтинг',
        description:
            'Соревнуйтесь с полиглотами со всего мира и докажите, что вы лучший!',
        activeCtaLabel: 'НАЙТИ МАТЧ',
        guestCtaLabel: 'ТРЕБУЕТСЯ ВХОД',
        accentClassName:
            'from-emerald-100 via-white to-teal-50 text-emerald-700 ring-emerald-200/80',
        iconClassName: 'bg-emerald-100 text-emerald-600',
        buttonClassName:
            'bg-primary text-primary-foreground hover:brightness-95',
        icon: Trophy,
        requiresAuth: true,
    },
    {
        id: 'custom',
        title: 'Своя игра',
        description:
            'Играйте вместе с друзьями с любыми словарями и своими правилами.',
        activeCtaLabel: 'СОЗДАТЬ',
        guestCtaLabel: 'СОЗДАТЬ / ВОЙТИ',
        accentClassName:
            'from-slate-100 via-white to-zinc-50 text-slate-700 ring-slate-200/80',
        iconClassName: 'bg-slate-100 text-slate-600',
        buttonClassName: 'bg-slate-700 text-white hover:bg-slate-800',
        icon: Users,
        requiresAuth: false,
    },
]

export const RANKED_MODE_INDEX = HOME_MODES.findIndex(
    (mode) => mode.id === 'ranked',
)
