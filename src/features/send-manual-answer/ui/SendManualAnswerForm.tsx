import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/shared/lib/classNames'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

type FormStatus = 'idle' | 'checking' | 'error' | 'success'

export const SendManualAnswerForm = () => {
    const [answer, setAnswer] = useState('')
    const [status, setStatus] = useState<FormStatus>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const trimmed = answer.trim()

        if (!trimmed || status === 'checking') return

        setStatus('checking')

        try {
            await new Promise((res) => setTimeout(res, 300))
            const isCorrect = answer === 'A' // Для теста

            if (!isCorrect) {
                setStatus('error')
                setTimeout(() => setStatus('idle'), 500)
            } else {
                setStatus('success')
            }
        } catch (error) {
            console.error(error)
            setStatus('idle')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <div
                className={cn(
                    'relative flex items-center overflow-hidden rounded-2xl border-2 transition-all focus-within:ring-4',
                    status === 'idle' &&
                        'border-slate-200 bg-white focus-within:border-emerald-500 focus-within:ring-emerald-100',
                    status === 'checking' &&
                        'border-slate-200 bg-slate-50 opacity-70',
                    status === 'error' &&
                        'animate-shake border-red-400 bg-red-50 ring-4 ring-red-100',
                    status === 'success' && 'border-emerald-500 bg-emerald-50',
                )}
            >
                <Input
                    value={answer}
                    onChange={(e) => {
                        setAnswer(e.target.value)
                        if (status === 'error') setStatus('idle')
                    }}
                    disabled={status === 'checking' || status === 'success'}
                    placeholder="Введите перевод..."
                    className={cn(
                        'h-16 border-0 bg-transparent px-6 text-xl shadow-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-100',
                        status === 'error'
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
                        status === 'checking' ||
                        status === 'success'
                    }
                    size="icon"
                    className={cn(
                        'absolute right-2 size-12 rounded-xl transition-all active:scale-95',
                        status === 'error'
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-emerald-500 hover:bg-emerald-600',
                        (status === 'checking' || status === 'success') &&
                            'opacity-50',
                    )}
                >
                    {status === 'checking' ? (
                        <Loader2 className="size-5 animate-spin" />
                    ) : (
                        <Send className="size-5" />
                    )}
                </Button>
            </div>
        </form>
    )
}
