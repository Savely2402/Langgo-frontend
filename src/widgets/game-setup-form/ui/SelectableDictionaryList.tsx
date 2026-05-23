import { Check } from 'lucide-react'
import {
    DictionaryCard,
    type BaseDictionary,
    type Dictionary,
} from '@/entities/dictionary'
import { cn } from '@/shared/lib/classNames'

type SelectableDictionaryListProps = {
    dictionaries?: Dictionary[] | BaseDictionary[]
    selectedId: number | null
    onSelect: (id: number) => void
}

export const SelectableDictionaryList = ({
    dictionaries,
    selectedId,
    onSelect,
}: SelectableDictionaryListProps) => {
    if (!dictionaries?.length) {
        return <p className="text-center text-slate-400">Словари не найдены</p>
    }

    return (
        <div className="flex flex-col gap-3">
            {dictionaries.map((dict) => {
                const isSelected = selectedId === dict.id

                return (
                    <DictionaryCard
                        key={dict.id}
                        dictionary={dict}
                        onClick={() => onSelect(dict.id)}
                        className={cn(
                            'transition-all duration-200',
                            isSelected
                                ? 'border-b-[6px] border-primary bg-white'
                                : 'border-slate-100 bg-white hover:border-slate-200',
                        )}
                        actionsSlot={
                            isSelected && (
                                <div className="flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
                                    <Check className="size-4" strokeWidth={3} />
                                </div>
                            )
                        }
                    />
                )
            })}
        </div>
    )
}
