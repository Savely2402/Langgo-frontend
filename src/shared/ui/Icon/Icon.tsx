interface IconProps {
    Svg: React.FC<React.SVGProps<SVGSVGElement>>
    className?: string
}

export const Icon = ({ Svg, className, ...props }: IconProps) => {
    return <Svg className={`w-6 h-6 fill-current ${className}`} {...props} />
}
