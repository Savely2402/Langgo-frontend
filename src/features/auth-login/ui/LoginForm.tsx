import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { getErrorMessage, isRtkQueryError } from '@/shared/api'
import EmailSvg from '@/shared/assets/icons/email.svg?react'
import LockSvg from '@/shared/assets/icons/lock.svg?react'
import { Button } from '@/shared/ui/Button'
import { Field, FieldGroup } from '@/shared/ui/Field'
import { HoverUnderline } from '@/shared/ui/HoverUnderline'
import { Icon } from '@/shared/ui/Icon'
import { Spinner } from '@/shared/ui/Spinner'
import { useLoginMutation } from '../api/loginApi'
import { loginFormSchema, type LoginFormSchema } from '../model/login-schema'
import { LoginAlert } from './LoginAlert'
import { LoginFormField } from './LoginFormField'

const ForgotPasswordLink = () => {
    return (
        <div className="-mt-2 flex justify-end">
            <Link
                className="group relative text-sm font-semibold text-primary/80 transition-colors hover:text-primary"
                to={'/'}
            >
                <HoverUnderline>Forgot Password?</HoverUnderline>
            </Link>
        </div>
    )
}

interface LoginFormProps {
    onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
    const defaultValues: LoginFormSchema = {
        email: '',
        password: '',
    }

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<LoginFormSchema>({
        defaultValues,
        resolver: zodResolver(loginFormSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const [login, { isLoading, isError, error }] = useLoginMutation()

    const onSubmit = async ({ email, password }: LoginFormSchema) => {
        try {
            await login({ email, password }).unwrap()
            onSuccess()
        } catch (err) {
            if (isRtkQueryError(err) && err.status === 401) {
                setError('email', {})
                setError('password', {})
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isError && <LoginAlert message={getErrorMessage(error)} />}
            <FieldGroup>
                <Field>
                    <LoginFormField
                        control={control}
                        errors={errors}
                        fieldType="email"
                        fieldLabelText="Email address"
                        placeholder="you@example.com"
                        autoComplete="email"
                        icon={<Icon Svg={EmailSvg} />}
                    />
                </Field>
                <Field>
                    <LoginFormField
                        control={control}
                        errors={errors}
                        fieldType="password"
                        fieldLabelText="Password"
                        placeholder="Enter password"
                        autoComplete="off"
                        icon={<Icon Svg={LockSvg} />}
                    />
                    <ForgotPasswordLink />
                </Field>
            </FieldGroup>
            <Field className="mt-5">
                <Button
                    disabled={isLoading}
                    type="submit"
                    className="h-[42px] w-full"
                >
                    Sign in
                    {isLoading && <Spinner />}
                </Button>
            </Field>
        </form>
    )
}
