import type React from 'react'

interface HeaderProps {
    leftSlot?: React.ReactNode
    centralSlot?: React.ReactNode
    rightSlot?: React.ReactNode
}

export const Header = ({ leftSlot, centralSlot, rightSlot }: HeaderProps) => {
    return (
        <header className="w-full bg-white px-4 py-3.5">
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between">
                {leftSlot}
                {centralSlot}
                {rightSlot}
            </div>
        </header>
    )
}
