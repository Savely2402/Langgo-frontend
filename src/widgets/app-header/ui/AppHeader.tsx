import { Link } from 'react-router'
// import { LanguageSwitchDropdown } from '@/features/language-switch'
// import { ThemeSwitchButton } from '@/features/theme-switch'
import { Header } from '@/shared/ui/Header'

const Logo = () => {
    return (
        <Link to={'/'} className="flex items-center gap-1">
            <span className="font-luckiest min-[450px]:text-[34px]">
                LangGo
            </span>
        </Link>
    )
}

interface AppHeaderProps {
    rightSlot?: React.ReactNode
}

export const AppHeader = ({ rightSlot }: AppHeaderProps) => {
    return (
        <Header
            leftSlot={<Logo />}
            rightSlot={
                <div className="flex h-9 items-center gap-1 md:gap-0">
                    {/* <div className="flex items-center md:gap-2">
                        <ThemeSwitchButton />
                        <LanguageSwitchDropdown />
                    </div> */}

                    {rightSlot}
                </div>
            }
        />
    )
}
