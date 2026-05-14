import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { authLanguageOptions, routes } from '@/shared/config'
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
    actionsSlot?: React.ReactNode
}

export const DictionaryCard = ({
    dictionary,
    actionsSlot,
}: DictionaryCardProps) => {
    const {
        name,
        languagePair: { langFrom, langTo },
        wordsAmount,
    } = dictionary

    const [langFromData, langToData] = [langFrom, langTo].map((lang) =>
        authLanguageOptions.find((option) => option.value === lang),
    )

    const navigate = useNavigate()

    return (
        <Button
            variant="outline"
            asChild
            className="h-full w-full rounded-[24px] bg-white p-6"
        >
            <Item
                variant="outline"
                className="cursor-pointer rounded-[24px] bg-white p-6"
                onClick={() => navigate(routes.home)}
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
