import { languageOptions } from '../../config'
import { LanguageOptionLabel } from '../LanguageOptionLabel'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../Select'

interface LanguageSelectProps {
    value?: string
    onChange: (value: string) => void
    onBlur?: () => void
    hasError?: boolean
    placeholder: string
    id?: string
}

export const LanguageSelect = ({
    value,
    onChange,
    onBlur,
    hasError,
    placeholder,
    id,
}: LanguageSelectProps) => {
    const selectedOption = languageOptions.find(
        (option) => option.value === value,
    )

    return (
        <Select onValueChange={onChange} value={value || undefined}>
            <SelectTrigger
                aria-invalid={hasError}
                id={id}
                className="h-[46px] w-full rounded-3xl bg-white transition-all hover:bg-card data-[state=open]:bg-card"
                onBlur={onBlur}
            >
                {selectedOption ? (
                    <LanguageOptionLabel
                        countryCode={selectedOption.countryCode}
                        label={selectedOption.label}
                    />
                ) : (
                    <span className="text-muted-foreground">{placeholder}</span>
                )}
            </SelectTrigger>
            <SelectContent position="popper">
                {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        <LanguageOptionLabel
                            countryCode={option.countryCode}
                            label={option.label}
                        />
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
