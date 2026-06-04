import { useEffect, useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { Upload, Files, ArrowRight } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router'
import {
    useGetDictionariesQuery,
    useGetUserDictionariesQuery,
} from '@/entities/dictionary'
import {
    setGameSettings,
    useCreateGameMutation,
    type CreateGameRequest,
} from '@/entities/game'
import { useUser } from '@/entities/user' // Добавил импорт юзера
import { getErrorMessage } from '@/shared/api'
import { routes } from '@/shared/config'
import { useAppDispatch } from '@/shared/lib/store'
import { Button } from '@/shared/ui/Button'
import { Card, CardContent } from '@/shared/ui/Card'
import { Field, FieldError, FieldLabel } from '@/shared/ui/Field'
import { FormTabsList } from '@/shared/ui/FormTabsList'
import { Input } from '@/shared/ui/Input'
import { LeavePrompt } from '@/shared/ui/LeavePrompt'
import { Spinner } from '@/shared/ui/Spinner'
import { Tabs, TabsContent } from '@/shared/ui/Tabs'
import { SelectableDictionaryList } from './SelectableDictionaryList'

interface GameSetupFormValues {
    dictionaryId: number | null
    roundsAmount: number | null
}

const DRAFT_KEY = 'game-setup-draft'

const parseDraft = (): GameSetupFormValues | null => {
    try {
        return JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null')
    } catch {
        sessionStorage.removeItem(DRAFT_KEY)
        return null
    }
}

export const GameSetupForm = () => {
    const savedDraft = parseDraft()
    const navigate = useNavigate()
    const { user } = useUser()
    const dispatch = useAppDispatch()

    const {
        handleSubmit,
        control,
        setValue,
        clearErrors,
        formState: { isDirty, isSubmitting, errors },
    } = useForm<GameSetupFormValues>({
        defaultValues: savedDraft || {
            dictionaryId: null,
            roundsAmount: 11,
        },
    })

    const { data: userSystemDicts } = useGetDictionariesQuery()

    // user?.id ?? skipToken,

    const { data: userCustomDicts } = useGetUserDictionariesQuery(
        user?.id ?? skipToken,
        // user?.id ?? skipToken,
    )
    // const { data: systemDicts } = useGetSystemDictionariesQuery()

    const formValues = useWatch({ control })
    const [createGame, { isLoading }] = useCreateGameMutation()

    useEffect(() => {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(formValues))
    }, [formValues])

    const clearDraft = () => {
        sessionStorage.removeItem(DRAFT_KEY)
    }

    const [activeTab, setActiveTab] = useState('system')

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setValue('dictionaryId', null)
        clearErrors('dictionaryId')
    }

    const onSubmit = async (data: GameSetupFormValues) => {
        if (!data.dictionaryId || !data.roundsAmount) return null

        const createGameBody: CreateGameRequest = {
            dictionaryId: data.dictionaryId,
            maxRounds: data.roundsAmount,
            mode: 0,
        }

        try {
            const result = await createGame(createGameBody).unwrap()

            console.log(result)

            dispatch(setGameSettings(result.settings))

            navigate(routes.lobby(result.roomId))
        } catch (err) {
            console.error('Не удалось создать игру: ', getErrorMessage(err))
        }
    }

    return (
        <>
            <LeavePrompt
                open={isDirty && !isSubmitting}
                title="Покинуть настройку игры?"
                description="Все ваши текущие настройки и загруженный словарь будут потеряны."
                onConfirm={clearDraft}
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 pb-10"
            >
                <Card className="gap-2">
                    <CardContent>
                        <Tabs
                            value={activeTab}
                            onValueChange={handleTabChange}
                            className="gap-4"
                        >
                            <FormTabsList
                                items={[
                                    {
                                        value: 'system',
                                        label: (
                                            <>
                                                <Files className="mr-2 size-4" />
                                                Системные
                                                <span className="hidden sm:block">
                                                    &nbsp;словари
                                                </span>
                                            </>
                                        ),
                                    },
                                    {
                                        value: 'custom',
                                        label: (
                                            <>
                                                <Upload className="mr-2 size-4" />
                                                Мои
                                                <span className="hidden sm:block">
                                                    &nbsp;словари
                                                </span>
                                            </>
                                        ),
                                    },
                                ]}
                            />

                            <Controller
                                control={control}
                                name="dictionaryId"
                                rules={{
                                    required: 'Пожалуйста, выберите словарь',
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <TabsContent
                                                value="system"
                                                className="mt-4"
                                            >
                                                <Field>
                                                    <FieldLabel>
                                                        Выберите из библиотеки
                                                    </FieldLabel>
                                                    <SelectableDictionaryList
                                                        dictionaries={userSystemDicts?.filter(
                                                            (dict) =>
                                                                dict.type ===
                                                                'system',
                                                        )}
                                                        selectedId={field.value}
                                                        onSelect={(id) => {
                                                            field.onChange(
                                                                Number(id),
                                                            )
                                                            clearErrors(
                                                                'dictionaryId',
                                                            )
                                                        }}
                                                    />
                                                    {fieldState.error && (
                                                        <FieldError>
                                                            {
                                                                fieldState.error
                                                                    .message
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>
                                            </TabsContent>

                                            <TabsContent
                                                value="custom"
                                                className="mt-4"
                                            >
                                                <Field>
                                                    <FieldLabel>
                                                        Выберите свой словарь
                                                    </FieldLabel>
                                                    <SelectableDictionaryList
                                                        dictionaries={userCustomDicts?.filter(
                                                            (dict) =>
                                                                dict.type ===
                                                                'public',
                                                        )}
                                                        selectedId={field.value}
                                                        onSelect={(id) => {
                                                            field.onChange(
                                                                Number(id),
                                                            )
                                                            clearErrors(
                                                                'dictionaryId',
                                                            )
                                                        }}
                                                    />
                                                    {fieldState.error && (
                                                        <FieldError>
                                                            {
                                                                fieldState.error
                                                                    .message
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>
                                            </TabsContent>
                                        </>
                                    )
                                }}
                            />
                        </Tabs>

                        <Field className="mt-6">
                            <FieldLabel htmlFor="rounds-amount">
                                Количество раундов
                            </FieldLabel>
                            <Controller
                                control={control}
                                name="roundsAmount"
                                rules={{
                                    required: 'Введите количество раундов',
                                    max: {
                                        value: 31,
                                        message: 'Макс. 31 раунд',
                                    },
                                    min: { value: 1, message: 'Мин. 1 раунд' },
                                }}
                                render={({ field, fieldState }) => (
                                    <Input
                                        {...field}
                                        aria-invalid={!!fieldState.error}
                                        id="rounds-amount"
                                        type="number"
                                        placeholder="Введите число..."
                                        value={field.value ?? ''}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    ? Number(e.target.value)
                                                    : null,
                                            )
                                        }
                                    />
                                )}
                            />
                            {errors.roundsAmount && (
                                <FieldError>
                                    {errors.roundsAmount.message}
                                </FieldError>
                            )}
                        </Field>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-3d h-16 w-full rounded-3xl font-luckiest text-xl tracking-widest"
                >
                    Создать игру
                    {isLoading ? (
                        <Spinner className="ml-2" />
                    ) : (
                        <ArrowRight className="ml-2 size-6" />
                    )}
                </Button>
            </form>
        </>
    )
}
