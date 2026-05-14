import type React from 'react'
import GoogleSvg from '@/shared/assets/icons/google.svg?react'
import { Button } from '@/shared/ui/Button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { Separator } from '@/shared/ui/Separator'

interface AuthCardProps {
    title: string
    description: string
    children: React.ReactNode
    footer: React.ReactNode
    socialAuthLabel?: string
}

export const AuthCard = ({
    title,
    description,
    children,
    footer,
    socialAuthLabel = 'Sign in with Google',
}: AuthCardProps) => {
    return (
        <Card className="w-full max-w-[420px]">
            <CardHeader className="flex flex-col items-center">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <Button
                    className="h-[42px] w-full bg-white text-muted-foreground"
                    variant="outline"
                >
                    <Icon Svg={GoogleSvg} />
                    {socialAuthLabel}
                </Button>
                <div className="my-6 flex w-full items-center gap-2">
                    <Separator className="flex-1" />
                    <span className="text-xs font-normal text-muted-foreground">
                        OR CONTINUE WITH
                    </span>
                    <Separator className="flex-1" />
                </div>
                {children}
            </CardContent>
            <CardFooter className="flex justify-center">{footer}</CardFooter>
        </Card>
    )
}
