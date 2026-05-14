import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router'
import { routes } from '@/shared/config'
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
} from '@/shared/ui/AlertDialog'

interface AuthRequiredDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const AuthRequiredDialog = ({
    open,
    onOpenChange,
}: AuthRequiredDialogProps) => {
    const navigate = useNavigate()

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent
                size="sm"
                className="rounded-[32px] border-white/70 bg-white/95 p-6 shadow-[0_32px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
            >
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-amber-100 text-amber-600">
                        <Lock />
                    </AlertDialogMedia>
                    <AlertDialogTitle>
                        Режим доступен после входа
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Этот режим доступен только авторизованным пользователям.
                        Войдите, чтобы начать игру.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-2">
                    <AlertDialogCancel>Позже</AlertDialogCancel>
                    <AlertDialogAction
                        variant="default"
                        className="border-emerald-700 bg-primary"
                        onClick={() => navigate(routes.login)}
                    >
                        Войти
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
