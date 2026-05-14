import { Copy, Check } from 'lucide-react'
import { useParams } from 'react-router'
import { cn } from '@/shared/lib/classNames'
import { useCopyToClipboard } from '@/shared/lib/hooks/useCopyToClipboard'
import { Button } from '@/shared/ui/Button'

export const CopyInviteLink = () => {
    const { roomId } = useParams()
    const inviteUrl = `langgo.com/lobby/${roomId}`
    const { isCopied, copy } = useCopyToClipboard()

    return (
        <div className="flex items-center justify-between rounded-xl border bg-card p-2 pl-4 shadow-sm">
            <div className="flex flex-col gap-1 overflow-hidden">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    Пригласительная ссылка
                </span>
                <span className="truncate font-mono text-sm text-foreground">
                    {inviteUrl}
                </span>
            </div>

            <Button
                variant="secondary"
                size="icon"
                onClick={() => copy(inviteUrl)}
                className={cn(
                    'ml-4 shrink-0 transition-colors',
                    isCopied
                        ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100',
                )}
            >
                {isCopied ? (
                    <Check className="size-4" />
                ) : (
                    <Copy className="size-4" />
                )}
            </Button>
        </div>
    )
}
