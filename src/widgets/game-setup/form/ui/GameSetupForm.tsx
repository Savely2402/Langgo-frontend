import { useCallback, useEffect, useState } from 'react'
import { Settings, Upload, Files, ArrowRight } from 'lucide-react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { SelectDictionary } from '@/features/select-dictionary'
import {
    UploadDictionaryDropzone,
    type UploadStatus,
} from '@/features/upload-dictionary'
import { Button } from '@/shared/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/Card'
import { Field, FieldError, FieldLabel } from '@/shared/ui/Field'
import { Input } from '@/shared/ui/Input'
import { LeavePrompt } from '@/shared/ui/LeavePrompt'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'

interface GameSetupFormValues {
    dictionaryId: number | null
    roundsAmount: number
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

    const formValues = useWatch({ control })

    useEffect(() => {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(formValues))
    }, [formValues])

    const clearDraft = () => {
        sessionStorage.removeItem(DRAFT_KEY)
    }

    const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle')
    const [activeTab, setActiveTab] = useState('select')

    const isUploading = uploadStatus === 'loading'

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        setValue('dictionaryId', null)
        clearErrors('dictionaryId')
    }

    const onSubmit = (data: GameSetupFormValues) => {
        console.log('Отправляем на бэк:', data)
        navigate('/')
    }

    const handleUploadStatusChange = useCallback(
        (status: UploadStatus) => {
            setUploadStatus(status)
            if (uploadStatus === 'idle' || uploadStatus === 'error') {
                setValue('dictionaryId', null)
            }
        },
        [uploadStatus, setValue],
    )

    return (
        <>
            <LeavePrompt
                open={isDirty && !isSubmitting}
                title="Покинуть настройку игры?"
                description="Все ваши текущие настройки и загруженный словарь
                    будут потеряны."
                onConfirm={clearDraft}
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <Card className="gap-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-1">
                            <Settings className="size-6 stroke-2 text-primary" />
                            <span className="text-xl font-bold">
                                Game Configuration
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs
                            value={activeTab}
                            onValueChange={handleTabChange}
                            className="gap-4"
                        >
                            <TabsList className="w-full rounded-4xl">
                                <TabsTrigger
                                    value="select"
                                    className="rounded-4xl font-semibold data-[state=active]:text-primary"
                                >
                                    <Files className="mr-2 size-4" />
                                    Select
                                    <span className="hidden sm:block">
                                        Dictionary
                                    </span>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="upload"
                                    className="rounded-4xl font-semibold data-[state=active]:text-primary"
                                >
                                    <Upload className="mr-2 size-4" />
                                    Upload
                                    <span className="hidden sm:block">New</span>
                                </TabsTrigger>
                            </TabsList>

                            <Controller
                                control={control}
                                name="dictionaryId"
                                rules={{
                                    required:
                                        'Пожалуйста, выберите или загрузите словарь',
                                }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <TabsContent value="select">
                                            <Field>
                                                <FieldLabel>
                                                    Choose from library
                                                </FieldLabel>
                                                <SelectDictionary
                                                    hasError={
                                                        !!fieldState.error
                                                    }
                                                    value={
                                                        field.value
                                                            ? field.value.toString()
                                                            : ''
                                                    }
                                                    onValueChange={(val) =>
                                                        field.onChange(
                                                            Number(val),
                                                        )
                                                    }
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

                                        <TabsContent value="upload">
                                            <Field>
                                                <FieldLabel>
                                                    Upload custom dictionary
                                                </FieldLabel>
                                                <UploadDictionaryDropzone
                                                    onSuccess={field.onChange}
                                                    onStatusChange={
                                                        handleUploadStatusChange
                                                    }
                                                />
                                                {fieldState.error &&
                                                    uploadStatus !==
                                                        'success' && (
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
                                )}
                            />
                        </Tabs>

                        <Field className="mt-6">
                            <FieldLabel htmlFor="rounds-amount">
                                Number of rounds
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
                                        placeholder="Type a number..."
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    ? Number(e.target.value)
                                                    : '',
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
                    disabled={isUploading}
                    className="h-16 w-full rounded-3xl border-b-4 border-[#047857] text-xl"
                >
                    Next: Manage Players
                    <ArrowRight className="size-6" />
                </Button>
            </form>
        </>
    )
}
