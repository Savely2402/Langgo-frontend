import { userEvent, within, expect } from 'storybook/test'
import { InputGroup, InputGroupAddon, InputGroupInput } from './InputGroup'
import type { StoryObj, Meta } from '@storybook/react-vite'

const meta = {
    title: 'Shared/InputGroup',
    component: InputGroup,
    tags: ['autodocs'],
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

export const FocusTransferTest: Story = {
    render: () => {
        return (
            <InputGroup>
                <InputGroupAddon>Email</InputGroupAddon>
                <InputGroupInput placeholder="you@gmail.com" />
            </InputGroup>
        )
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement)
        const addon = canvas.getByText('Email')
        const input = canvas.getByPlaceholderText('you@gmail.com')

        await step('Клик по тексту аддона переводит фокус', async () => {
            await userEvent.click(addon)
            await expect(input).toHaveFocus()
        })

        await step('Ввод текста работает корректно', async () => {
            await userEvent.type(input, 'hello', {
                delay: 100,
            })
            await expect(input).toHaveValue('hello')
        })
    },
}

export const WithAddon: Story = {
    render: () => {
        return (
            <InputGroup>
                <InputGroupAddon align={'inline-start'}>Email</InputGroupAddon>
                <InputGroupInput placeholder="you@gmail.com" />
            </InputGroup>
        )
    },
}
