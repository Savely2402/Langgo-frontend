import { zodResolver } from '@hookform/resolvers/zod'
import { AtSign, Lock, Mail, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { getErrorMessage } from '@/shared/api'
import { Button } from '@/shared/ui/Button'
import { Field, FieldGroup } from '@/shared/ui/Field'
import { Spinner } from '@/shared/ui/Spinner'
import { useRegisterMutation } from '../api/registerApi'
import {
    registerFormSchema,
    type RegisterFormInput,
    type RegisterFormSchema,
} from '../model/register-schema'
import { RegisterAlert } from './RegisterAlert'
import { RegisterFormField } from './RegisterFormField'
import { RegisterLanguageSelectField } from './RegisterLanguageSelectField'
import type { RequestRegisterBody } from '../api/types'

interface RegisterFormProps {
    onSuccess: () => void
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
    const defaultValues: RegisterFormInput = {
        fullname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        langFrom: '',
        langTo: '',
    }

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormInput, unknown, RegisterFormSchema>({
        defaultValues,
        resolver: zodResolver(registerFormSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const [register, { isLoading, isError, error }] = useRegisterMutation()

    const onSubmit = async (values: RegisterFormSchema) => {
        const registerBody: RequestRegisterBody = {
            fullname: values.fullname,
            username: values.username,
            email: values.email,
            password: values.password,
            nativeLanguage: values.langFrom,
            learningLanguage: values.langTo,
        }

        try {
            await register(registerBody).unwrap()
            onSuccess()
        } catch {
            // error is handled by mutation state
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isError && <RegisterAlert message={getErrorMessage(error)} />}
            <FieldGroup>
                <Field>
                    <RegisterFormField
                        control={control}
                        errors={errors}
                        fieldName="fullname"
                        fieldLabelText="Full name"
                        placeholder="John Doe"
                        inputType="text"
                        autoComplete="name"
                        icon={<User className="size-5" />}
                    />
                </Field>
                <Field>
                    <RegisterFormField
                        control={control}
                        errors={errors}
                        fieldName="username"
                        fieldLabelText="Username"
                        placeholder="john_doe"
                        inputType="text"
                        autoComplete="username"
                        icon={<AtSign className="size-5" />}
                    />
                </Field>
                <Field>
                    <RegisterFormField
                        control={control}
                        errors={errors}
                        fieldName="email"
                        fieldLabelText="Email address"
                        placeholder="you@example.com"
                        inputType="email"
                        autoComplete="email"
                        icon={<Mail className="size-5" />}
                    />
                </Field>
                <Field>
                    <RegisterFormField
                        control={control}
                        errors={errors}
                        fieldName="password"
                        fieldLabelText="Password"
                        placeholder="Create password"
                        inputType="password"
                        autoComplete="new-password"
                        icon={<Lock className="size-5" />}
                    />
                </Field>
                <Field>
                    <RegisterFormField
                        control={control}
                        errors={errors}
                        fieldName="confirmPassword"
                        fieldLabelText="Confirm password"
                        placeholder="Repeat password"
                        inputType="password"
                        autoComplete="new-password"
                        icon={<Lock className="size-5" />}
                    />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                    <Field>
                        <RegisterLanguageSelectField
                            control={control}
                            errors={errors}
                            fieldName="langFrom"
                            fieldLabelText="Lang from"
                            placeholder="Lang from"
                        />
                    </Field>
                    <Field>
                        <RegisterLanguageSelectField
                            control={control}
                            errors={errors}
                            fieldName="langTo"
                            fieldLabelText="Lang to"
                            placeholder="Lang to"
                        />
                    </Field>
                </div>
            </FieldGroup>
            <Field className="mt-5">
                <Button
                    disabled={isLoading}
                    type="submit"
                    className="h-[42px] w-full"
                >
                    Create account
                    {isLoading && <Spinner />}
                </Button>
            </Field>
        </form>
    )
}
