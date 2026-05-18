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

    return (
        <div className="flex flex-col gap-2">
            {dictionaries?.map((dict) => (
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
