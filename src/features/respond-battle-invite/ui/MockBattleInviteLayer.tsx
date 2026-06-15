import { useState } from 'react'
import { ArrowRight, BookOpenText, Gamepad2, Swords, X } from 'lucide-react'
import { toast } from 'sonner'
import { UserAvatar } from '@/entities/user'
import { languageOptions } from '@/shared/config'
import { Button } from '@/shared/ui/Button'
import { LanguageOptionLabel } from '@/shared/ui/LanguageOptionLabel'

interface BattleInviteUser {
    id: number
    username: string
    avatarUrl: string
}

interface BattleInviteDictionary {
    name: string
    langFrom: string
    langTo: string
}

interface BattleInviteNotificationProps {
    inviter: BattleInviteUser
    dictionary: BattleInviteDictionary
    onAccept: () => void
    onDecline: () => void
}

const mockInvite = {
    inviter: {
        id: 7,
        username: 'tense_tactician',
        avatarUrl: 'https://api.dicebear.com/10.x/avataaars/svg?seed=6w32brqh',
    },
    dictionary: {
        name: 'Irregular Verbs Arena',
        langFrom: 'En',
        langTo: 'Ru',
    },
} satisfies {
    inviter: BattleInviteUser
    dictionary: BattleInviteDictionary
}

const BattleInviteNotification = ({
    inviter,
    dictionary,
    onAccept,
    onDecline,
}: BattleInviteNotificationProps) => {
    const [langFromData, langToData] = [
        dictionary.langFrom,
        dictionary.langTo,
    ].map((lang) => languageOptions.find((option) => option.value === lang))

    return (
        <div className="fixed top-6 left-1/2 z-50 w-[min(calc(100%-2rem),520px)] -translate-x-1/2 animate-in rounded-[28px] border border-slate-200 bg-white/95 p-3 shadow-xl shadow-slate-900/10 backdrop-blur-md zoom-in-95 fade-in slide-in-from-top-4">
            <div className="flex flex-wrap items-center gap-3">
                <UserAvatar
                    avatarUrl={inviter.avatarUrl}
                    username={inviter.username}
                    className="size-11 ring-2 ring-slate-100"
                />

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-slate-950">
                        {inviter.username} приглашает в бой
                    </p>
                    <div className="mt-1 flex w-fit max-w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500">
                        <BookOpenText className="size-3.5 shrink-0 text-slate-400" />
                        <span className="truncate text-slate-700">
                            {dictionary.name}
                        </span>
                        <span className="flex shrink-0 items-center gap-1">
                            {langFromData && (
                                <LanguageOptionLabel
                                    countryCode={langFromData.countryCode}
                                    label={langFromData.label}
                                    className="gap-1"
                                    width="0.85rem"
                                    height="0.85rem"
                                />
                            )}
                            <ArrowRight className="size-3" />
                            {langToData && (
                                <LanguageOptionLabel
                                    countryCode={langToData.countryCode}
                                    label={langToData.label}
                                    className="gap-1"
                                    width="0.85rem"
                                    height="0.85rem"
                                />
                            )}
                        </span>
                    </div>
                </div>

                <div className="ml-auto flex shrink-0 gap-2">
                    <Button
                        type="button"
                        size="icon-sm"
                        className="btn-3d rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600"
                        aria-label="Принять приглашение в бой"
                        onClick={onAccept}
                    >
                        <Swords className="size-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        className="btn-3d rounded-2xl"
                        aria-label="Отклонить приглашение в бой"
                        onClick={onDecline}
                    >
                        <X className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const MockBattleInviteLayer = () => {
    const [isVisible, setIsVisible] = useState(false)

    const handleAccept = () => {
        setIsVisible(false)
        toast.success('Приглашение принято', {
            description: 'Mock battle invite accepted',
        })
    }

    const handleDecline = () => {
        setIsVisible(false)
        toast.info('Приглашение отклонено', {
            description: 'Mock battle invite declined',
        })
    }

    return (
        <>
            <Button
                type="button"
                className="btn-3d fixed right-6 bottom-6 z-40 rounded-2xl"
                onClick={() => setIsVisible(true)}
            >
                <Gamepad2 className="size-4" />
                Mock invite
            </Button>

            {isVisible && (
                <BattleInviteNotification
                    inviter={mockInvite.inviter}
                    dictionary={mockInvite.dictionary}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                />
            )}
        </>
    )
}
