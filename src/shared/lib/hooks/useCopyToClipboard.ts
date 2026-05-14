import { useState, useCallback } from 'react'

export const useCopyToClipboard = (resetInterval = 2000) => {
    const [isCopied, setIsCopied] = useState(false)

    const copy = useCallback(
        async (text: string) => {
            if (!navigator?.clipboard) {
                console.warn('Clipboard not supported')
                return false
            }

            try {
                await navigator.clipboard.writeText(text)
                setIsCopied(true)

                setTimeout(() => setIsCopied(false), resetInterval)

                return true
            } catch (error) {
                console.error('Failed to copy text: ', error)
                setIsCopied(false)
                return false
            }
        },
        [resetInterval],
    )

    return { isCopied, copy }
}
