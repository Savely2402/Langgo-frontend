import { User2 } from 'lucide-react'
import { cn } from '@/shared/lib/classNames'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/Avatar'
import type { User } from '../model/types'

interface UserAvatarProps extends Pick<User, 'avatarUrl' | 'username'> {
    className?: string
}

export const UserAvatar = ({
    avatarUrl,
    username,
    className,
}: UserAvatarProps) => {
    return (
        <Avatar className={cn('size-6', className)}>
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>
                {username?.charAt(0)?.toUpperCase() ?? <User2 />}
            </AvatarFallback>
        </Avatar>
    )
}
