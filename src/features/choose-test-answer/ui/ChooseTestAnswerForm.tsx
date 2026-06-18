import {
    gameRealtimeApi,
    selectRoomId,
    selectRoundOptions,
    useAnswerSubmission,
} from '@/entities/game'
import { useUser } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/store'
import { TestOptionButton, type TestOptionStatus } from './TestOptionButton'

export const ChooseTestAnswerForm = () => {
    const { user } = useUser()
    const roomId = useAppSelector(selectRoomId)
    const options = useAppSelector(selectRoundOptions) || []

    const { formStatus, currentAnswer, submitAnswer } = useAnswerSubmission(
        user?.id,
    )

    const getButtonStatus = (optionText: string): TestOptionStatus => {
        if (formStatus === 'loser') return 'disabled'

        if (formStatus === 'success') {
            return currentAnswer === optionText ? 'correct' : 'disabled'
        }

        if (currentAnswer === optionText) {
            if (formStatus === 'checking') return 'selected'
            if (formStatus === 'error') return 'error'
        } else if (formStatus === 'checking' || formStatus === 'error') {
            return 'disabled'
        }

        return 'idle'
    }

    if (!user || !roomId || !options.length) return null

    const handleChooseOption = async (option: string, optionIndex: number) => {
        if (formStatus !== 'idle') return

        submitAnswer(option)

        try {
            await gameRealtimeApi.sendAnswer({
                roomId,
                answer: String(optionIndex),
            })
        } catch (error) {
            console.error('Ошибка отправки ответа:', error)
        }
    }

    return (
        <div className="flex w-full flex-col gap-4">
            {options.map((option, index) => (
                <TestOptionButton
                    key={option}
                    text={option}
                    status={getButtonStatus(option)}
                    onClick={() => handleChooseOption(option, index)}
                />
            ))}
        </div>
    )
}
