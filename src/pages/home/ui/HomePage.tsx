import { Link } from 'react-router'
import { FindMatchButton } from '@/features/find-match'
import { routes } from '@/shared/config'
import { Button } from '@/shared/ui/Button'
import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'

export const HomePage = () => {
    return (
        <>
            <AppHeader rightSlot={<HeaderProfile />} />
            <div className="flex gap-4">
                <FindMatchButton />
                <Button asChild>
                    <Link to={routes.customGame.root}>Create custom game</Link>
                </Button>
            </div>
        </>
    )
}
