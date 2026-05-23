import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { FieldError, FieldLabel } from '@/shared/ui/Field'
import { LanguageSelect } from '@/shared/ui/LanguageSelect'
import type {
    RegisterFormInput,
    RegisterFormSchema,
} from '../model/register-schema'

type RegisterLanguageFieldName = 'langFrom' | 'langTo'

interface RegisterLanguageSelectFieldProps {
    control: Control<RegisterFormInput, unknown, RegisterFormSchema>
    errors: FieldErrors<RegisterFormInput>
    fieldName: RegisterLanguageFieldName
    fieldLabelText: string
    placeholder: string
}

export const RegisterLanguageSelectField = ({
    control,
    errors,
    fieldName,
    fieldLabelText,
    placeholder,
}: RegisterLanguageSelectFieldProps) => {
    return (
        <>
            <FieldLabel htmlFor={`register-${fieldName}-select`}>
                <span className="font-medium">{fieldLabelText}</span>
            </FieldLabel>
            <Controller
                control={control}
                name={fieldName}
                render={({ field }) => {
                    return (
                        <LanguageSelect
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            placeholder={placeholder}
                            hasError={!!errors[fieldName]}
                            id={`register-${fieldName}-select`}
                        />
                    )
                }}
            />
            {errors[fieldName] && (
                <FieldError>{errors[fieldName]?.message}</FieldError>
            )}
        </>
    )
}
