import type React from 'react'
import GoogleSvg from '@/shared/assets/icons/google.svg?react'
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Separator,
    Icon,
    CardFooter,
} from '@/shared/ui'

interface AuthCardProps {
    title: string
    description: string
    children: React.ReactNode
    footer: React.ReactNode
}

export const AuthCard = ({
    title,
    description,
    children,
    footer,
}: AuthCardProps) => {
    return (
        <Card className="w-full max-w-[420px]">
            <CardHeader className="flex flex-col items-center">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="w-full">
                <Button
                    className="w-full bg-white h-[42px] text-muted-foreground"
                    variant="outline"
                >
                    <Icon Svg={GoogleSvg} />
                    Sign in with google
                </Button>
                <div className="flex w-full items-center gap-2 my-6">
                    <Separator className="flex-1" />
                    <span>or continue with</span>
                    <Separator className="flex-1" />
                </div>
                {children}
            </CardContent>
            <CardFooter className="flex justify-center">{footer}</CardFooter>
        </Card>
    )
}
