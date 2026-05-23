import { Swords } from 'lucide-react'
import { BaseModeCard } from './BaseModeCard'

export const RankedModeCard = ({
    isActive,
    isLocked = false,
    onClick,
}: {
    isActive: boolean
    isLocked?: boolean
    onClick: () => void
}) => (
    <BaseModeCard
        isActive={isActive}
        isLocked={isLocked}
        onClick={onClick}
        icon={<Swords className="size-6" />}
        title="Рейтинговая игра"
        subtitle="Соревновательный режим"
        activeColorClass="bg-emerald-100 text-emerald-600"
    />
)
