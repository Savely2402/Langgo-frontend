import type React from 'react'
import { cn } from '@/shared/lib/classNames'
import type { UploadStatus } from '../model/useUploadDictionary'

interface DropzoneLayoutProps {
    variant: UploadStatus
    children: React.ReactNode
    className?: string
}

export const DropzoneLayout = ({
    variant = 'idle',
    children,
    className,
    ...props
}: DropzoneLayoutProps) => {
    return (
        <div
            className={cn(
                'group flex min-h-[232px] w-full flex-col items-center justify-center gap-6 rounded-[28px] border-4 border-[#E2E8F0] bg-[#F8FAFC]',
                (variant === 'idle' || variant === 'error') &&
                    'cursor-pointer border-dashed transition-colors hover:border-primary hover:bg-white',
                variant === 'success' && 'flex-row justify-between px-6 py-6',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}
