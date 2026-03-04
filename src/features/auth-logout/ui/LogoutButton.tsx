import { Button } from '@/shared/ui/Button'
import { useLogoutMutation } from '../api/logoutApi'

export const LogoutButton = () => {
    const [logout] = useLogoutMutation()

    return (
        <Button onClick={async () => await logout(null).unwrap()}>
            Sign out
        </Button>
    )
}
