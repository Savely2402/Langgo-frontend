import React, { useEffect } from 'react'
import type { BaseDictionary } from '@/entities/dictionary'
import { cn } from '@/shared/lib/classNames'
import { useUploadDictionary } from '../model/useUploadDictionary'
import { UploadErrorsAlert } from './UploadErrorsAlert'
import { UploadIdle } from './UploadIdle'
import { UploadLoading } from './UploadLoading'
import { UploadSuccess } from './UploadSuccess'
import type { UploadStatus } from '../model/types'

interface UploadDictionaryDropzoneProps {
    onSuccess?: (dictionaryId: BaseDictionary['id']) => void
    onStatusChange?: (status: UploadStatus) => void
}

export const UploadDictionaryDropzone = React.memo(
    ({
        onSuccess,
        onStatusChange,
        ...props
    }: UploadDictionaryDropzoneProps) => {
        const {
            getRootProps,
            getInputProps,
            isDragActive,
            status,
            dictionaryData,
            handleCancel,
            handleRemove,
            errors,
        } = useUploadDictionary({ onSuccess })

        useEffect(() => {
            if (onStatusChange) {
                onStatusChange(status)
            }
        }, [status, onStatusChange])

        return (
            <div className="flex w-full max-w-[558px] flex-col" {...props}>
                {status === 'loading' && (
                    <UploadLoading handleCancel={handleCancel} />
                )}

                {status === 'success' && dictionaryData && (
                    <UploadSuccess
                        dictionaryName={dictionaryData.name}
                        langFrom={dictionaryData.languagePair.langFrom}
                        langTo={dictionaryData.languagePair.langTo}
                        wordsAmount={dictionaryData.wordsAmount}
                        onRemove={handleRemove}
                    />
                )}

                {(status === 'idle' || status === 'error') && (
                    <div className="flex w-full flex-col gap-4">
                        <UploadIdle
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            className={cn(
                                isDragActive && 'border-primary bg-white',
                            )}
                        />
                        <UploadErrorsAlert errors={errors} />
                    </div>
                )}
            </div>
        )
    },
)
