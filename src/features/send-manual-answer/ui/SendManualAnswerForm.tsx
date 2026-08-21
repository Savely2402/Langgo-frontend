import { memo, useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import {
    clearAnswerResult,
    gameRealtimeApi,
    selectRoomId,
    useAnswerSubmission,
} from '@/entities/game'
import { useUser } from '@/entities/user'
import { cn } from '@/shared/lib/classNames'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

export const SendManualAnswerForm = memo(() => {
    const roomId = useAppSelector(selectRoomId)
    const dispatch = useAppDispatch()
    const { user } = useUser()

    const { formStatus, submitAnswer } = useAnswerSubmission(user?.id)
    const [answer, setAnswer] = useState('')

    if (!user || !roomId) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = answer.trim()

        if (!trimmed || formStatus === 'checking') return

        submitAnswer(trimmed)

        try {
            await gameRealtimeApi.sendAnswer({ roomId, answer: trimmed })
        } catch (error) {
            console.error('Ошибка отправки ответа:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <div
                className={cn(
                    'relative flex items-center overflow-hidden rounded-2xl border-2 transition-all focus-within:ring-4',
                    formStatus === 'idle' &&
                        'border-slate-200 bg-white focus-within:border-ring focus-within:ring-emerald-100',
                    formStatus === 'checking' &&
                        'border-slate-200 bg-slate-50 opacity-70',
                    formStatus === 'error' &&
                        'animate-shake border-red-400 bg-red-50 ring-4 ring-red-100',
                    formStatus === 'success' && 'border-ring bg-emerald-50',
                    formStatus === 'loser' &&
                        'border-slate-300 bg-slate-100 opacity-60 grayscale',
                )}
            >
                <Input
                    value={answer}
                    onChange={(e) => {
                        setAnswer(e.target.value)
                        if (formStatus === 'error') {
                            dispatch(clearAnswerResult(user.id))
                        }
                    }}
                    disabled={
                        formStatus === 'checking' ||
                        formStatus === 'success' ||
                        formStatus === 'loser'
                    }
                    placeholder="Введите перевод..."
                    className={cn(
                        'h-16 border-0 bg-transparent px-6 text-xl shadow-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-100',
                        formStatus === 'error'
                            ? 'text-red-600 placeholder:text-red-300'
                            : 'text-slate-900 placeholder:text-slate-400',
                    )}
                    autoFocus
                    autoComplete="off"
                />
                <Button
                    type="submit"
                    disabled={
                        !answer.trim() ||
                        formStatus === 'checking' ||
                        formStatus === 'success' ||
                        formStatus === 'loser'
                    }
                    size="icon"
                    className={cn(
                        'absolute right-2 size-12 rounded-xl transition-all active:scale-95',
                        formStatus === 'error'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-primary hover:bg-primary',
                        (formStatus === 'checking' ||
                            formStatus === 'success' ||
                            formStatus === 'loser') &&
                            'opacity-50',
                    )}
                >
                    {formStatus === 'checking' ? (
                        <Loader2 className="size-5 animate-spin" />
                    ) : (
                        <Send className="size-5" />
                    )}
                </Button>
            </div>
        </form>
    )
})
