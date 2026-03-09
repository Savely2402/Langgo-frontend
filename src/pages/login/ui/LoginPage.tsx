import { Link, useNavigate } from 'react-router'
import { LoginForm } from '@/features/auth-login'
import { HoverUnderline } from '@/shared/ui/HoverUnderline'
import { AuthCard } from '@/widgets/auth-card'

const LoginCardFooter = () => {
    return (
        <>
            Don't have an account?&nbsp;
            <Link
                className="font-bold text-primary/80 transition-all hover:text-primary hover:underline"
                to={'/'}
            >
                <HoverUnderline>Register for free</HoverUnderline>
            </Link>
        </>
    )
}

export const LoginPage = () => {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-dvh w-full items-center justify-center">
            <AuthCard
                title="Welcome back"
                description="Please sign in to your LangGo account"
                footer={<LoginCardFooter />}
            >
                <LoginForm
                    onSuccess={() => {
                        navigate('/')
                    }}
                />
            </AuthCard>
        </div>
    )
}
