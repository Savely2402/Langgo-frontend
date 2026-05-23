import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import { useLogoutMutation } from '../api/logoutApi'

interface LogoutButtonProps {
    className?: string
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
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
        <Button
            variant={'destructive'}
            className={cn(className)}
            disabled={isLoading}
            onClick={handleClickLogout}
        >
            Выйти
        </Button>
    )
}
