import type { ComponentProps } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui/Button'

type SetupGameButtonProps = Omit<ComponentProps<typeof Button>, 'children'>

export const SetupGameButton = ({ disabled }: SetupGameButtonProps) => {
    return (
        <Button
            type="submit"
            disabled={disabled}
            className="btn-3d h-16 w-full rounded-3xl text-xl"
        >
            Next: Manage Players
            <ArrowRight className="size-6" />
        </Button>
    )
}
