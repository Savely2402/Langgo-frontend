import { cn } from '../../lib/classNames'

interface IconProps extends React.SVGProps<SVGSVGElement> {
    Svg: React.FC<React.SVGProps<SVGSVGElement>>
    className?: string
}

export const Icon = ({ Svg, className, ...props }: IconProps) => {
    return (
        <Svg
            className={cn('h-6 w-6 fill-current', className)}
            preserveAspectRatio="none"
            {...props}
        />
    )
}
