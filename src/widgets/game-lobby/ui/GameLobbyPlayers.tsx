import React from 'react' // Не забудь импортнуть для Fragment
import { Crown, X, User } from 'lucide-react' // Добавил User для иконки заглушки
import { ReactCountryFlag } from 'react-country-flag'
import { selectCurrentPlayer, selectPlayersForLobby } from '@/entities/player'
import { UserAvatar, useUser } from '@/entities/user'
import { cn } from '@/shared/lib/classNames'
import { useAppSelector } from '@/shared/lib/store'
import { Badge } from '@/shared/ui/Badge'
import { Button } from '@/shared/ui/Button'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
} from '@/shared/ui/Item'

interface GameLobbyPlayersProps {
    className?: string
}

export const GameLobbyPlayers = ({ className }: GameLobbyPlayersProps) => {
    const { user } = useUser()
    const players = useAppSelector((state) => selectPlayersForLobby(state))
    const me = useAppSelector((state) => selectCurrentPlayer(state, user?.id))

    if (!me) return <div>Загрузка...</div>

    return (
        <div className={cn('rounded-[40px] bg-card', className)}>
            {players.map((p, index) => (
                <React.Fragment key={p.id}>
                    <Item className="h-[120px]">
                        <ItemMedia>
                            <UserAvatar
                                avatarUrl={p.avatarUrl}
                                username={p.username}
                                className="size-14 sm:size-16"
                            />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="text-xl font-bold">
                                {p.username}
                                <ReactCountryFlag countryCode="ES" svg />
                                {p.isHost && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-yellow-500/10 text-xs text-yellow-600 hover:bg-yellow-500/20"
                                    >
                                        <Crown className="mr-1 size-4 text-yellow-500" />
                                        Host
                                    </Badge>
                                )}
                            </ItemTitle>
                            <ItemDescription className="flex items-center gap-2 text-sm font-bold">
                                {p.status === 'waiting' ? (
                                    <>
                                        <span className="block size-2 rounded-full bg-[#F59E0B]" />
                                        <span className="text-[#F59E0B]">
                                            Waiting...{' '}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="block size-2 rounded-full bg-primary" />
                                        <span className="text-primary">
                                            Ready
                                        </span>
                                    </>
                                )}
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            {me.id !== p.id && me.isHost && (
                                <Button variant={'ghost'} size="icon">
                                    <X className="size-5 text-muted-foreground" />
                                </Button>
                            )}
                        </ItemActions>
                    </Item>

                    {index < players.length - 1 && <ItemSeparator />}
                </React.Fragment>
            ))}

            {players.length === 1 && (
                <>
                    <ItemSeparator />
                    <Item className="h-[120px]">
                        <ItemMedia>
                            <div className="flex size-14 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-50 sm:size-16">
                                <User className="size-6 text-slate-300" />
                            </div>
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="text-xl font-bold text-slate-400">
                                Waiting for player...
                            </ItemTitle>
                            <ItemDescription className="flex items-center gap-2 text-sm font-bold">
                                <span className="block size-2 rounded-full bg-slate-300" />
                                <span className="text-slate-400">
                                    Searching...
                                </span>
                            </ItemDescription>
                        </ItemContent>
                    </Item>
                </>
            )}
        </div>
    )
}
