import { ArrowRight, Trash2 } from 'lucide-react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

type FormValues = {
    words: Array<{
        originalWord: string
        translatedWord: string
    }>
}

export const WordPairsList = () => {
    const {
        control,
        register,
        getValues,
        formState: { errors },
    } = useFormContext<FormValues>()

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'words',
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">Список слов</h3>
                {errors.words?.root && (
                    <span className="text-sm text-red-500">
                        {errors.words.root.message}
                    </span>
                )}
            </div>

            <div className="space-y-3">
                {fields.map((field, index) => {
                    const isLastField = index === fields.length - 1
                    const isPenultimateField = index === fields.length - 2

                    const handleOriginalChange = (
                        e: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        const val = e.target.value

                        if (isLastField && val.trim() !== '') {
                            append(
                                { originalWord: '', translatedWord: '' },
                                { shouldFocus: false },
                            )
                        } else if (isPenultimateField && val.trim() === '') {
                            const translatedVal = getValues(
                                `words.${index}.translatedWord`,
                            )
                            if (!translatedVal?.trim()) {
                                const lastRow = getValues(
                                    `words.${fields.length - 1}`,
                                )
                                if (
                                    !lastRow?.originalWord?.trim() &&
                                    !lastRow?.translatedWord?.trim()
                                ) {
                                    remove(fields.length - 1)
                                }
                            }
                        }
                    }

                    const handleTranslatedChange = (
                        e: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        const val = e.target.value

                        if (isPenultimateField && val.trim() === '') {
                            const originalVal = getValues(
                                `words.${index}.originalWord`,
                            )
                            if (!originalVal?.trim()) {
                                const lastRow = getValues(
                                    `words.${fields.length - 1}`,
                                )
                                if (
                                    !lastRow?.originalWord?.trim() &&
                                    !lastRow?.translatedWord?.trim()
                                ) {
                                    remove(fields.length - 1)
                                }
                            }
                        }
                    }

                    return (
                        <div key={field.id} className="flex items-start gap-3">
                            <div className="flex-1">
                                <Input
                                    placeholder="apple"
                                    {...register(
                                        `words.${index}.originalWord`,
                                        {
                                            onChange: handleOriginalChange,
                                        },
                                    )}
                                    aria-invalid={
                                        !!errors.words?.[index]?.originalWord
                                    }
                                />
                                {errors.words?.[index]?.originalWord && (
                                    <span className="text-xs text-red-500">
                                        {
                                            errors.words[index].originalWord
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <ArrowRight
                                className="mt-3 text-slate-400"
                                size={20}
                            />

                            <div className="flex-1">
                                <Input
                                    placeholder="яблоко"
                                    {...register(
                                        `words.${index}.translatedWord`,
                                        {
                                            onChange: handleTranslatedChange,
                                        },
                                    )}
                                    aria-invalid={
                                        !!errors.words?.[index]?.translatedWord
                                    }
                                />
                                {errors.words?.[index]?.translatedWord && (
                                    <span className="text-xs text-red-500">
                                        {
                                            errors.words[index].translatedWord
                                                .message
                                        }
                                    </span>
                                )}
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className={`mt-1 text-red-500 transition-opacity ${isLastField ? 'pointer-events-none opacity-0' : ''}`}
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
