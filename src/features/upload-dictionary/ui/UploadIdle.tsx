import { FileUp } from 'lucide-react'
import { cn } from '@/shared/lib/classNames'
import { DropzoneLayout } from './DropzoneLayout'
import type { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone'

export interface UploadIdleProps {
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T
    className?: string
}

export const UploadIdle = ({
    getInputProps,
    getRootProps,
    className,
}: UploadIdleProps) => {
    return (
        <DropzoneLayout
            variant="idle"
            {...getRootProps({})}
            className={cn(
                'group flex min-h-[232px] w-full cursor-pointer flex-col items-center justify-center gap-6 rounded-[28px] border-4 border-dashed border-[#E2E8F0] bg-[#F8FAFC] transition-colors hover:border-primary hover:bg-white',
                className,
            )}
        >
            <FileUp className="size-10 text-slate-400 transition-colors group-hover:text-primary" />
            <div className="flex flex-col gap-2 font-semibold">
                <p className="text-center text-[18px]">
                    Перетащите или выберите файл
                </p>
                <p className="text-center text-sm text-muted-foreground/70">
                    Поддерживаются .json файлы до 5 MB
                </p>
            </div>

            <input {...getInputProps()} />
        </DropzoneLayout>
    )
}
