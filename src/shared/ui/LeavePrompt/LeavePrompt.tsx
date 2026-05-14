import { TriangleAlert } from 'lucide-react'
import { useNavigationBlocker } from '../../lib/routing'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from '../AlertDialog'

interface LeavePromptProps {
    open: boolean
    title: string
    description?: string
    onConfirm?: () => void
    onCancel?: () => void
}

export const LeavePrompt = ({
    open,
    title,
    description,
    onConfirm,
    onCancel,
}: LeavePromptProps) => {
    const { isBlocked, proceed, cancel } = useNavigationBlocker(open)

    const handleProceed = () => {
        onConfirm?.()
        proceed()
    }

    const handleCancel = () => {
        onCancel?.()
        cancel()
    }

    return (
        <AlertDialog open={isBlocked}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/20 text-destructive">
                        <TriangleAlert />
                    </AlertDialogMedia>

                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogAction
                    variant={'destructive'}
                    className="h-14 rounded-3xl! border-b-4 border-[#B91C1C] text-[18px] font-semibold"
                    onClick={handleProceed}
                >
                    Выйти
                </AlertDialogAction>
                <AlertDialogCancel
                    className="h-14 rounded-3xl! text-[18px] font-semibold"
                    onClick={handleCancel}
                >
                    Остаться
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}
