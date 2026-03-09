import AlertSvg from '@/shared/assets/icons/alert.svg?react'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert'
import { Icon } from '@/shared/ui/Icon'

type LoginAlertProps = { message: string }

export const LoginAlert = ({ message }: LoginAlertProps) => {
    return (
        <Alert variant="destructive" className="mb-7 w-full bg-destructive/2">
            <Icon Svg={AlertSvg} />
            <AlertTitle>Authorization error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
