import { BookOpenText, ChevronDown } from 'lucide-react'
import { Link } from 'react-router'
import { UserAvatar, useUser } from '@/entities/user'
import { LogoutButton } from '@/features/auth-logout'
import { routes } from '@/shared/config'
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
                    <UserAvatar
                        username={user.username}
                        avatarUrl={user.avatarUrl}
                    />
                    <span className="hidden text-sm font-semibold md:block">
                        {user.fullname}
                    </span>
                    <ChevronDown className="hidden size-4 transition-all group-data-[state=open]:rotate-180 sm:block" />
                </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
                <DropdownMenuItem>
                    <Button variant="ghost" asChild>
                        <Link to={routes.dictionaries}>
                            <BookOpenText />
                            Мои словари
                        </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
