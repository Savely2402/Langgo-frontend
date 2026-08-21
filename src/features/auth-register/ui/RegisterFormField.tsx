import type {
    HTMLInputAutoCompleteAttribute,
    HTMLInputTypeAttribute,
    ReactNode,
} from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { FieldError, FieldLabel } from '@/shared/ui/Field'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/shared/ui/InputGroup'
import type {
    RegisterFormInput,
    RegisterFormSchema,
} from '../model/register-schema'

type RegisterTextFieldName =
    | 'fullname'
    | 'username'
    | 'email'
    | 'password'
    | 'confirmPassword'

interface RegisterFormFieldProps {
    control: Control<RegisterFormInput, unknown, RegisterFormSchema>
    errors: FieldErrors<RegisterFormInput>
    fieldName: RegisterTextFieldName
    fieldLabelText: string
    placeholder: string
    inputType: HTMLInputTypeAttribute
    autoComplete: HTMLInputAutoCompleteAttribute
    icon: ReactNode
}

export const RegisterFormField = ({
    control,
    errors,
    fieldName,
    fieldLabelText,
    placeholder,
    inputType,
    autoComplete,
    icon,
}: RegisterFormFieldProps) => {
    return (
        <>
            <FieldLabel htmlFor={`register-${fieldName}-input`}>
                <span className="font-medium">{fieldLabelText}</span>
            </FieldLabel>
            <InputGroup className="h-[46px] overflow-hidden bg-background transition-all focus-within:bg-card hover:bg-card">
                <Controller
                    control={control}
                    name={fieldName}
                    render={({ field }) => (
                        <InputGroupInput
                            type={inputType}
                            aria-invalid={!!errors[fieldName]}
                            id={`register-${fieldName}-input`}
                            className="h-full w-full"
                            placeholder={placeholder}
                            autoComplete={autoComplete}
                            name={field.name}
                            onBlur={field.onBlur}
                            onChange={field.onChange}
                            value={field.value}
                        />
                    )}
                />

                <InputGroupAddon align="inline-start">{icon}</InputGroupAddon>
            </InputGroup>
            {errors[fieldName] && (
                <FieldError>{errors[fieldName]?.message}</FieldError>
            )}
        </>
    )
}
