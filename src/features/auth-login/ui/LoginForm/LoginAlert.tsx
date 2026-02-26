import AlertSvg from '@/shared/assets/icons/alert.svg?react'
import { Alert, AlertDescription, AlertTitle, Icon } from '@/shared/ui'

type LoginAlertProps = { message: string }

export const LoginAlert = ({ message }: LoginAlertProps) => {
    return (
        <Alert variant="destructive" className="w-full bg-destructive/2 mb-7">
            <Icon Svg={AlertSvg} />
            <AlertTitle>Authorization error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
