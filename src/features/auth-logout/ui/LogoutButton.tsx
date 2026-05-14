import { Button } from '@/shared/ui/Button'
import { useLogoutMutation } from '../api/logoutApi'

export const LogoutButton = () => {
    const [logout, { isLoading }] = useLogoutMutation()

    const handleClickLogout = async () => {
        const refreshToken = localStorage.getItem('refreshToken')

        if (!refreshToken) return

        try {
            await logout({ refreshToken }).unwrap()
        } catch (err) {
            console.error('Ошибка при выходе: ', err)
        }
    }

    return (
        <Button disabled={isLoading} onClick={handleClickLogout}>
            Sign out
        </Button>
    )
}
