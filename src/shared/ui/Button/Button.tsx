import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'
import { cn } from '../../lib/classNames'
import { buttonVariants } from './variants'

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'default',
            size = 'default',
            asChild = false,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot.Root : 'button'

        return (
            <Comp
                data-slot="button"
                data-variant={variant}
                data-size={size}
                data-testid="button"
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        className,
                    }),
                )}
                ref={ref}
                {...props}
            />
        )
    },
)

Button.displayName = 'Button'

export { Button }
