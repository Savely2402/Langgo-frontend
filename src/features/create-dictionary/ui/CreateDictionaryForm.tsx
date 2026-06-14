import { zodResolver } from '@hookform/resolvers/zod'
import { skipToken } from '@reduxjs/toolkit/query'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import {
    DictionaryForm,
    dictionarySchema,
    useGetUserDictionariesQuery,
    type DictionaryFormSchema,
} from '@/entities/dictionary'
import { useCreateDictionaryMutation } from '@/entities/dictionary'
import { useUser } from '@/entities/user'
import type { LanguageCode } from '@/shared/config'
import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'

export const CreateDictionaryForm = () => {
    const navigate = useNavigate()

    const { user } = useUser()

    const [createDictionary, { isLoading }] = useCreateDictionaryMutation()
    const { refetch } = useGetUserDictionariesQuery(user?.id ?? skipToken)

    const methods = useForm<DictionaryFormSchema>({
        resolver: zodResolver(dictionarySchema),
        defaultValues: {
            name: '',
            langFrom: '' as LanguageCode,
            langTo: '' as LanguageCode,
            words: [{ originalWord: '', translatedWord: '' }],
        },
    })

    const onSubmit = async (data: DictionaryFormSchema) => {
        try {
            console.log('Отправка данных на сервер:', data)

            const words = data.words.filter(
                (w) =>
                    w.originalWord.trim() !== '' &&
                    w.translatedWord.trim() !== '',
            )

            await createDictionary({
                name: data.name,
                langFrom: data.langFrom,
                langTo: data.langTo,
                description: '',
                isPublic: true,
                wordsWithTranslations: words.map((w) => ({
                    original: w.originalWord,
                    translation: w.translatedWord,
                    example: '',
                    difficulty: 0,
                })),
            }).unwrap()

            refetch()

            toast.success('Словарь успешно создан!')
            navigate('/dictionaries')
        } catch (error) {
            toast.error('Не удалось создать словарь. Попробуйте снова.')
            console.error(error)
        }
    }

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
                Новый словарь
            </h2>

            <FormProvider {...methods}>
                <DictionaryForm
                    control={methods.control}
                    errors={methods.formState.errors}
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="mt-8 flex gap-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="btn-3d h-12 flex-1 rounded-xl text-lg font-semibold"
                        >
                            {isLoading ? (
                                <>
                                    <Spinner className="mr-2 h-5 w-5 animate-spin" />
                                    Создание...
                                </>
                            ) : (
                                'Создать словарь'
                            )}
                        </Button>
                    </div>
                </DictionaryForm>
            </FormProvider>
        </div>
    )
}
