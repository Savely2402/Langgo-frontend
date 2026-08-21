import { z } from 'zod'

export const languageCodes = ['Ru', 'En'] as const

export type LanguageCode = (typeof languageCodes)[number]

export const languageOptions = [
    {
        value: 'Ru',
        label: 'RU',
        countryCode: 'RU',
    },
    {
        value: 'En',
        label: 'EN',
        countryCode: 'US',
    },
] as const satisfies readonly {
    value: LanguageCode
    label: string
    countryCode: string
}[]

export const languageCodeSchema = z.enum(languageCodes, {
    error: (issue) => {
        if (issue.code === 'invalid_value') {
            return { message: 'Language is required' }
        }

        return { message: 'Select a valid language' }
    },
})
