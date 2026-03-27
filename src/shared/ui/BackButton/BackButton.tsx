import { ArrowLeft, LogOut } from 'lucide-react'
import { Button } from '../Button'

interface BackButtonProps {
    onClick: () => void
    label: string
    variant: 'back' | 'leave'
}

export const BackButton = ({ label, variant, onClick }: BackButtonProps) => {
    const Icon = variant === 'back' ? ArrowLeft : LogOut

    return (
        <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={onClick}
        >
            <Icon className="mr-2 size-4" />
            {label}
        </Button>
    )
}
