import type { ComponentProps } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'

type CancelSearchButtonProps = Omit<ComponentProps<typeof Button>, 'children'>

export const CancelSearchButton = ({
    className,
    ...props
}: CancelSearchButtonProps) => {
    return (
        <Button
            variant="ghost"
            className={cn(
                'size-8! transition-colors hover:bg-[#ededed]',
                className,
            )}
            aria-label="Отменить поиск"
            {...props}
        >
            <X className="size-4 sm:size-5" />
        </Button>
    )
}
