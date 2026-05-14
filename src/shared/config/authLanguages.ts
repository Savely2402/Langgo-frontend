export const authLanguageCodes = ['ru', 'en'] as const

export type AuthLanguageCode = (typeof authLanguageCodes)[number]

export const authLanguageOptions = [
    {
        value: 'ru',
        label: 'RU',
        countryCode: 'RU',
    },
    {
        value: 'en',
        label: 'EN',
        countryCode: 'GB',
    },
] as const satisfies readonly {
    value: AuthLanguageCode
    label: string
    countryCode: string
}[]
