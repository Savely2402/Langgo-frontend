import { ArrowRight } from 'lucide-react'
import { languageOptions } from '@/shared/config'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from '@/shared/ui/Item'
import { LanguageOptionLabel } from '@/shared/ui/LanguageOptionLabel'
import type { BaseDictionary } from '../model/types'

interface DictionaryCardProps {
    dictionary: BaseDictionary
    className?: string
    actionsSlot?: React.ReactNode
    onClick?: () => void
}

export const DictionaryCard = ({
    dictionary,
    actionsSlot,
    onClick,
    className,
}: DictionaryCardProps) => {
    const { name, langFrom, langTo, wordsAmount } = dictionary

    const [langFromData, langToData] = [langFrom, langTo].map((lang) =>
        languageOptions.find((option) => option.value === lang),
    )

    return (
        <Button
            variant="outline"
            asChild
            className={cn(
                'h-full w-full rounded-[24px] bg-white p-6',
                className,
            )}
        >
            <Item
                variant="outline"
                className="cursor-pointer rounded-[24px] bg-white p-6"
                onClick={onClick}
            >
                <ItemContent>
                    <ItemTitle className="text-xl font-black">{name}</ItemTitle>
                    <ItemDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            {langFromData && (
                                <LanguageOptionLabel
                                    countryCode={langFromData.countryCode}
                                    label={langFromData.label}
                                    className="gap-1"
                                />
                            )}
                            <ArrowRight size={14} />
                            {langToData && (
                                <LanguageOptionLabel
                                    countryCode={langToData.countryCode}
                                    label={langToData.label}
                                    className="gap-1"
                                />
                            )}
                        </span>
                        <span className="text-sm font-bold">
                            {wordsAmount} СЛОВ
                        </span>
                    </ItemDescription>
                </ItemContent>
                {actionsSlot && <ItemActions>{actionsSlot}</ItemActions>}
            </Item>
        </Button>
    )
}
