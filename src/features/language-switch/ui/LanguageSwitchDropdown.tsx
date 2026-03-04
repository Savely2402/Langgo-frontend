import { useMemo } from 'react'
import { Languages, Check } from 'lucide-react'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/ui/DropDownMenu'

const LANGUAGE_LIST = [
    { language: 'English', code: 'EN', active: true },
    { language: 'Russian', code: 'RU', active: false },
]

export const LanguageSwitchDropdown = () => {
    const getActiveLangCode = useMemo(() => {
        return LANGUAGE_LIST.find((item) => item.active === true)?.code
    }, [])

    return (
        <DropdownMenu>
            <Button
                variant={'ghost'}
                className="gap-1 text-secondary-foreground hover:text-primary has-[>svg]:p-2 data-[state=open]:bg-accent data-[state=open]:text-primary min-[450px]:has-[>svg]:p-3"
                asChild
            >
                <DropdownMenuTrigger>
                    <Languages className="size-5 sm:size-6" strokeWidth={1.5} />
                    <span className="hidden sm:block">{getActiveLangCode}</span>
                </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="p-0"
            >
                {LANGUAGE_LIST.map((item) => (
                    <DropdownMenuItem
                        key={item.language}
                        className={cn(
                            'cursor-pointer rounded-none py-2 transition-all focus:text-primary',
                            item.active &&
                                'flex justify-between bg-primary/5 text-primary',
                        )}
                    >
                        {item.language}
                        {item.active && (
                            <Check className="size-3.5 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
