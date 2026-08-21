import type React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/shared/ui/Card'

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
                <CardTitle className="font-luckiest text-lg tracking-wider">
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="w-full">{children}</CardContent>
            <CardFooter className="flex justify-center">{footer}</CardFooter>
        </Card>
    )
}
