import { useState } from 'react'
import { Flag, TriangleAlert } from 'lucide-react'
import { selectRoundStatus } from '@/entities/game/'
import { useAppSelector } from '@/shared/lib/store'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/shared/ui/AlertDialog'
import { Button } from '@/shared/ui/Button'

export const SurrenderGameButton = () => {
    const roundStatus = useAppSelector(selectRoundStatus)
    const [openedInStatus, setOpenedInStatus] = useState<string | null>(null)

    const isOpen = openedInStatus === roundStatus
    const isButtonDisabled = roundStatus === 'revealing'

    const handleSurrender = () => {
        console.log('Пользователь сдался!')
        setOpenedInStatus(null)
    }

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(open) => {
                if (open) {
                    setOpenedInStatus(roundStatus)
                } else {
                    setOpenedInStatus(null)
                }
            }}
        >
            <AlertDialogTrigger asChild>
                <Button
                    variant={'outline'}
                    aria-label="Surrender"
                    disabled={isButtonDisabled}
                    className="flex items-center justify-center rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                >
                    <Flag className="size-6 fill-current" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/20 text-destructive">
                        <TriangleAlert />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                        Вы уверены, что хотите сдаться?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие досрочно завершит текущий раунд. Ваш
                        оппонент автоматически получит победные очки. Отменить
                        это действие нельзя.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSurrender}
                        className="bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
                    >
                        Да, сдаться
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
