import {
    ArrowDown,
    ArrowRight,
    BookOpenText,
    Check,
    Trash2,
} from 'lucide-react'
import { cn } from '@/shared/lib/classNames'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'
import { DropzoneLayout } from './DropzoneLayout'

interface UploadSuccessProps {
    dictionaryName: string
    langFrom: string
    langTo: string
    wordsAmount: number
    onRemove?: () => void
    className?: string
}

export const DictionaryIcon = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                'relative h-10 w-10 shrink-0 sm:h-15 sm:w-15 md:h-20 md:w-20',
                className,
            )}
        >
            <div className="flex h-full w-full items-center justify-center rounded-xl border border-gray-300 bg-gray-100 shadow-sm sm:rounded-2xl">
                <BookOpenText className="text-gray-500 md:h-10 md:w-10" />
            </div>

            <div className="absolute right-0 bottom-0 flex h-4 w-4 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border-2 border-white bg-green-500 shadow-md sm:h-6 sm:w-6 md:h-8 md:w-8">
                <Check
                    className="h-3 w-3 text-white sm:h-4 sm:w-4 md:h-5 md:w-5"
                    strokeWidth={3}
                />
            </div>
        </div>
    )
}

export const UploadSuccess = ({
    dictionaryName,
    langFrom,
    langTo,
    wordsAmount,
    onRemove,
    className,
}: UploadSuccessProps) => {
    return (
        <DropzoneLayout variant="success" className={className}>
            <div className="flex min-w-0 flex-1 items-center gap-6">
                <DictionaryIcon className="self-start sm:self-auto" />

                <div className="flex min-w-0 flex-col gap-2">
                    <h3
                        className="line-clamp-2 text-2xl font-extrabold wrap-break-word"
                        title={dictionaryName}
                    >
                        {dictionaryName}
                    </h3>
                    <div className="flex flex-col items-center gap-2 min-[400px]:flex-row">
                        <Badge
                            variant="secondary"
                            className="border border-[#E2E8F0]"
                        >
                            {langFrom}
                        </Badge>
                        <ArrowDown className="size-3 text-[#CBD5E1] min-[400px]:hidden" />
                        <ArrowRight className="hidden size-3 text-[#CBD5E1] min-[400px]:block" />
                        <Badge
                            variant="secondary"
                            className="border border-[#E2E8F0]"
                        >
                            {langTo}
                        </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Слов: {wordsAmount}
                    </span>
                </div>
            </div>

            {onRemove && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-slate-400 hover:bg-red-100 hover:text-red-600"
                    onClick={onRemove}
                >
                    <Trash2 className="size-5" />
                </Button>
            )}
        </DropzoneLayout>
    )
}
