import { Moon } from 'lucide-react'
import { Button } from '@/shared/ui/Button'

export const ThemeSwitchButton = () => {
    return (
        <Button
            variant="ghost"
            className="gap-1 text-secondary-foreground hover:text-primary has-[>svg]:p-2 min-[450px]:has-[>svg]:p-3"
        >
            <Moon className="size-5 sm:size-6" />
        </Button>
    )
}
