import type { PlayerDto } from '../api/types'
import type { Player } from '../model/types'

export const mapPlayerDtoToPlayer = (response: PlayerDto): Player => {
    return {
        id: response.userId,
        username: response.username,
        isHost: response.isHost,
        avatarUrl: response.avatarUrl,
        nativeLanguage: response.nativeLanguage,
        rating: response.rating,
    }
}
