import { useState, type ComponentProps } from 'react'
import { Swords } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/Button'
import { MatchToastContent } from '../MatchToastContent/MatchToastContent'

type FindMatchButtonProps = Omit<ComponentProps<typeof Button>, 'children'>

export const FindMatchButton = ({
    onClick,
    disabled,
    ...props
}: FindMatchButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(true)
        const startSearchTime = Date.now()

        toast.custom(
            (toastId) => (
                <MatchToastContent
                    toastId={Number(toastId)}
                    startSearchTime={startSearchTime}
                    handleToastClose={() => setIsOpen(false)}
                />
            ),
            {
                duration: Infinity,
                onDismiss: () => setIsOpen(false),
            },
        )

        onClick?.(e)
    }

    return (
        <Button disabled={isOpen || disabled} onClick={handleClick} {...props}>
            <Swords />
            <span>Find match</span>
        </Button>
    )
}
