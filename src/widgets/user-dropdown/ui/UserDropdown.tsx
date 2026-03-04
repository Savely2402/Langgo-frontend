import { ChevronDown } from 'lucide-react'
import { useUser } from '@/entities/user'
import { LogoutButton } from '@/features/auth-logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/DropDownMenu'

export const UserDropdown = () => {
    const { user } = useUser()

    if (!user) {
        return null
    }

    return (
        <DropdownMenu>
            <Button
                variant="ghost"
                className="group flex items-center hover:text-primary has-[>svg]:p-2 data-[state=open]:bg-accent data-[state=open]:text-primary min-[450px]:has-[>svg]:p-3"
                asChild
            >
                <DropdownMenuTrigger>
                    <Avatar className="size-6 sm:size-7">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>
                            {user.username[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-semibold md:block">
                        {user.fullname}
                    </span>
                    <ChevronDown className="hidden size-4 transition-all group-data-[state=open]:rotate-180 sm:block" />
                </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuItem>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
