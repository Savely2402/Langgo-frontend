import { useState, type ComponentProps } from 'react'
import { Swords } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import { MatchToastContent } from './MatchToastContent'

type FindMatchButtonProps = ComponentProps<typeof Button>

export const FindMatchButton = ({
    className,
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
        <Button
            className={cn('btn-3d', className)}
            disabled={isOpen || disabled}
            onClick={handleClick}
            {...props}
        >
            {children ?? (
                <>
                    <Swords />
                    <span className="font-luckiest text-lg font-normal tracking-widest">
                        Найти матч
                    </span>
                </>
            )}
        </Button>
    )
}
