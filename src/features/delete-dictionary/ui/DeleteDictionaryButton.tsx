import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import {
    useDeleteDictionaryMutation,
    type BaseDictionary,
} from '@/entities/dictionary'
import { Button } from '@/shared/ui/Button'
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog'

interface DeleteDictionaryButtonProps {
    dictionaryId: BaseDictionary['id']
    dictionaryName: string
}

export const DeleteDictionaryButton = ({
    dictionaryId,
    dictionaryName,
}: DeleteDictionaryButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [deleteDictionary, { isLoading }] = useDeleteDictionaryMutation()

    const handleDelete = async () => {
        try {
            await deleteDictionary(dictionaryId).unwrap()
            setIsOpen(false)
        } catch {
            // Тут можно кинуть тост с ошибкой
        }
    }

    return (
        <>
            <Button
                className="group"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsOpen(true)
                }}
            >
                <Trash2 className="size-4 text-slate-400 transition-colors group-hover:text-destructive" />
            </Button>

            <ConfirmDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                title="Удалить словарь?"
                description={`Вы уверены, что хотите удалить словарь «${dictionaryName}»? Это действие нельзя отменить.`}
                onConfirm={handleDelete}
                isLoading={isLoading}
            />
        </>
    )
}
