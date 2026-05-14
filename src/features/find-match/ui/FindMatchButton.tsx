import { useState, type ComponentProps } from 'react'
import { Swords } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/Button'
import { MatchToastContent } from './MatchToastContent'

type FindMatchButtonProps = ComponentProps<typeof Button>

export const FindMatchButton = ({
    children,
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
                    toastId={toastId}
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
            {children ?? (
                <>
                    <Swords />
                    <span>Find match</span>
                </>
            )}
        </Button>
    )
}
