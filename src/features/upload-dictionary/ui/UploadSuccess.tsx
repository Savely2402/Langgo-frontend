import { ArrowRight, BookOpenText, Check, Trash2 } from 'lucide-react'
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

export const DictionaryIcon = () => {
    return (
        <div className="relative h-20 w-20 shrink-0">
            <div className="flex h-full w-full items-center justify-center rounded-2xl border border-gray-300 bg-gray-100 shadow-sm">
                <BookOpenText className="h-10 w-10 text-gray-500" />
            </div>

            <div className="absolute right-0 bottom-0 flex h-8 w-8 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border-2 border-white bg-green-500 shadow-md">
                <Check className="h-5 w-5 text-white" strokeWidth={3} />
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
                <DictionaryIcon />

                <div className="flex flex-col gap-2">
                    <h3
                        className="truncate text-2xl font-extrabold"
                        title={dictionaryName}
                    >
                        {dictionaryName}
                    </h3>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="secondary"
                            className="border border-[#E2E8F0]"
                        >
                            {langFrom}
                        </Badge>
                        <ArrowRight className="size-3 text-[#CBD5E1]" />
                        <Badge
                            variant="secondary"
                            className="border border-[#E2E8F0]"
                        >
                            {langTo}
                        </Badge>
                    </div>
                    <span className="text-muted-foreground">
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
