import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'
import { HomeModeSlider } from '@/widgets/home-mode-slider'

export const HomePage = () => {
    return (
        <>
            <AppHeader rightSlot={<HeaderProfile />} />
            <HomeModeSlider />
        </>
    )
}
