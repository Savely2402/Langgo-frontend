import { FindMatchButton } from '@/features/find-match'
import { CancelSearchButton } from '@/features/find-match/ui/CancelSearchButton/CancelSearchButton'

export const HomePage = () => {
    return (
        <div>
            <FindMatchButton />
            <CancelSearchButton />
        </div>
    )
}
