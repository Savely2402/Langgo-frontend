import { Upload } from 'lucide-react'
import { CreateDictionaryForm } from '@/features/create-dictionary'
import { UploadDictionaryDropzone } from '@/features/upload-dictionary'
import { FormTabsList } from '@/shared/ui/FormTabsList'
import { Tabs, TabsContent } from '@/shared/ui/Tabs'
import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'

export const AddDictionaryPage = () => {
    return (
        <>
            <AppHeader rightSlot={<HeaderProfile />} />
            <div className="mx-auto max-w-[640px] px-4">
                <div className="flex items-center justify-between">
                    <h1 className="my-8 font-luckiest text-3xl sm:text-4xl">
                        Создать словарь
                    </h1>
                </div>

                <Tabs defaultValue="create">
                    <FormTabsList
                        items={[
                            {
                                value: 'create',
                                label: <span>Создать</span>,
                            },
                            {
                                value: 'upload',
                                label: (
                                    <>
                                        <Upload className="mr-2 size-4" />
                                        Загрузить
                                    </>
                                ),
                            },
                        ]}
                    />

                    <TabsContent value="create">
                        <CreateDictionaryForm />
                    </TabsContent>

                    <TabsContent value="upload">
                        <UploadDictionaryDropzone />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
