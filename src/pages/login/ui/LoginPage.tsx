import { Link, useNavigate } from 'react-router'
import { LoginForm } from '@/features/auth-login'
import { HoverUnderline } from '@/shared/ui'
import { AuthCard } from '@/widgets/auth-card'

const LoginCardFooter = () => {
    return (
        <>
            Don't have an account?&nbsp;
            <Link
                className="transition-all text-primary/80 hover:text-primary font-bold"
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
        <div className="w-full min-h-dvh flex items-center justify-center">
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
