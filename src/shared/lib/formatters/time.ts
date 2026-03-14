export const formatDuration = (offsetMs: number) => {
    const seconds = Math.floor((offsetMs / 1000) % 60)
    const minutes = Math.floor(offsetMs / 1000 / 60)

    return {
        seconds: seconds < 10 ? '0' + seconds : String(seconds),
        minutes: minutes < 10 ? '0' + minutes : String(minutes),
    }
}
