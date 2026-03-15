import { ArrowRight, LogIn } from 'lucide-react'
import { Link } from 'react-router'
import { useUser } from '@/entities/user'
import { RequestsPopover } from '@/features/friends/manage-requests'
import { Button } from '@/shared/ui/Button'
import { Separator } from '@/shared/ui/Separator'
import { UserDropdown } from '@/widgets/user-dropdown'

const GuestState = () => {
    return (
        <>
            <Separator
                orientation="vertical"
                className="mx-4 hidden h-6! md:block"
            />
            <Button className="md:hidden" asChild>
                <Link to={'/login'}>
                    <LogIn />
                </Link>
            </Button>
            <div className="hidden items-center gap-3 md:flex">
                <Button
                    variant={'secondary'}
                    className="hover:text-primary"
                    asChild
                >
                    <Link to={'/login'}>Login</Link>
                </Button>
                <Button variant={'default'} asChild>
                    <Link to={'/login'}>
                        Register <ArrowRight color="white" />
                    </Link>
                </Button>
            </div>
        </>
    )
}

const UserState = () => {
    return (
        <>
            <Separator
                orientation="vertical"
                className="mx-4 hidden h-6! md:block"
            />
            <RequestsPopover />
            <UserDropdown />
        </>
    )
}

export const HeaderProfile = () => {
    const { user } = useUser()

    return <>{user ? <UserState /> : <GuestState />}</>
}
