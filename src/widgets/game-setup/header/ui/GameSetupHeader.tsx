import { useNavigate } from 'react-router'
import { RequestsPopover } from '@/features/friends/manage-requests'
import { BackButton } from '@/shared/ui/BackButton'
import { Header } from '@/shared/ui/Header'

export const GameSetupHeader = () => {
    const navigate = useNavigate()

    return (
        <Header
            leftSlot={
                <BackButton
                    label="Cancel"
                    variant="back"
                    onClick={() => navigate(-1)}
                />
            }
            rightSlot={<RequestsPopover />}
        />
    )
}
