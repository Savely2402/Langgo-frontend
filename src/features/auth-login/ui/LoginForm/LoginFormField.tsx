import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import {
    FieldError,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/shared/ui'
import type { LoginFormSchema } from '../../model/login-schema'

interface LoginFormFieldProps {
    control: Control<LoginFormSchema, any, LoginFormSchema>
    errors: FieldErrors<LoginFormSchema>
    fieldType: keyof LoginFormSchema
    fieldLabelText: string
    placeholder: string
    autoComplete: React.HTMLInputAutoCompleteAttribute
    icon: JSX.Element
}

export const LoginFormField = ({
    control,
    errors,
    fieldType,
    fieldLabelText,
    placeholder,
    autoComplete,
    icon,
}: LoginFormFieldProps) => {
    return (
        <>
            <FieldLabel htmlFor={`login-${fieldType}-input`}>
                <span className="font-medium">{fieldLabelText}</span>
            </FieldLabel>
            <InputGroup className="bg-background hover:bg-card focus-within:bg-card  overflow-hidden h-[46px]">
                <Controller
                    control={control}
                    name={fieldType}
                    render={({ field }) => (
                        <InputGroupInput
                            type={fieldType}
                            aria-invalid={!!errors[fieldType]}
                            id={`login-${fieldType}-input`}
                            className=" h-full w-full"
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            name={field.name}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            value={field.value}
                        />
                    )}
                />

                <InputGroupAddon align={'inline-start'}>{icon}</InputGroupAddon>
            </InputGroup>
            {errors[fieldType] && (
                <FieldError>{errors[fieldType].message}</FieldError>
            )}
        </>
    )
}
