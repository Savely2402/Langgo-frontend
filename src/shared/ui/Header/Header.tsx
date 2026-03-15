import type React from 'react'

interface HeaderProps {
    leftSlot?: React.ReactNode
    rightSlot?: React.ReactNode
}

export const Header = ({ leftSlot, rightSlot }: HeaderProps) => {
    return (
        <header className="flex w-full items-center justify-between bg-white px-8 py-3.5">
            {leftSlot}
            {rightSlot}
        </header>
    )
}
