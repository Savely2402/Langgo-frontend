import { useEffect, useRef, useState } from 'react'
import {
    ErrorCode,
    useDropzone,
    type FileRejection,
    type FileWithPath,
} from 'react-dropzone'
import {
    type BaseDictionary,
    useUploadDictionaryMutation,
    useDeleteDictionaryMutation,
} from '@/entities/dictionary'
import { getErrorMessage, isAbortError } from '@/shared/api'

const FILE_ERROR_MESSAGES = {
    [ErrorCode.FileInvalidType]: 'Тип файла должен быть .json',
    [ErrorCode.FileTooLarge]: 'Максимальный размер файла: 5MB',
    [ErrorCode.TooManyFiles]: 'Максимальное кол-во файлов: 1',
    [ErrorCode.FileTooSmall]: 'Минимальный размер файла: 50B',
} as const

interface UseUploadDictionaryProps {
    onSuccess?: (dictionaryId: BaseDictionary['id']) => void
}

export type UploadStatus = 'idle' | 'loading' | 'error' | 'success'

export const useUploadDictionary = ({
    onSuccess,
}: UseUploadDictionaryProps = {}) => {
    const [uploadDictionary, { data, isLoading, error, reset: resetUpload }] =
        useUploadDictionaryMutation()

    const [deleteDictionary] = useDeleteDictionaryMutation()

    const isRealError = error && !isAbortError(error)

    const [fileErrors, setFileErrors] = useState<
        (typeof FILE_ERROR_MESSAGES)[ErrorCode][]
    >([])

    const uploadPromiseRef = useRef<ReturnType<typeof uploadDictionary> | null>(
        null,
    )

    const handleCancel = () => {
        uploadPromiseRef.current?.abort()
        resetUpload()
    }

    const handleRemove = async () => {
        if (!data?.id) return

        const result = await deleteDictionary(data.id)

        if (!('error' in result)) {
            resetUpload()
        }
    }

    const status: UploadStatus = isLoading
        ? 'loading'
        : isRealError || fileErrors.length > 0
          ? 'error'
          : data
            ? 'success'
            : 'idle'

    useEffect(() => {
        if (data && onSuccess) {
            onSuccess(data.id)
        }
    }, [data, onSuccess])

    useEffect(() => {
        return () => uploadPromiseRef.current?.abort()
    }, [])

    const dropzone = useDropzone({
        onDrop: (
            acceptedFiles: FileWithPath[],
            fileRejections: FileRejection[],
        ) => {
            const errors: typeof fileErrors = []

            if (acceptedFiles.length + fileRejections.length > 1) {
                errors.push(FILE_ERROR_MESSAGES[ErrorCode.TooManyFiles])
                setFileErrors(errors)
                return
            }

            if (fileRejections.length) {
                fileRejections[0].errors.forEach((error) => {
                    errors.push(FILE_ERROR_MESSAGES[error.code as ErrorCode])
                })

                setFileErrors(errors)
                return
            }

            if (acceptedFiles.length) {
                setFileErrors([])
                const file = acceptedFiles[0]
                const formData = new FormData()
                formData.append('file', file)
                uploadPromiseRef.current = uploadDictionary({
                    body: formData,
                })
            }
        },
        accept: {
            'application/json': ['.json'],
        },
        maxFiles: 1,
        maxSize: 5 * 1024 * 1024,
        minSize: 50,
    })

    const allErrors = [
        ...fileErrors,
        ...(isRealError ? [getErrorMessage(error)] : []),
    ]

    return {
        ...dropzone,
        errors: allErrors,
        dictionaryData: data,
        status,
        handleCancel,
        handleRemove,
    }
}
