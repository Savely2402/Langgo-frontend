import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { formatDuration } from '@/shared/lib/formatters'
import { Separator } from '@/shared/ui/Separator'
import { CancelSearchButton } from './CancelSearchButton'

interface MatchToastContentProps {
    toastId: number | string
    startSearchTime: number
    handleToastClose: () => void
}

export const MatchToastContent = ({
    toastId,
    startSearchTime,
    handleToastClose,
}: MatchToastContentProps) => {
    const [elapsedTime, setElapsedTime] = useState<number>(() =>
        startSearchTime ? Date.now() - startSearchTime : 0,
    )

    const onClickCancelSearchButton = useCallback(() => {
        handleToastClose()
        toast.dismiss(toastId)
    }, [toastId, handleToastClose])

    const { seconds, minutes } = formatDuration(elapsedTime)

    useEffect(() => {
        if (!startSearchTime) return

        const intervalId = setInterval(() => {
            setElapsedTime(Date.now() - startSearchTime)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [startSearchTime])

    return (
        <div className="m-auto flex h-[46px] w-[130px] items-center justify-around rounded-full bg-[#1E293B] px-3 text-xs font-medium text-white min-[600px]:w-[330px] sm:text-sm">
            <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#94A3B8]" />
                <span className="relative inline-flex h-full w-full rounded-full bg-[#94A3B8]" />
            </span>

            <span className="hidden min-[600px]:block">Поиск оппонента...</span>
            <Separator
                orientation="vertical"
                className="hidden h-4! bg-[#475569] min-[600px]:block"
            />
            <span className="flex w-10 justify-center text-yellow-500">
                {minutes}:{seconds}
            </span>
            <CancelSearchButton onClick={onClickCancelSearchButton} />
        </div>
    )
}
