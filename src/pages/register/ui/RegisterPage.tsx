import { Link, useNavigate } from 'react-router'
import { RegisterForm } from '@/features/auth-register'
import { routes } from '@/shared/config'
import { HoverUnderline } from '@/shared/ui/HoverUnderline'
import { AppHeader } from '@/widgets/app-header'
import { AuthCard } from '@/widgets/auth-card'

const RegisterCardFooter = () => {
    return (
        <>
            Уже есть аккаунт?&nbsp;
            <Link
                className="font-bold text-primary/80 transition-all hover:text-primary"
                to={routes.login}
            >
                <HoverUnderline>Войдите</HoverUnderline>
            </Link>
        </>
    )
}

export const RegisterPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <AppHeader />

            <div className="flex min-h-dvh w-full items-center justify-center">
                <AuthCard
                    title="Создать аккаунт"
                    description="Создайте аккаунт чтобы начать игру"
                    footer={<RegisterCardFooter />}
                    socialAuthLabel="Sign up with Google"
                >
                    <RegisterForm
                        onSuccess={() => {
                            navigate(routes.home)
                        }}
                    />
                </AuthCard>
            </div>
        </>
    )
}
