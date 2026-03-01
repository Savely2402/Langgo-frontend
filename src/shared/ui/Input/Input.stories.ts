import { userEvent, within, expect } from 'storybook/test'
import { Input } from './Input'
import type { StoryObj, Meta } from '@storybook/react-vite'

const meta = {
    title: 'Shared/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'file'],
            description: 'Input type',
        },
        placeholder: {
            control: 'text',
        },
        disabled: {
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        type: 'text',
        placeholder: 'Введите текст',
    },
}

export const Email: Story = {
    args: {
        type: 'email',
        placeholder: 'you@gmail.com',
    },
}

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Введите пароль',
    },
}

export const WithError: Story = {
    args: {
        'type': 'text',
        'placeholder': 'Введите текст',
        'aria-invalid': true,
    },
}

export const Disabled: Story = {
    args: {
        type: 'text',
        placeholder: 'Введите текст',
        disabled: true,
    },
}

export const InteractionTest: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const input = canvas.getByTestId('input')
        await userEvent.type(input, 'Input text', {
            delay: 100,
        })

        await expect(input).toHaveValue('Input text')
    },
}
