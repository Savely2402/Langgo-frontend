import { Spinner } from '../Spinner'
import { Button } from './Button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
    title: 'Shared/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'default',
                'destructive',
                'outline',
                'secondary',
                'ghost',
                'link',
            ],
        },
        size: {
            control: 'select',
            options: [
                'default',
                'xs',
                'sm',
                'lg',
                'icon',
                'icon-xs',
                'icon-sm',
                'icon-lg',
            ],
        },
        children: {
            control: 'text',
        },
        asChild: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        variant: 'default',
        size: 'default',
        children: 'Button',
    },
}

export const Disabled: Story = {
    args: {
        ...Primary.args,
        disabled: true,
    },
}

export const Destructive: Story = {
    args: {
        variant: 'destructive',
        size: 'default',
        children: 'Button',
    },
}

export const Outline: Story = {
    args: {
        variant: 'outline',
        size: 'default',
        children: 'Button',
    },
}

export const Icon: Story = {
    args: {
        variant: 'outline',
        size: 'icon-lg',
        children: '🚀',
    },
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'default',
        children: 'Button',
    },
}

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        size: 'default',
        children: 'Button',
    },
}

export const Link: Story = {
    args: {
        variant: 'link',
        size: 'default',
        children: 'Button',
    },
}

export const WithSpinner: Story = {
    args: {
        variant: 'link',
        size: 'default',
    },
    render: (args) => (
        <Button {...args}>
            Loading
            <Spinner />
        </Button>
    ),
}
