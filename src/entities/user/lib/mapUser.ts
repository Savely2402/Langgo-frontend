import type { AuthResponseDTO } from '../api/types'
import type { User } from '../model/types'

export const mapAuthResponseToUser = (response: AuthResponseDTO): User =>
    response.user
