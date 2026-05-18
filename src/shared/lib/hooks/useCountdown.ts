import { useState, useEffect } from 'react'

export const useCountdown = (targetDateIso: string | null) => {
    const [now, setNow] = useState(() => Date.now())

    useEffect(() => {
        if (!targetDateIso) return
        const targetTime = new Date(targetDateIso).getTime()

        if (targetTime - Date.now() <= 0) return

        const intervalId = setInterval(() => {
            const currentNow = Date.now()
            setNow(currentNow)

            if (targetTime - currentNow <= 0) clearInterval(intervalId)
        }, 16)

        return () => clearInterval(intervalId)
    }, [targetDateIso])

    if (!targetDateIso) return { secondsLeft: null, rawMs: null }

    const difference = new Date(targetDateIso).getTime() - now

    if (difference <= 0) return { secondsLeft: 0, rawMs: 0 }

    return {
        secondsLeft: Math.ceil(difference / 1000),
        rawMs: difference,
    }
}
