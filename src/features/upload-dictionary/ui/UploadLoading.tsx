import { Button } from '@/shared/ui/Button'
import { Spinner } from '@/shared/ui/Spinner'
import { DropzoneLayout } from './DropzoneLayout'

interface UploadLoadingProps {
    handleCancel: () => void
    className?: string
}

export const UploadLoading = ({
    handleCancel,
    className,
}: UploadLoadingProps) => {
    return (
        <DropzoneLayout variant="loading" className={className}>
            <span className="flex items-center gap-3 text-center text-xl font-semibold">
                <Spinner className="size-6" />
                Загружаем словарь...
            </span>
            <Button variant="outline" onClick={handleCancel}>
                Отменить загрузку
            </Button>
        </DropzoneLayout>
    )
}
