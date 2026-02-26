import { Link, useNavigate } from 'react-router'
import { LoginForm } from '@/features/auth-login'
import { AuthCard } from '@/widgets/auth-card'

const LoginCardFooter = () => {
    return (
        <>
            Don't have an account?&nbsp;
            <Link className="text-primary font-bold hover:underline" to={'/'}>
                Register for free
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
