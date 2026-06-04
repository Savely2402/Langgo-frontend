import { skipToken } from '@reduxjs/toolkit/query'
import {
    DictionaryCard,
    useGetUserDictionariesQuery,
} from '@/entities/dictionary'
import { useUser } from '@/entities/user'
import { DeleteDictionaryButton } from '@/features/delete-dictionary'

export const UserDictionaries = () => {
    const { user } = useUser()

    const { data: dictionaries, isError } = useGetUserDictionariesQuery(
        user?.id ?? skipToken,
    )

    if (isError) {
        return <>Не удалось загрузить словари :(</>
    }

    if (dictionaries?.length === 0) {
        return (
            <div className="flex justify-center pt-20 text-2xl font-bold">
                У вас нет созданных словарей
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            {dictionaries
                ?.filter((dict) => dict.type === 'public')
                .map((dict) => (
                    <DictionaryCard
                        dictionary={dict}
                        key={dict.id}
                        actionsSlot={
                            <DeleteDictionaryButton
                                dictionaryId={dict.id}
                                dictionaryName={dict.name}
                            />
                        }
                    />
                ))}
        </div>
    )
}
