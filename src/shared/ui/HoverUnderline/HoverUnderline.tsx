import { cn } from '../../lib/classNames'

interface HoverUnderlineProps {
    children: React.ReactNode
    className?: string
}

export const HoverUnderline = ({
    children,
    className = '',
}: HoverUnderlineProps) => {
    return (
        <span className={cn('group relative inline-flex', className)}>
            {children}
            <span className="absolute bottom-0 left-0 h-px w-full scale-0 bg-primary transition-all duration-300 group-hover:scale-100" />
        </span>
    )
}
