import { Link } from 'react-router'
import { LanguageSwitchDropdown } from '@/features/language-switch'
import { ThemeSwitchButton } from '@/features/theme-switch'
import LogoSvg from '@/shared/assets/icons/logo.svg?react'
import { Header } from '@/shared/ui/Header'
import { Icon } from '@/shared/ui/Icon'

const Logo = () => {
    return (
        <Link to={'/'} className="flex items-center gap-1">
            <Icon Svg={LogoSvg} className="size-6 min-[450px]:size-9" />
            <span className="font-bold min-[450px]:text-[20px]">LangGo</span>
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
                    <div className="flex items-center md:gap-2">
                        <ThemeSwitchButton />
                        <LanguageSwitchDropdown />
                    </div>

                    {rightSlot}
                </div>
            }
        />
    )
}
