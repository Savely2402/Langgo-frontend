import { useEffect } from 'react'
import { initGameConnection, closeGameConnection } from '@/entities/game'
import { useAppDispatch } from '@/shared/lib/store'

export const useGameConnection = (roomId?: string) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!roomId) return

        dispatch(initGameConnection(roomId))

        return () => {
            dispatch(closeGameConnection())
        }
    }, [roomId, dispatch])
}
