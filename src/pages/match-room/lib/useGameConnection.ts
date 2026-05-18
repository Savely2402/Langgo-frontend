import { useEffect, useRef } from 'react'
import { initGameConnection, closeGameConnection } from '@/entities/game'
import { useAppDispatch } from '@/shared/lib/store'

export const useGameConnection = (roomId?: string) => {
    const dispatch = useAppDispatch()
    const cleanupCalled = useRef(false)

    useEffect(() => {
        if (!roomId) return

        // Сделано против двойного монтирования от strict mode
        if (!cleanupCalled.current) {
            cleanupCalled.current = true
            return
        }

        dispatch(initGameConnection(roomId))

        return () => {
            dispatch(closeGameConnection())
        }
    }, [roomId, dispatch])
}
