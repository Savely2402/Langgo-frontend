import type { Player } from '@/entities/game'
import type { User } from '@/entities/user'

export type MatchResultData =
    | {
          mode: 'pvp'
          user: User
          opponent: Player
          myScore: number
          opponentScore: number
          result: 'win' | 'lose' | 'draw'
      }
    | {
          mode: 'solo'
          user: User
          myScore: number
          result: 'completed'
      }

export type MatchResultType = MatchResultData['result']

interface MatchResultMeta {
    title: string
    ratingPrefix: '+' | '-' | ''
}

export const MATCH_RESULT_META = {
    win: {
        title: 'Победа в матче 🏆',
        ratingPrefix: '+',
    },
    lose: {
        title: 'Поражение 😔',
        ratingPrefix: '-',
    },
    draw: {
        title: 'Ничья 🤝',
        ratingPrefix: '',
    },
    completed: {
        title: 'Игра завершена 🏁',
        ratingPrefix: '+',
    },
} satisfies Record<MatchResultType, MatchResultMeta>
