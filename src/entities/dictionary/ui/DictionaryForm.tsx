import type { ReactNode, FormEvent } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { FieldLabel, FieldError } from '@/shared/ui/Field'
import { Input } from '@/shared/ui/Input'
import { LanguageSelect } from '@/shared/ui/LanguageSelect'
import { WordPairsList } from './WordPairsList'
import type { DictionaryFormSchema } from '../model/dictionary-schema'

interface DictionaryFormProps {
    control: Control<DictionaryFormSchema>
    errors: FieldErrors<DictionaryFormSchema>
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    children: ReactNode
}

export const DictionaryForm = ({
    control,
    errors,
    onSubmit,
    children,
}: DictionaryFormProps) => {
    return (
        <form
            onSubmit={onSubmit}
            className="flex w-full max-w-2xl flex-col space-y-8"
        >
            <div className="space-y-2">
                <FieldLabel htmlFor="dict-name">Название словаря</FieldLabel>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            id="dict-name"
                            placeholder="Например: Английский для IT"
                            aria-invalid={!!errors.name}
                            {...field}
                        />
                    )}
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <FieldLabel htmlFor="lang-from">Родной язык</FieldLabel>
                    <Controller
                        name="langFrom"
                        control={control}
                        render={({ field }) => (
                            <LanguageSelect
                                id="lang-from"
                                placeholder="С какого переводим"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                hasError={!!errors.langFrom}
                            />
                        )}
                    />
                    {errors.langFrom && (
                        <FieldError>{errors.langFrom.message}</FieldError>
                    )}
                </div>

                <div className="space-y-2">
                    <FieldLabel htmlFor="lang-to">Изучаемый язык</FieldLabel>
                    <Controller
                        name="langTo"
                        control={control}
                        render={({ field }) => (
                            <LanguageSelect
                                id="lang-to"
                                placeholder="На какой переводим"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                hasError={!!errors.langTo}
                            />
                        )}
                    />

                    {errors.langTo && (
                        <FieldError>{errors.langTo.message}</FieldError>
                    )}
                </div>
            </div>

            <div className="max-h-[200px] overflow-auto border-t pt-4">
                <WordPairsList />
            </div>

            <div className="pt-2">{children}</div>
        </form>
    )
}
