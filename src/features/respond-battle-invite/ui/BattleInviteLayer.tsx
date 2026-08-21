import { ArrowRight, BookOpenText, Swords, X } from 'lucide-react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import {
    clearGameInvite,
    initGameConnection,
    selectGameInvite,
} from '@/entities/game'
import { UserAvatar } from '@/entities/user'
import { languageOptions, routes } from '@/shared/config'
import { useAppDispatch, useAppSelector } from '@/shared/lib/store'
import { Button } from '@/shared/ui/Button'
import { LanguageOptionLabel } from '@/shared/ui/LanguageOptionLabel'
import { Spinner } from '@/shared/ui/Spinner'
import { useRespondBattleInviteMutation } from '../api/respondBattleInviteApi'

export const BattleInviteLayer = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const invite = useAppSelector(selectGameInvite)
    const [respondBattleInvite, { isLoading }] =
        useRespondBattleInviteMutation()

    if (!invite) {
        return null
    }

    const { roomId, hostUsername, gameSettings } = invite
    const [langFromData, langToData] = [
        gameSettings.langFrom,
        gameSettings.langTo,
    ].map((lang) => languageOptions.find((option) => option.value === lang))

    const handleAccept = async () => {
        try {
            await respondBattleInvite({
                roomId,
                body: { accept: true },
            }).unwrap()

            dispatch(initGameConnection(roomId))
            dispatch(clearGameInvite())
            navigate(routes.lobby(roomId))
        } catch {
            toast.error('Не удалось принять приглашение')
        }
    }

    const handleDecline = async () => {
        try {
            await respondBattleInvite({
                roomId,
                body: { accept: false },
            }).unwrap()

            dispatch(clearGameInvite())
        } catch {
            toast.error('Не удалось отклонить приглашение')
        }
    }

    return (
        <div className="fixed top-6 left-1/2 z-50 w-[min(calc(100%-2rem),520px)] -translate-x-1/2 animate-in rounded-[28px] border border-slate-200 bg-white/95 p-3 shadow-xl shadow-slate-900/10 backdrop-blur-md zoom-in-95 fade-in slide-in-from-top-4">
            <div className="flex flex-wrap items-center gap-3">
                <UserAvatar
                    username={hostUsername}
                    className="size-11 ring-2 ring-slate-100"
                />

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-slate-950">
                        {hostUsername} приглашает в бой
                    </p>
                    <div className="mt-1 flex w-fit max-w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500">
                        <BookOpenText className="size-3.5 shrink-0 text-slate-400" />
                        <span className="truncate text-slate-700">
                            {gameSettings.dictionaryName}
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
                        disabled={isLoading}
                        onClick={handleAccept}
                    >
                        {isLoading ? (
                            <Spinner className="size-4" />
                        ) : (
                            <Swords className="size-4" />
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        className="btn-3d rounded-2xl"
                        aria-label="Отклонить приглашение в бой"
                        disabled={isLoading}
                        onClick={handleDecline}
                    >
                        {isLoading ? (
                            <Spinner className="size-4" />
                        ) : (
                            <X className="size-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
