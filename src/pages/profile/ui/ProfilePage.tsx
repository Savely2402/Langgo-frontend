import { BarChart3, Flame, MonitorPlay, Pencil, Trophy } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router'
import { UserAvatar, useUser, type User } from '@/entities/user'
import {
    InviteFriendToBattleButton,
    type FriendBattleInviteStatus,
} from '@/features/invite-friend-to-battle'
import { SendFriendRequestButton } from '@/features/send-friend-request'
import { routes } from '@/shared/config'
import { Button } from '@/shared/ui/Button'
import { AppHeader } from '@/widgets/app-header'
import { HeaderProfile } from '@/widgets/header-profile'

interface ProfileActionsProps {
    profileUserId: number
    profileUsername: string
    isOwnProfile: boolean
    isFriend: boolean
    inviteStatus: FriendBattleInviteStatus
}

const ProfileActions = ({
    profileUserId,
    profileUsername,
    isOwnProfile,
    isFriend,
    inviteStatus,
}: ProfileActionsProps) => {
    if (isOwnProfile) {
        return (
            <Button asChild className="btn-3d">
                <Link to={routes.profileSettings}>
                    <Pencil size={18} />
                    <span>Изменить</span>
                </Link>
            </Button>
        )
    }

    return (
        <div className="flex flex-wrap items-center gap-2">
            <InviteFriendToBattleButton
                friendId={profileUserId}
                friendUsername={profileUsername}
                status={inviteStatus}
            />
            <SendFriendRequestButton
                userId={profileUserId}
                username={profileUsername}
                isFriend={isFriend}
            />
        </div>
    )
}

export const ProfilePage = () => {
    const { id } = useParams()
    const { user } = useUser()
    const profileId = Number(id)

    if (!id || Number.isNaN(profileId)) {
        return <Navigate to={routes.notFound} replace />
    }

    const isOwnProfile = user?.id === profileId
    const mockIsFriend = profileId === 2 || profileId === 3
    const mockInviteStatus: FriendBattleInviteStatus = mockIsFriend
        ? 'online'
        : 'offline'

    const userProfile: User =
        user && isOwnProfile
            ? user
            : {
                  id: profileId,
                  username: 'public_player',
                  fullname: 'Андрей',
                  avatarUrl:
                      'https://api.dicebear.com/10.x/avataaars/svg?eyesVariant=closed,default,happy,squint&mouthVariant=twinkle&eyebrowsVariant=default,defaultNatural,flatNatural,raisedExcited,raisedExcitedNatural,unibrowNatural&facialHairVariant=&skinColor=ffdbb4,fd9841,f8d25c&seed=v33dnc3x',
                  email: 'user@user.com',
                  nativeLanguage: 'Ru',
                  learningLanguage: 'En',
                  rating: 100,
              }

    const mockStats = {
        wins: 12,
        losses: 7,
        winRate: 63.2,
        winStreak: 5,
        maxStreak: 5,
        totalMatches: 19,
    }

    return (
        <>
            <AppHeader rightSlot={<HeaderProfile />} />
            <div className="mx-auto mt-10 w-full max-w-5xl rounded-[2rem] border-2 border-slate-100 bg-white p-8 shadow-sm sm:p-10">
                <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-6">
                        <UserAvatar
                            className="size-16 sm:size-22 md:size-28"
                            avatarUrl={userProfile.avatarUrl}
                            username={userProfile.username}
                        />

                        <div className="min-w-0">
                            <h1 className="truncate text-4xl font-black text-slate-900 sm:text-5xl">
                                {userProfile.fullname}
                            </h1>
                            <p className="mt-2 truncate text-sm font-bold text-slate-400">
                                @{userProfile.username}
                            </p>
                        </div>
                    </div>

                    <ProfileActions
                        profileUserId={userProfile.id}
                        profileUsername={userProfile.username}
                        isOwnProfile={isOwnProfile}
                        isFriend={mockIsFriend}
                        inviteStatus={mockInviteStatus}
                    />
                </div>

                <div className="mb-6 flex items-center gap-3">
                    <BarChart3
                        className="text-emerald-600"
                        size={28}
                        strokeWidth={3}
                    />
                    <h2 className="text-2xl font-black text-slate-900">
                        Статистика
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col rounded-3xl border-2 border-slate-100 bg-white p-6 transition-shadow hover:shadow-md">
                        <div className="mb-2 flex items-center gap-2 text-slate-500">
                            <Trophy size={16} strokeWidth={2.5} />
                            <span className="text-[11px] font-bold tracking-widest uppercase">
                                Процент побед
                            </span>
                        </div>
                        <span className="mb-4 text-4xl font-black text-slate-900">
                            {mockStats.winRate}%
                        </span>

                        <div className="mt-auto w-full">
                            <div className="mb-2 flex items-center justify-between text-sm font-bold">
                                <span className="text-emerald-500">
                                    {mockStats.wins} W
                                </span>
                                <span className="text-slate-300">/</span>
                                <span className="text-red-400">
                                    {mockStats.losses} L
                                </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
                                    style={{ width: `${mockStats.winRate}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-slate-100 bg-white p-6 text-center transition-shadow hover:shadow-md">
                        <div className="relative z-10 mb-3 flex size-14 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                            <Flame size={28} strokeWidth={2.5} />
                        </div>
                        <span className="relative z-10 mb-1 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                            Побед подряд
                        </span>
                        <span className="relative z-10 mb-3 text-4xl font-black text-slate-900">
                            {mockStats.winStreak}
                        </span>
                        <div className="relative z-10 rounded-full border-2 border-slate-100 bg-white px-4 py-1 text-xs font-bold text-slate-500">
                            Рекорд: {mockStats.maxStreak}
                        </div>

                        <Flame
                            className="absolute -right-6 -bottom-6 z-0 text-orange-50 opacity-50"
                            size={120}
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-slate-100 bg-slate-50/50 p-6 text-center transition-shadow hover:shadow-md">
                        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                            <MonitorPlay size={28} strokeWidth={2.5} />
                        </div>
                        <span className="mb-2 text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                            Всего матчей
                        </span>
                        <span className="mb-1 text-4xl font-black text-slate-900">
                            {mockStats.totalMatches}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                            Сыграно матчей
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
