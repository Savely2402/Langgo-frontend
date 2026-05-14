import { selectRoundOptions, useAnswerSubmission } from '@/entities/game' // Импортируем только то, что нужно для UI
import { useUser } from '@/entities/user'
import { useAppSelector } from '@/shared/lib/store'
import { TestOptionButton, type TestOptionStatus } from './TestOptionButton'

export const ChooseTestAnswerForm = () => {
    const { user } = useUser()
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

    if (!options.length) return null

    return (
        <div className="flex w-full flex-col gap-4">
            {options.map((option) => (
                <TestOptionButton
                    key={option}
                    text={option}
                    status={getButtonStatus(option)}
                    onClick={() => submitAnswer(option)}
                />
            ))}
        </div>
    )
}
