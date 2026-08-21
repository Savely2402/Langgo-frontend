import { useEffect } from 'react'
import { closeGameConnection, initGameConnection } from '@/entities/game'
import { useAppDispatch } from '@/shared/lib/store'

let closeConnectionTimeout: ReturnType<typeof setTimeout> | null = null

export const useGameConnection = (roomId?: string) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!roomId) return

        if (closeConnectionTimeout) {
            clearTimeout(closeConnectionTimeout)
            closeConnectionTimeout = null
        }

        dispatch(initGameConnection(roomId))

        return () => {
            closeConnectionTimeout = setTimeout(() => {
                dispatch(closeGameConnection())
                closeConnectionTimeout = null
            }, 100)
        }
    }, [roomId, dispatch])
}
