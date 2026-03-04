import { LucideBell } from 'lucide-react'
import { useUser } from '@/entities/user'
import { Button } from '@/shared/ui/Button'

export const RequestsPopover = () => {
    const { user } = useUser()

    return (
        <>
            {user && (
                <Button
                    variant="ghost"
                    className="text-secondary-foreground hover:text-primary has-[>svg]:p-2 min-[450px]:has-[>svg]:p-3"
                >
                    <LucideBell className="size-5 sm:size-6" />
                </Button>
            )}
        </>
    )
}
