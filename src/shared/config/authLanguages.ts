export const authLanguageCodes = ['Ru', 'Es'] as const

export type AuthLanguageCode = (typeof authLanguageCodes)[number]

export const authLanguageOptions = [
    {
        value: 'Ru',
        label: 'RU',
        countryCode: 'RU',
    },
    {
        value: 'Es',
        label: 'EN',
        countryCode: 'GB',
    },
] as const satisfies readonly {
    value: AuthLanguageCode
    label: string
    countryCode: string
}[]
