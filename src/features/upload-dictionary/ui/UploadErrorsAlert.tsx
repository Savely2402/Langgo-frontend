import { AlertCircle } from 'lucide-react'
import { cn } from '@/shared/lib/classNames'
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/Alert'

interface UploadErrorProps {
    errors: string[]
    className?: string
}

export const UploadErrorsAlert = ({ errors, className }: UploadErrorProps) => {
    if (!errors || errors.length === 0) return null

    return (
        <Alert
            variant="destructive"
            className={cn('bg-destructive/10', className)}
        >
            <AlertCircle />
            <AlertTitle>Ошибка загрузки</AlertTitle>
            <AlertDescription>
                <ul className="ml-4 list-disc space-y-1">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            </AlertDescription>
        </Alert>
    )
}
