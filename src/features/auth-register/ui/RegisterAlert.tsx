import AlertSvg from '@/shared/assets/icons/alert.svg?react'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert'
import { Icon } from '@/shared/ui/Icon'

type RegisterAlertProps = { message: string }

export const RegisterAlert = ({ message }: RegisterAlertProps) => {
    return (
        <Alert variant="destructive" className="mb-7 w-full bg-destructive/2">
            <Icon Svg={AlertSvg} />
            <AlertTitle>Registration error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
