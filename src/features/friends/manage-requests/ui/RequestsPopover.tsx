import { LucideBell } from 'lucide-react'
import { useUser } from '@/entities/user'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'

export const RequestsPopover = () => {
    const { user } = useUser()

    return (
        <>
            {user && (
                <Button
                    variant="outline"
                    className={cn(
                        'btn-3d-sm text-secondary-foreground hover:text-primary',
                        'has-[>svg]:p-2 min-[450px]:has-[>svg]:p-3',
                    )}
                    aria-label="friend requests"
                >
                    <LucideBell className="size-5 sm:size-6" />
                </Button>
            )}
        </>
    )
}
