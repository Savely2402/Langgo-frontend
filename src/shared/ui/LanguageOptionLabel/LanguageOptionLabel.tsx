import { ReactCountryFlag } from 'react-country-flag'
import { cn } from '../../lib/classNames'

interface LanguageOptionLabelProps {
    countryCode: string
    label: string
    width?: React.CSSProperties['width']
    height?: React.CSSProperties['height']
    className?: string
}

export const LanguageOptionLabel = ({
    countryCode,
    label,
    width = '1.1rem',
    height = '1.1rem',
    className,
}: LanguageOptionLabelProps) => {
    return (
        <span className={cn('flex items-center gap-2', className)}>
            <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{
                    width,
                    height,
                }}
            />
            <span className="">{label}</span>
        </span>
    )
}
