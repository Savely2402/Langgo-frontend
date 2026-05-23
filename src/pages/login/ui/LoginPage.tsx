import { Link, useNavigate } from 'react-router'
import { LoginForm } from '@/features/auth-login'
import { routes } from '@/shared/config'
import { HoverUnderline } from '@/shared/ui/HoverUnderline'
import { AppHeader } from '@/widgets/app-header'
import { AuthCard } from '@/widgets/auth-card'

const LoginCardFooter = () => {
    return (
        <>
            Нет аккаунта?&nbsp;
            <Link
                className="font-bold text-primary/80 transition-all hover:text-primary"
                to={routes.register}
            >
                <HoverUnderline>Зарегестрируйтесь</HoverUnderline>
            </Link>
        </>
    )
}

export const LoginPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <AppHeader />

            <div className="flex min-h-dvh w-full items-center justify-center">
                <AuthCard
                    title="Добро пожаловать"
                    description="Пожалуйста, войдите в аккаунт LangGo"
                    footer={<LoginCardFooter />}
                >
                    <LoginForm
                        onSuccess={() => {
                            navigate(routes.home)
                        }}
                    />
                </AuthCard>
            </div>
        </>
    )
}
