import { skipToken } from '@reduxjs/toolkit/query'
import { Select as SelectPrimitive } from 'radix-ui'
import { useGetUserDictionariesQuery } from '@/entities/dictionary'
import { useUser } from '@/entities/user'
import { cn } from '@/shared/lib/classNames'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/Select'

interface SelectDictionaryProps extends React.ComponentProps<
    typeof SelectPrimitive.Root
> {
    hasError?: boolean
}

export const SelectDictionary = ({
    hasError,
    ...props
}: SelectDictionaryProps) => {
    const { user } = useUser()

    const { data, isLoading, isError } = useGetUserDictionariesQuery(
        user?.id ?? skipToken,
    )

    const renderContent = () => {
        if (isLoading) {
            return (
                <SelectItem value="loading" disabled>
                    Загрузка словарей...
                </SelectItem>
            )
        }

        if (isError) {
            return (
                <SelectItem value="error" disabled className="text-destructive">
                    Ошибка при загрузке словарей
                </SelectItem>
            )
        }

        if (data && data.length === 0) {
            return (
                <SelectItem
                    value="empty"
                    disabled
                    className="max-w-[300px] whitespace-normal"
                >
                    У вас пока нет словарей. Загрузите новый словарь!
                </SelectItem>
            )
        }

        return data?.map((dict) => (
            <SelectItem key={dict.id} value={dict.id.toString()}>
                {dict.name}
            </SelectItem>
        ))
    }

    return (
        <Select {...props}>
            <SelectTrigger
                className={cn(
                    'w-full',
                    hasError && 'border-destructive ring-destructive',
                )}
            >
                <SelectValue placeholder="Выберите словарь..." />
            </SelectTrigger>

            <SelectContent position="popper">{renderContent()}</SelectContent>
        </Select>
    )
}
