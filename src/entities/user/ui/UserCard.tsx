import { useState } from 'react'
import { ArrowRight, Trophy } from 'lucide-react'
import { languageOptions } from '@/shared/config'
import { cn } from '@/shared/lib/classNames'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from '@/shared/ui/Item'
import { LanguageOptionLabel } from '@/shared/ui/LanguageOptionLabel'
import { UserAvatar } from './UserAvatar'
import type { UserProfile } from '../model/types'

interface UserCardProps {
    user: UserProfile
    className?: string
    actionsSlot?: React.ReactNode
    onClick?: () => void
}

export const UserCard = ({
    user,
    actionsSlot,
    onClick,
    className,
}: UserCardProps) => {
    const [isPressed, setIsPressed] = useState(false)
    const { username, avatarUrl, rating, nativeLanguage, learningLanguage } =
        user

    const [nativeLanguageData, learningLanguageData] = [
        nativeLanguage,
        learningLanguage,
    ].map((lang) => languageOptions.find((option) => option.value === lang))

    return (
        <Item
            variant="outline"
            className={cn(
                'h-full w-full cursor-pointer rounded-[24px] bg-white p-6 shadow-xs transition-all duration-300 outline-none hover:scale-[1.02] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                isPressed && 'scale-95',
                className,
            )}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            onClick={(event) => {
                if (
                    (event.target as HTMLElement).closest(
                        '[data-slot=item-actions]',
                    )
                ) {
                    return
                }

                onClick?.()
            }}
            onKeyDown={(event) => {
                if (!onClick) return

                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onClick()
                }
            }}
            onPointerDown={(event) => {
                if (
                    (event.target as HTMLElement).closest(
                        '[data-slot=item-actions]',
                    )
                ) {
                    return
                }

                setIsPressed(true)
            }}
            onPointerUp={() => setIsPressed(false)}
            onPointerLeave={() => setIsPressed(false)}
            onPointerCancel={() => setIsPressed(false)}
        >
            <ItemMedia>
                <UserAvatar
                    avatarUrl={avatarUrl}
                    username={username}
                    className="size-14"
                />
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="text-xl font-black">{username}</ItemTitle>
                <ItemDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        {nativeLanguageData && (
                            <LanguageOptionLabel
                                countryCode={nativeLanguageData.countryCode}
                                label={nativeLanguageData.label}
                                className="gap-1"
                            />
                        )}
                        <ArrowRight size={14} />
                        {learningLanguageData && (
                            <LanguageOptionLabel
                                countryCode={learningLanguageData.countryCode}
                                label={learningLanguageData.label}
                                className="gap-1"
                            />
                        )}
                    </span>
                    {rating !== undefined && (
                        <span className="flex items-center gap-1.5 text-sm font-black text-emerald-600">
                            <Trophy size={16} strokeWidth={2.5} />
                            {rating.toLocaleString()} ELO
                        </span>
                    )}
                </ItemDescription>
            </ItemContent>
            {actionsSlot && <ItemActions>{actionsSlot}</ItemActions>}
        </Item>
    )
}
