import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { authLanguageOptions } from '@/shared/config'
import { FieldError, FieldLabel } from '@/shared/ui/Field'
import { LanguageOptionLabel } from '@/shared/ui/LanguageOptionLabel'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/shared/ui/Select'
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
                    const selectedOption = authLanguageOptions.find(
                        (option) => option.value === field.value,
                    )

                    return (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value || undefined}
                        >
                            <SelectTrigger
                                aria-invalid={!!errors[fieldName]}
                                id={`register-${fieldName}-select`}
                                className="h-[46px] w-full rounded-3xl bg-background transition-all hover:bg-card data-[state=open]:bg-card"
                                onBlur={field.onBlur}
                            >
                                {selectedOption ? (
                                    <LanguageOptionLabel
                                        countryCode={selectedOption.countryCode}
                                        label={selectedOption.label}
                                    />
                                ) : (
                                    <span className="text-muted-foreground">
                                        {placeholder}
                                    </span>
                                )}
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {authLanguageOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        <LanguageOptionLabel
                                            countryCode={option.countryCode}
                                            label={option.label}
                                        />
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )
                }}
            />
            {errors[fieldName] && (
                <FieldError>{errors[fieldName]?.message}</FieldError>
            )}
        </>
    )
}
