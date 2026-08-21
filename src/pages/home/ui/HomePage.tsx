import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'
import { HomeModeSlider } from '@/widgets/home-mode-slider'

export type ModeId = 'ranked' | 'solo' | 'custom'

export const HomePage = () => {
    return (
        <div className="flex h-dvh flex-col">
            <AppHeader rightSlot={<HeaderProfile />} />
            <main>
                <HomeModeSlider />
            </main>
        </div>
    )
}
